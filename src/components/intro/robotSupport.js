// src/components/intro/robotSupport.js
// Decides whether the 3D hero robot should run on this device.
// Reduced motion does not hide the robot: it shows the robot still (no float,
// no wave, no head follow). Weak or slow devices and no WebGL get no 3D at all.
export function canUse3D() {
  if (typeof window === 'undefined') return { ok: false, reduced: false };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conn = navigator.connection;
  const slow = !!conn && (conn.saveData || /2g/.test(conn.effectiveType || ''));
  const weak = (navigator.hardwareConcurrency || 4) <= 2;
  let gl = false;
  try {
    gl = !!document.createElement('canvas').getContext('webgl');
  } catch (e) {
    gl = false;
  }
  return { ok: gl && !slow && !weak, reduced };
}
