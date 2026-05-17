import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

export const easeOutExpo = [0.16, 1, 0.3, 1];

export const pageVariants = {
  initial: { opacity: 0, y: 30, filter: 'blur(12px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -24, filter: 'blur(10px)' },
};

export const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const riseIn = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export const getSpring = (reduced) =>
  reduced
    ? { duration: 0.01 }
    : { type: 'spring', stiffness: 140, damping: 20, mass: 0.8 };

export const useMotionTuning = () => {
  const reduced = useReducedMotion();

  return useMemo(
    () => ({
      reduced,
      duration: reduced ? 0.01 : 0.7,
      spring: getSpring(reduced),
      cardHover: reduced
        ? {}
        : {
            y: -12,
            scale: 1.02,
            rotateX: 4,
            rotateY: -4,
            boxShadow: '0 24px 64px rgba(8, 12, 28, 0.36)',
          },
    }),
    [reduced]
  );
};
