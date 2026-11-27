// Vercel serverless function: POST /api/assistant
// Brain: Groq (OpenAI-compatible chat completions)
// Voice: ElevenLabs (text-to-speech only)
// Environment variables required in Vercel:
//   GROQ_API_KEY
//   ELEVENLABS_API_KEY
//   ELEVENLABS_VOICE_EN
//   ELEVENLABS_VOICE_AR

const fs = require('node:fs');
const path = require('node:path');

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'openai/gpt-oss-20b';
const ELEVENLABS_TTS_MODEL = 'eleven_flash_v2_5';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const MAX_MESSAGE_LEN = 500;
const MAX_HISTORY = 8;
const MAX_TTS_CHARS = 450;

const hits = new Map();

function clientIp(req) {
  const fwd = req.headers && req.headers['x-forwarded-for'];
  const raw = typeof fwd === 'string' ? fwd.split(',')[0] : (req.socket && req.socket.remoteAddress) || 'unknown';
  return raw.trim();
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function loadKnowledge() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'ai-knowledge.md');
  return fs.readFileSync(filePath, 'utf8');
}

function sanitizeMessages(raw) {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const trimmed = raw.slice(-MAX_HISTORY);
  const out = [];
  for (const m of trimmed) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) continue;
    const content = String(m.content == null ? '' : m.content).trim().slice(0, MAX_MESSAGE_LEN);
    if (!content) continue;
    out.push({ role: m.role, content });
  }
  if (out.length === 0 || out[out.length - 1].role !== 'user') return null;
  return out;
}

async function synthesizeSpeech(text, lang) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = lang === 'ar' ? process.env.ELEVENLABS_VOICE_AR : process.env.ELEVENLABS_VOICE_EN;
  if (!apiKey || !voiceId) return null;

  const clipped = String(text || '').trim().slice(0, MAX_TTS_CHARS);
  if (!clipped) return null;

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`;
  const ttsRes = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text: clipped,
      model_id: ELEVENLABS_TTS_MODEL,
    }),
  });

  if (!ttsRes.ok) {
    console.error('assistant: ElevenLabs TTS error status ' + ttsRes.status);
    return null;
  }

  const buf = Buffer.from(await ttsRes.arrayBuffer());
  return buf.toString('base64');
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid request.' });
  }

  if (rateLimited(clientIp(req))) {
    return res.status(429).json({
      ok: false,
      error: 'Too many requests. Please try again in a few minutes, or message Mazen on WhatsApp.',
    });
  }

  const lang = body.lang === 'ar' ? 'ar' : 'en';
  const speak = Boolean(body.speak);
  const messages = sanitizeMessages(body.messages);
  if (!messages) {
    return res.status(400).json({ ok: false, error: 'Please enter a message.' });
  }

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    console.error('assistant: missing env var GROQ_API_KEY');
    return res.status(500).json({ ok: false, error: 'Assistant is not configured yet.' });
  }

  let knowledge = '';
  try {
    knowledge = loadKnowledge();
  } catch (err) {
    console.error('assistant: failed to read knowledge file');
    return res.status(500).json({ ok: false, error: 'Assistant knowledge base unavailable.' });
  }

  const langRule = lang === 'ar'
    ? 'Respond ONLY in friendly Egyptian-leaning Modern Standard Arabic. Keep brand/tech names (Salla, Laravel, Next.js, Flutter, NazBiz, WhatsApp) in Latin letters.'
    : 'Respond ONLY in clear, friendly English.';

  const systemPrompt = `${knowledge}\n\n## Current Session Language\n${langRule}`;

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        max_tokens: 300,
        temperature: 0.4,
      }),
    });

    const groqData = await groqRes.json().catch(() => null);
    if (!groqRes.ok || !groqData || !groqData.choices || !groqData.choices[0]) {
      console.error('assistant: Groq API error status ' + groqRes.status);
      return res.status(502).json({
        ok: false,
        error: 'Assistant could not respond right now. Please use the contact form or WhatsApp.',
      });
    }

    const reply = String(groqData.choices[0].message && groqData.choices[0].message.content || '').trim();
    if (!reply) {
      return res.status(502).json({
        ok: false,
        error: 'Empty response from assistant.',
      });
    }

    let audioBase64 = null;
    if (speak) {
      try {
        audioBase64 = await synthesizeSpeech(reply, lang);
      } catch (ttsErr) {
        console.error('assistant: TTS failed gracefully');
        audioBase64 = null;
      }
    }

    return res.status(200).json({
      ok: true,
      reply,
      audioBase64,
      audioMime: audioBase64 ? 'audio/mpeg' : null,
    });
  } catch (err) {
    console.error('assistant: unexpected request failure');
    return res.status(502).json({
      ok: false,
      error: 'Could not reach assistant service.',
    });
  }
};
