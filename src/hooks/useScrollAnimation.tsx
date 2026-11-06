import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleIn" | "stagger";

interface ScrollAnimationOptions {
  type?: AnimationType;
  delay?: number;
  duration?: number;
  staggerAmount?: number;
  start?: string;
  once?: boolean;
}

export const useScrollAnimation = <T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) => {
  const ref = useRef<T>(null);
  const {
    type = "fadeUp",
    delay = 0,
    duration = 0.8,
    start = "top 85%",
    once = true,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animations: Record<AnimationType, gsap.TweenVars> = {
      fadeUp: {
        opacity: 0,
        y: 60,
      },
      fadeIn: {
        opacity: 0,
      },
      fadeLeft: {
        opacity: 0,
        x: -60,
      },
      fadeRight: {
        opacity: 0,
        x: 60,
      },
      scaleIn: {
        opacity: 0,
        scale: 0.9,
      },
      stagger: {
        opacity: 0,
        y: 40,
      },
    };

    const initialState = animations[type];

    // Use requestAnimationFrame to batch DOM reads/writes and avoid forced reflows
    requestAnimationFrame(() => {
      // Set initial state with GPU-accelerated properties
      gsap.set(element, { 
        ...initialState,
        willChange: "transform, opacity",
        force3D: true, // Force GPU acceleration
      });

      const tween = gsap.to(element, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        delay,
        ease: "power3.out",
        clearProps: "willChange", // Clean up after animation
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      });

      // Store cleanup function
      (element as any)._gsapCleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      const cleanup = (element as any)?._gsapCleanup;
      if (cleanup) cleanup();
    };
  }, [type, delay, duration, start, once]);

  return ref;
};

export const useStaggerAnimation = <T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) => {
  const ref = useRef<T>(null);
  const {
    delay = 0,
    duration = 0.6,
    staggerAmount = 0.1,
    start = "top 85%",
    once = true,
  } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.children;
    if (!children.length) return;

    // Use requestAnimationFrame to batch DOM operations
    requestAnimationFrame(() => {
      gsap.set(children, {
        opacity: 0,
        y: 40,
        willChange: "transform, opacity",
        force3D: true,
      });

      const tween = gsap.to(children, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger: staggerAmount,
        ease: "power3.out",
        clearProps: "willChange",
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      });

      (container as any)._gsapCleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      const cleanup = (container as any)?._gsapCleanup;
      if (cleanup) cleanup();
    };
  }, [delay, duration, staggerAmount, start, once]);

  return ref;
};

export default useScrollAnimation;
