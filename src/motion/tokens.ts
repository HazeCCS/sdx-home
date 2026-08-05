import type { Transition } from "motion/react";

export const easing = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  inOut: [0.76, 0, 0.24, 1] as [number, number, number, number],
};

export const duration = {
  fast: 0.24,
  base: 0.42,
  slow: 0.7,
};

export const pageTransition: Transition = {
  duration: duration.base,
  ease: easing.out,
};

export const menuTransition: Transition = {
  duration: duration.fast,
  ease: easing.out,
};

export const indicatorSpring: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 30,
};
