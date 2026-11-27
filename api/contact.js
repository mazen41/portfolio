// Vercel serverless function: POST /api/contact
// Secrets come only from environment variables set in Vercel:
//   RESEND_API_KEY      API key for Resend (email sending)
//   CONTACT_FROM_EMAIL  sender address on a domain verified in Resend
// Nothing secret is written in this file.

const RECIPIENT = 'mazen.hossny.121@gmail.com';
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;         // submissions per IP per window

// In-memory limiter. It is per warm instance, so it slows casual abuse but is
// not a hard global limit. For a hard limit, use Upstash Redis or a Vercel firewall rule.
const hits = new Map();

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  const raw = typeof fwd === 'string' ? fwd.split(',')[0] : (req.socket && req.socket.remoteAddress) || 'unknown';
  return raw.trim();
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_PER_WINDOW;
}

function clean(value, max) {
  return String(value == null ? '' : value).trim().slice(0, max);
}

function validate(body) {
  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const project = clean(body.project, 3000);
  const budget = clean(body.budget, 100);
  const timeline = clean(body.timeline, 100);

  if (name.length < 2) return { error: 'Please enter your name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Please enter a valid email address.' };
  if (project.length < 10) return { error: 'Please describe your project in a few words.' };
  return { data: { name, email, project, budget, timeline } };
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

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots move on.
  if (clean(body.website, 200) !== '') {
    return res.status(200).json({ ok: true });
  }

  if (rateLimited(clientIp(req))) {
    return res.status(429).json({ ok: false, error: 'Too many messages. Please try again in a few minutes, or message me on WhatsApp.' });
  }

  const checked = validate(body);
  if (checked.error) {
    return res.status(400).json({ ok: false, error: checked.error });
  }
  const { name, email, project, budget, timeline } = checked.data;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    // Log the variable NAMES only, never their values.
    const missing = [!apiKey && 'RESEND_API_KEY', !from && 'CONTACT_FROM_EMAIL'].filter(Boolean).join(', ');
    console.error('contact: missing env var(s): ' + missing);
    return res.status(500).json({ ok: false, error: 'Sending is not configured yet.' });
  }

  const text = [
    'New project inquiry from the portfolio site.',
    '',
    'Name: ' + name,
    'Email: ' + email,
    'Budget: ' + (budget || 'Not specified'),
    'Timeline: ' + (timeline || 'Not specified'),
    '',
    'Project details:',
    project,
  ].join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: from,
        to: [RECIPIENT],
        reply_to: email,
        subject: 'Project inquiry from ' + name,
        text: text,
      }),
    });
    if (!r.ok) {
      console.error('contact: Resend responded with status ' + r.status);
      return res.status(502).json({ ok: false, error: 'Could not send right now.' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact: network error calling Resend');
    return res.status(502).json({ ok: false, error: 'Could not send right now.' });
  }
};
