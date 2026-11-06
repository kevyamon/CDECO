import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import {
  getIsMobile,
  getDuration,
  staggerItem,
  cardHover,
  buttonHover,
  iconPulse,
} from "./MotionVariants";

export interface MotionWrapperProps {
  children?: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export const FadeInUp = ({ children, className = "", delay = 0, once = true }: MotionWrapperProps) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: getIsMobile() ? 20 : 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: getDuration(0.6),
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInDown = ({ children, className = "", delay = 0, once = true }: MotionWrapperProps) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: getIsMobile() ? -15 : -25 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: getDuration(0.6),
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInLeft = ({ children, className = "", delay = 0, once = true }: MotionWrapperProps) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, x: getIsMobile() ? -20 : -40 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: getDuration(0.6),
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInRight = ({ children, className = "", delay = 0, once = true }: MotionWrapperProps) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, x: getIsMobile() ? 20 : 40 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: getDuration(0.6),
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ children, className = "", delay = 0, once = true }: MotionWrapperProps) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: getDuration(0.5),
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
}: MotionWrapperProps & { staggerDelay?: number }) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: getIsMobile() ? staggerDelay * 0.7 : staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }: Omit<MotionWrapperProps, "delay" | "once">) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
};

export const HoverCard = ({ children, className = "" }: Omit<MotionWrapperProps, "delay" | "once">) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} initial="rest" whileHover="hover" whileTap="tap" variants={cardHover}>
      {children}
    </motion.div>
  );
};

export const HoverButton = ({ children, className = "" }: Omit<MotionWrapperProps, "delay" | "once">) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} initial="rest" whileHover="hover" whileTap="tap" variants={buttonHover}>
      {children}
    </motion.div>
  );
};

export const PulseIcon = ({ children, className = "" }: Omit<MotionWrapperProps, "delay" | "once">) => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} initial="rest" whileHover="hover" variants={iconPulse}>
      {children}
    </motion.div>
  );
};

