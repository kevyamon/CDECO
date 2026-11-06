import { Variants } from "framer-motion";
import { easeOut, easeInOut } from "./easings";

// =============================================================================
// INTERACTIVE ANIMATIONS
// =============================================================================

/** Card hover effect */
export const cardHover = {
  scale: 1.02,
  y: -4,
  transition: {
    duration: 0.25,
    ease: easeOut,
  },
};

/** Card tap effect */
export const cardTap = {
  scale: 0.98,
  transition: {
    duration: 0.1,
  },
};

/** Button hover effect */
export const buttonHover = {
  scale: 1.03,
  transition: {
    duration: 0.2,
    ease: easeOut,
  },
};

/** Button tap effect */
export const buttonTap = {
  scale: 0.97,
  transition: {
    duration: 0.1,
  },
};

/** Icon pulse on hover */
export const iconPulse = {
  scale: [1, 1.15, 1],
  transition: {
    duration: 0.4,
    ease: "easeInOut",
  },
};

/** Subtle rotation on hover */
export const iconRotate = {
  rotate: 8,
  scale: 1.1,
  transition: {
    duration: 0.3,
    ease: easeOut,
  },
};

// =============================================================================
// PAGE TRANSITIONS
// =============================================================================

/** Page entrance animation */
export const pageEnter: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

/** Slide page transition */
export const pageSlide: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// =============================================================================
// NAVBAR ANIMATIONS
// =============================================================================

/** Mobile menu slide in */
export const mobileMenuSlide: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: easeInOut,
    },
  },
};

/** Overlay fade */
export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

/** Menu item stagger */
export const menuItemStagger: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

/** Menu item */
export const menuItem: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};

// =============================================================================
// UTILITY HOOKS & REDUCED MOTION HELPERS
// =============================================================================

/** Viewport options for whileInView */
export const viewportOnce = { once: true, margin: "-50px" };
export const viewportRepeat = { once: false, margin: "-100px" };

/** Get reduced motion preference - cached to avoid repeated reads */
let _prefersReducedMotion: boolean | null = null;
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  if (_prefersReducedMotion === null) {
    _prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return _prefersReducedMotion;
};

/** Get animation props respecting reduced motion */
export const getAnimationProps = (variants: Variants) => {
  if (prefersReducedMotion()) {
    return {};
  }
  return {
    variants,
    initial: "hidden",
    whileInView: "visible",
    viewport: viewportOnce,
  };
};

