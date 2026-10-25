import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeOut = [0.25, 0.46, 0.45, 0.94];

// NO blur — blur on page transitions is the #1 perf killer in CRA React
export const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -12 },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0 },
};

export const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const useMotionTuning = () => {
  const reduced = useReducedMotion();
  return useMemo(() => ({
    reduced,
    duration: reduced ? 0.01 : 0.45,
    pageDuration: reduced ? 0.01 : 0.35,
    // Lighter hover — no rotateX/Y (causes compositing layers on every card)
    cardHover: reduced ? {} : {
      y: -6,
      scale: 1.015,
      transition: { duration: 0.2, ease: easeOut },
    },
    spring: reduced
      ? { duration: 0.01 }
      : { type: 'spring', stiffness: 200, damping: 22, mass: 0.6 },
  }), [reduced]);
};
