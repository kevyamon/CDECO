import { lazy, ComponentType } from "react";

/**
 * Charge un composant en différé avec tentatives automatiques de reconnexion
 * en cas de latence réseau, instabilité ou perte temporaire de paquets.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  retries = 3,
  interval = 800
) {
  return lazy(async () => {
    let lastError: any;
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        return await factory();
      } catch (err) {
        lastError = err;
        await new Promise((resolve) =>
          setTimeout(resolve, interval * Math.pow(1.5, attempt))
        );
      }
    }
    throw lastError;
  });
}

