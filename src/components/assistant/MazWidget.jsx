import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useLanguage } from '../../i18n/LanguageContext';
import { whatsappLink } from '../../contactConfig';
import MazRobotLauncher from './MazRobotLauncher';
import './mazWidget.css';

const WA_HREF = whatsappLink("Hi Mazen, I chatted with Maz and I'd like to discuss a project.");

export default function MazWidget() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const listRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) setHasOpenedOnce(true);
  }, [open]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSpeaking(false);
  };

  const playAudioBase64 = (base64, mime) => {
    if (!base64) return;
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.onended = () => setSpeaking(false);
        audioRef.current.onerror = () => setSpeaking(false);
      }
      audioRef.current.src = `data:${mime || 'audio/mpeg'};base64,${base64}`;
      setSpeaking(true);
      audioRef.current.play().catch(() => setSpeaking(false));
    } catch (e) {
      setSpeaking(false);
    }
  };

  const sendMessage = async (text) => {
    const trimmed = String(text || '').trim();
    if (!trimmed || loading) return;

    const nextHistory = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextHistory);
    setInput('');
    setLoading(true);
    stopAudio();

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang,
          speak: voiceOn,
          messages: nextHistory.slice(-8),
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && data.ok && data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
        if (voiceOn && data.audioBase64) {
          playAudioBase64(data.audioBase64, data.audioMime);
        }
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: t('mazError') }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: t('mazError') }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const orbStateClass = loading ? 'thinking' : speaking ? 'speaking' : 'idle';
  const chips = [t('mazChip1'), t('mazChip2'), t('mazChip3')];

  return (
    <div className="maz-root">
      {open && (
        <section className="maz-panel" aria-label={t('mazTitle')}>
          <header className="maz-header">
            <div className="maz-header-id">
              <div className={`maz-orb-avatar ${orbStateClass}`} aria-hidden="true">
                <span className="maz-orb-monogram" dir="ltr">MH</span>
              </div>
              <span className="maz-header-title">{t('mazTitle')}</span>
            </div>
            <div className="maz-header-actions">
              <button
                type="button"
                className={`maz-icon-btn${voiceOn ? ' active' : ''}`}
                onClick={() => {
                  const next = !voiceOn;
                  setVoiceOn(next);
                  if (!next) stopAudio();
                }}
                aria-label={voiceOn ? t('mazVoiceOn') : t('mazVoiceOff')}
                title={voiceOn ? t('mazVoiceOn') : t('mazVoiceOff')}
              >
                {voiceOn ? <VolumeUpRoundedIcon style={{ fontSize: 18 }} /> : <VolumeOffRoundedIcon style={{ fontSize: 18 }} />}
              </button>
              <button
                type="button"
                className="maz-icon-btn"
                onClick={() => {
                  stopAudio();
                  setOpen(false);
                }}
                aria-label={t('mazCloseAria')}
              >
                <CloseRoundedIcon style={{ fontSize: 18 }} />
              </button>
            </div>
          </header>

          <div className="maz-messages" ref={listRef}>
            <div className="maz-msg assistant">{t('mazGreeting')}</div>
            {messages.map((m, idx) => (
              <div key={idx} className={`maz-msg ${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="maz-msg assistant">{t('mazThinking')}</div>}
          </div>

          {messages.length === 0 && (
            <div className="maz-chips">
              {chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="maz-chip"
                  onClick={() => sendMessage(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          <div className="maz-quick-links">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="maz-quick-link wa"
            >
              <WhatsAppIcon style={{ fontSize: 15 }} /> {t('mazWaCta')}
            </a>
            <Link to="/contact" className="maz-quick-link" onClick={() => setOpen(false)}>
              {t('mazContactCta')}
            </Link>
          </div>

          <form className="maz-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="maz-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('mazPlaceholder')}
              maxLength={500}
            />
            <button
              type="submit"
              className="maz-send-btn"
              disabled={loading || !input.trim()}
              aria-label={t('mazSendAria')}
            >
              <SendRoundedIcon style={{ fontSize: 18 }} />
            </button>
          </form>

          <div className="maz-disclaimer">{t('mazDisclaimer')}</div>
        </section>
      )}

      <MazRobotLauncher
        onClick={() => setOpen((v) => !v)}
        ariaLabel={open ? t('mazCloseAria') : t('mazOpenAria')}
        showBubble={!open && !hasOpenedOnce}
      />
    </div>
  );
}
