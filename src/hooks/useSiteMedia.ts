import { useState, useEffect, useCallback } from "react";
import { mediaService } from "@/api/mediaService";

const STORAGE_KEY = "cdeco_site_media";
const MEDIA_UPDATE_EVENT = "cdeco_media_updated";

export const useSiteMedia = () => {
  const [mediaDict, setMediaDict] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const syncDictionary = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await mediaService.getMediaDictionary();
      if (data && Object.keys(data).length > 0) {
        setMediaDict((prev) => {
          const updated = { ...prev, ...data };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
      }
    } catch {
      // Échec silencieux si le backend est en veille, le cache local et les assets par défaut prennent le relais
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    syncDictionary();

    // Écoute des mises à jour émises depuis le backoffice pour actualisation instantanée
    const handleMediaUpdate = (event: CustomEvent<{ key: string; url: string }>) => {
      const { key, url } = event.detail;
      setMediaDict((prev) => {
        const next = { ...prev, [key]: url };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    };

    window.addEventListener(MEDIA_UPDATE_EVENT as any, handleMediaUpdate as any);
    return () => {
      window.removeEventListener(MEDIA_UPDATE_EVENT as any, handleMediaUpdate as any);
    };
  }, [syncDictionary]);

  const getMedia = useCallback(
    (key: string, fallbackDefault: string): string => {
      return mediaDict[key] || fallbackDefault;
    },
    [mediaDict]
  );

  const updateMediaLocal = useCallback((key: string, url: string) => {
    setMediaDict((prev) => {
      const next = { ...prev, [key]: url };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });

    // Notifie tous les autres composants du site
    window.dispatchEvent(
      new CustomEvent(MEDIA_UPDATE_EVENT, { detail: { key, url } })
    );
  }, []);

  return {
    mediaDict,
    getMedia,
    updateMediaLocal,
    syncDictionary,
    isLoading,
  };
};

export default useSiteMedia;

