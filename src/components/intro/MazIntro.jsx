// src/components/intro/MazIntro.jsx
// Intro gate for the home page. A dark screen with a "Tap to meet Maz" button
// covers the site (the real page is already rendered underneath). Tapping wipes
// the screen away in a circle; the hero robot waves and greets the visitor.
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import './intro.css';

const SEEN_KEY = 'maz-intro-seen';
const MUTE_KEY = 'maz-muted';
const WIPE_MS = 900;

const MazIntroContext = createContext(null);

function readFlag(storage, key) {
  try {
    return storage.getItem(key) === '1';
  } catch (e) {
    return false;
  }
}

function writeFlag(storage, key, on) {
  try {
    storage.setItem(key, on ? '1' : '0');
  } catch (e) {
    // Storage blocked (private mode): the choice only lasts for this visit.
  }
}

export function MazIntroProvider({ children }) {
  const { pathname } = useLocation();
  const { lang, t } = useLanguage();
  const isHome = pathname === '/';
  const [phase, setPhase] = useState(() =>
    readFlag(window.sessionStorage, SEEN_KEY) ? 'done' : 'intro'
  );
  const [muted, setMuted] = useState(() => readFlag(window.localStorage, MUTE_KEY));
  const [greetToken, setGreetToken] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [heroRobotActive, setHeroRobotActive] = useState(false);
  const showIntro = isHome && phase !== 'done';

  // Lock page scroll while the intro is on screen.
  useEffect(() => {
    if (!showIntro) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [showIntro]);

  // Stop any speech when the provider unmounts.
  useEffect(
    () => () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    },
    []
  );

  const finish = useCallback(() => setPhase('done'), []);

  // Speaks text. Called straight from a click: the click is the user gesture that
  // lets the browser play speech. Cancel only when something is already queued,
  // because cancel() right before speak() can drop the new utterance on Chrome.
  const speakText = useCallback(
    (text, isMuted) => {
      if (isMuted) return;
      if (!('speechSynthesis' in window)) {
        console.warn('[MazSpeech] speechSynthesis not available on this device');
        return;
      }
      const synth = window.speechSynthesis;
      if (synth.speaking || synth.pending) synth.cancel();
      synth.resume();
      const utterance = new SpeechSynthesisUtterance(text);
      const wantPrefix = lang === 'ar' ? 'ar' : 'en';
      const voices = synth.getVoices();
      if (!voices || voices.length === 0) {
        console.warn('[MazSpeech] getVoices() returned no voices; speech may be silent');
      }
      const voice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(wantPrefix));
      utterance.lang = lang === 'ar' ? 'ar-EG' : 'en-US';
      if (voice) utterance.voice = voice;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = (e) => {
        console.warn('[MazSpeech] utterance error:', e && e.error ? e.error : e);
        setSpeaking(false);
      };
      synth.speak(utterance);
    },
    [lang]
  );

  // Tap: wave, greet, wipe. The greeting is spoken synchronously inside this click.
  const tap = useCallback(() => {
    writeFlag(window.sessionStorage, SEEN_KEY, true);
    setPhase('wiping');
    setGreetToken((n) => n + 1);
    speakText(t('heroGreet'), muted);
  }, [speakText, t, muted]);

  // Skip: no voice, no wave, no wipe. Just the site with the robot idle.
  const skip = useCallback(() => {
    writeFlag(window.sessionStorage, SEEN_KEY, true);
    setPhase('done');
  }, []);

  const toggleMute = useCallback(() => {
    const next = !muted;
    setMuted(next);
    writeFlag(window.localStorage, MUTE_KEY, next);
    if (next && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [muted]);

  const value = {
    showIntro,
    phase,
    greetToken,
    speaking,
    muted,
    toggleMute,
    heroRobotActive,
    setHeroRobotActive,
  };

  return (
    <MazIntroContext.Provider value={value}>
      {children}
      {showIntro && <IntroOverlay phase={phase} onTap={tap} onSkip={skip} onWiped={finish} />}
    </MazIntroContext.Provider>
  );
}

export function useMazIntro() {
  const ctx = useContext(MazIntroContext);
  if (ctx) return ctx;
  return {
    showIntro: false,
    phase: 'done',
    greetToken: 0,
    speaking: false,
    muted: false,
    toggleMute: () => {},
    heroRobotActive: false,
    setHeroRobotActive: () => {},
  };
}


// Full-screen intro. The dark layer is clipped by a circle that grows from the
// centre during the wipe, so the site appears through an expanding hole.
function IntroOverlay({ phase, onTap, onSkip, onWiped }) {
  const { t } = useLanguage();
  const bgRef = useRef(null);
  const wiping = phase === 'wiping';

  useEffect(() => {
    if (!wiping) return undefined;
    const el = bgRef.current;
    if (!el) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 150 : WIPE_MS;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.hypot(cx, cy) + 40;
    const draw = (r) => {
      const d = `M0 0H${w}V${h}H0Z M${cx - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
      el.style.clipPath = `path(evenodd, "${d}")`;
    };
    let raf = 0;
    const started = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - started) / duration);
      draw(maxR * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
      else onWiped();
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [wiping, onWiped]);

  return (
    <div
      className={`maz-intro${wiping ? ' is-wiping' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={t('introAria')}
    >
      <div className="maz-intro-bg" ref={bgRef} aria-hidden="true">
        <span className="maz-intro-glow" />
        <span className="maz-intro-dots" />
      </div>
      <div className="maz-intro-content">
        <button
          type="button"
          className="maz-intro-btn"
          onClick={onTap}
          disabled={wiping}
          autoFocus
        >
          <svg className="maz-intro-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="7" width="14" height="11" rx="3" />
            <line x1="12" y1="3.5" x2="12" y2="7" />
            <circle cx="12" cy="3" r="1" />
            <circle cx="9.5" cy="12.5" r="1.2" />
            <circle cx="14.5" cy="12.5" r="1.2" />
          </svg>
        </button>
        <p className="maz-intro-label">{t('introCta')}</p>
      </div>
      <button type="button" className="maz-intro-skip" onClick={onSkip} disabled={wiping}>
        {t('introSkip')}
      </button>
    </div>
  );
}
