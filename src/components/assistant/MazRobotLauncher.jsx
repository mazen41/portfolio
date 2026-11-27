// src/components/assistant/MazRobotLauncher.jsx
// Replaces the glowing-orb launcher's visuals with the floating 3D robot.
// Chat open/close logic stays entirely in MazWidget.jsx - this only renders
// the trigger button itself and falls back to the original monogram orb
// whenever 3D isn't a good idea (reduced motion, slow connection, weak CPU,
// no WebGL, or while the model is still loading).
import { lazy, Suspense, useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

const Scene = lazy(() => import('./MazRobot3D'));

function canUse3D() {
  if (typeof window === 'undefined') return { ok: false, reduced: false };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conn = navigator.connection;
  const slow = conn && (conn.saveData || /2g/.test(conn.effectiveType || ''));
  const weak = (navigator.hardwareConcurrency || 4) <= 2;
  let gl = false;
  try {
    gl = !!document.createElement('canvas').getContext('webgl');
  } catch {
    gl = false;
  }
  return { ok: gl && !slow && !weak && !reduced, reduced };
}

function MonogramOrb({ onClick, ariaLabel }) {
  return (
    <button type="button" className="maz-orb-btn" onClick={onClick} aria-label={ariaLabel}>
      <span className="maz-orb-monogram" dir="ltr">MH</span>
    </button>
  );
}

export default function MazRobotLauncher({ onClick, ariaLabel, showBubble }) {
  const { lang, t } = useLanguage();
  const [mode, setMode] = useState({ ok: false, reduced: false });
  const [load, setLoad] = useState(false);
  const [wave, setWave] = useState(0);

  useEffect(() => {
    setMode(canUse3D());
    const id =
      'requestIdleCallback' in window
        ? window.requestIdleCallback(() => setLoad(true), { timeout: 3000 })
        : setTimeout(() => setLoad(true), 1200);
    return () =>
      'cancelIdleCallback' in window ? window.cancelIdleCallback(id) : clearTimeout(id);
  }, []);

  const handleClick = () => {
    setWave((n) => n + 1);
    onClick();
  };

  const button =
    !mode.ok || !load ? (
      <MonogramOrb onClick={handleClick} ariaLabel={ariaLabel} />
    ) : (
      <button
        type="button"
        className="maz-orb-btn maz-orb-btn-3d"
        onClick={handleClick}
        aria-label={ariaLabel}
      >
        <Suspense fallback={<span className="maz-orb-monogram" dir="ltr">MH</span>}>
          <Scene waveSignal={wave} reduced={mode.reduced} />
        </Suspense>
      </button>
    );

  // Bubble only appears once the launcher itself has settled (load === true,
  // whichever visual that ends up being) and the parent says it's still wanted
  // (chat not open, and never opened yet this session).
  const bubbleVisible = showBubble && load;

  return (
    <>
      {bubbleVisible && (
        <div className="maz-launcher-bubble" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <span>{t('mazBubbleGreeting')}</span>
          <button type="button" onClick={handleClick}>
            {t('mazBubbleStart')}
          </button>
        </div>
      )}
      {button}
    </>
  );
}
