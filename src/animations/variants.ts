/**
 * =============================================================================
 * ANIMATION VARIANTS - Centralized animation presets for CDECO
 * =============================================================================
 *
 * This file contains all reusable animation variants for Framer Motion.
 * Import these variants in components for consistent, performant animations.
 *
 * USAGE:
 * import { fadeInUp, staggerContainer } from "@/animations/variants";
 * <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" />
 */

import { Variants } from "framer-motion";

// =============================================================================
// PERFORMANCE HELPERS
// =============================================================================

/** 
 * Safely detect mobile without causing forced reflow
 * Uses a cached value to avoid repeated DOM reads
 */
let _isMobile: boolean | null = null;
export const getIsMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  if (_isMobile === null) {
    _isMobile = window.matchMedia("(max-width: 767px)").matches;
  }
  return _isMobile;
};

// For backward compatibility, use a getter
export const isMobile = typeof window !== "undefined" 
  ? window.matchMedia("(max-width: 767px)").matches 
  : false;

/** Adjust duration based on device */
export const getDuration = (base: number): number => (isMobile ? base * 0.7 : base);

import { easeOut, easeInOut } from "./easings";
export { easeOut, easeInOut };

// =============================================================================
// ENTRANCE ANIMATIONS
// =============================================================================

/** Soft reveal animation - fade up from bottom */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: isMobile ? 15 : 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: getDuration(0.6),
      ease: easeOut,
    },
  },
};

/** Simple fade in */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: getDuration(0.5),
      ease: easeOut,
    },
  },
};

/** Fade in from left */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: isMobile ? -20 : -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: getDuration(0.6),
      ease: easeOut,
    },
  },
};

/** Fade in from right */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: isMobile ? 20 : 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: getDuration(0.6),
      ease: easeOut,
    },
  },
};

/** Fade in from top */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: isMobile ? -15 : -25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: getDuration(0.6),
      ease: easeOut,
    },
  },
};

/** Scale in animation */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: getDuration(0.5),
      ease: easeOut,
    },
  },
};

// =============================================================================
// STAGGER ANIMATIONS
// =============================================================================

/** Container for staggered children */
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: isMobile ? 0.08 : 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Stagger container with faster delay */
export const staggerContainerFast: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: isMobile ? 0.05 : 0.08,
      delayChildren: 0.05,
    },
  },
};

/** Item for staggered animation */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: isMobile ? 12 : 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: getDuration(0.5),
      ease: easeOut,
    },
  },
};

/** Stagger item with scale */
export const staggerItemScale: Variants = {
  hidden: {
    opacity: 0,
    y: isMobile ? 10 : 15,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: getDuration(0.4),
      ease: easeOut,
    },
  },
};

// =============================================================================
// HERO ANIMATIONS
// =============================================================================

/** Hero title animation */
export const heroTitle: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

/** Hero subtitle with delay */
export const heroSubtitle: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: easeOut,
    },
  },
};

/** Hero CTA with delay */
export const heroCTA: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.4,
      ease: easeOut,
    },
  },
};

// Re-export interactive animations, page/nav transitions and reduced-motion utilities
export * from "./interactions";
