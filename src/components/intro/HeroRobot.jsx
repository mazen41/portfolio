// src/components/intro/HeroRobot.jsx
// The big robot in the hero's visual column. It is the same RobotExpressive
// scene as the launcher, shown larger. It waves and greets after the intro,
// shows a speech bubble that types the greeting, and turns its body toward the mouse.
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import { useLanguage } from '../../i18n/LanguageContext';
import { useMazIntro } from './MazIntro';
import { canUse3D } from './robotSupport';
import './intro.css';

const Scene = lazy(() => import('../assistant/MazRobot3D'));
const TYPE_MS = 30;

export default function HeroRobot() {
  const { t, lang } = useLanguage();
  const { greetToken, speaking, muted, toggleMute, setHeroRobotActive } = useMazIntro();
  const [ok, setOk] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const [typed, setTyped] = useState('');
  const pointer = useRef({ x: 0, y: 0 });
  const fullText = t('heroGreet');

  // Decide support once, and load the 3D scene while the intro is still showing.
  useEffect(() => {
    const support = canUse3D();
    setOk(support.ok);
    setReduced(support.reduced);
    if (!support.ok) return undefined;
    const id =
      'requestIdleCallback' in window
        ? window.requestIdleCallback(() => setReady(true), { timeout: 1500 })
        : setTimeout(() => setReady(true), 800);
    return () => {
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  // Tells the chat button to hide on desktop while this robot is on the page.
  useEffect(() => {
    setHeroRobotActive(ok);
    return () => setHeroRobotActive(false);
  }, [ok, setHeroRobotActive]);

  // Turn the body toward the mouse (desktop only).
  useEffect(() => {
    if (!ok || window.matchMedia('(pointer: coarse)').matches) return undefined;
    const onMove = (e) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [ok]);

  // Type the greeting once per tap.
  useEffect(() => {
    if (!greetToken) {
      setTyped('');
      return undefined;
    }
    let i = 0;
    setTyped('');
    const id = setInterval(() => {
      i += 1;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(id);
    }, TYPE_MS);
    return () => clearInterval(id);
  }, [greetToken, fullText]);

  if (!ok) return null;

  const openChat = () => window.dispatchEvent(new Event('maz:open-chat'));

  return (
    <div className="hero-robot" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="hero-robot-glow" aria-hidden="true" />
      {greetToken > 0 && (
        <div className="hero-robot-bubble" role="status" aria-live="polite">
          {typed}
        </div>
      )}
      <button type="button" className="hero-robot-stage" onClick={openChat} aria-label={t('robotOpenAria')}>
        {ready && (
          <Suspense fallback={null}>
            <Scene
              waveSignal={greetToken}
              reduced={reduced}
              pointerRef={pointer}
              speaking={speaking}
            />
          </Suspense>
        )}
      </button>
      <button
        type="button"
        className="hero-robot-mute"
        onClick={toggleMute}
        aria-label={muted ? t('robotUnmuteAria') : t('robotMuteAria')}
      >
        {muted ? <VolumeOffRoundedIcon style={{ fontSize: 18 }} /> : <VolumeUpRoundedIcon style={{ fontSize: 18 }} />}
      </button>
    </div>
  );
}
