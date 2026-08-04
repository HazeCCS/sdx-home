import type { Variants } from "motion/react";

export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const mobileNavVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.18, ease: easeOut },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.22, ease: easeOut },
  },
};
