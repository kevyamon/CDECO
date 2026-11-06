import { Variants } from "framer-motion";

let cachedIsMobile: boolean | null = null;
export const getIsMobile = () => {
  if (cachedIsMobile === null && typeof window !== "undefined") {
    cachedIsMobile = window.matchMedia("(max-width: 767px)").matches;
  }
  return cachedIsMobile ?? false;
};

export const getDuration = (base: number) => (getIsMobile() ? base * 0.7 : base);

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: getIsMobile() ? 20 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: getDuration(0.6),
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: getIsMobile() ? -15 : -25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: getDuration(0.6),
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: getIsMobile() ? -20 : -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: getDuration(0.6),
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: getIsMobile() ? 20 : 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: getDuration(0.6),
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: getDuration(0.5),
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: getIsMobile() ? 0.07 : 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: getIsMobile() ? 15 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: getDuration(0.5),
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const cardHover: Variants = {
  rest: { y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  hover: {
    y: getIsMobile() ? -2 : -6,
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};

export const buttonHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};

export const iconPulse: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.15, transition: { duration: 0.2, yoyo: Infinity } },
};

