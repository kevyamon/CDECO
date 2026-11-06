import { useState, useCallback, useRef } from "react";

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs: number;
}

interface RateLimitState {
  isBlocked: boolean;
  remainingAttempts: number;
  blockEndTime: number | null;
}

const defaultConfig: RateLimitConfig = {
  maxAttempts: 5,
  windowMs: 60000, // 1 minute
  blockDurationMs: 300000, // 5 minutes block
};

export const useRateLimit = (config: Partial<RateLimitConfig> = {}) => {
  const finalConfig = { ...defaultConfig, ...config };
  const attemptsRef = useRef<number[]>([]);
  const [state, setState] = useState<RateLimitState>({
    isBlocked: false,
    remainingAttempts: finalConfig.maxAttempts,
    blockEndTime: null,
  });

  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();

    // Check if currently blocked
    if (state.blockEndTime && now < state.blockEndTime) {
      return false;
    }

    // Clear block if expired
    if (state.blockEndTime && now >= state.blockEndTime) {
      attemptsRef.current = [];
      setState({
        isBlocked: false,
        remainingAttempts: finalConfig.maxAttempts,
        blockEndTime: null,
      });
    }

    // Clean old attempts outside window
    attemptsRef.current = attemptsRef.current.filter(
      (timestamp) => now - timestamp < finalConfig.windowMs
    );

    // Check if limit exceeded
    if (attemptsRef.current.length >= finalConfig.maxAttempts) {
      const blockEndTime = now + finalConfig.blockDurationMs;
      setState({
        isBlocked: true,
        remainingAttempts: 0,
        blockEndTime,
      });
      return false;
    }

    return true;
  }, [state.blockEndTime, finalConfig]);

  const recordAttempt = useCallback(() => {
    const now = Date.now();
    attemptsRef.current.push(now);
    
    const remaining = Math.max(
      0,
      finalConfig.maxAttempts - attemptsRef.current.length
    );
    
    setState((prev) => ({
      ...prev,
      remainingAttempts: remaining,
    }));
  }, [finalConfig.maxAttempts]);

  const getBlockTimeRemaining = useCallback((): number => {
    if (!state.blockEndTime) return 0;
    const remaining = state.blockEndTime - Date.now();
    return Math.max(0, Math.ceil(remaining / 1000));
  }, [state.blockEndTime]);

  return {
    isBlocked: state.isBlocked,
    remainingAttempts: state.remainingAttempts,
    checkRateLimit,
    recordAttempt,
    getBlockTimeRemaining,
  };
};