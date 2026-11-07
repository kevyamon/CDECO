import { useState, useEffect, useCallback } from "react";
import { settingsService, ContactSettings, DEFAULT_CONTACT_SETTINGS } from "@/api/settingsService";

const STORAGE_KEY = "cdeco_site_contact_settings";
const SETTINGS_UPDATE_EVENT = "cdeco_settings_updated";

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<ContactSettings>(() => {
    if (typeof window === "undefined") return DEFAULT_CONTACT_SETTINGS;
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      return cached ? JSON.parse(cached) : DEFAULT_CONTACT_SETTINGS;
    } catch {
      return DEFAULT_CONTACT_SETTINGS;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await settingsService.getContactSettings();
      if (data) {
        setSettings(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch {
      // Fallback silencieux sur le cache local ou default
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();

    const handleUpdate = (event: CustomEvent<ContactSettings>) => {
      if (event.detail) {
        setSettings(event.detail);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(event.detail));
      }
    };

    window.addEventListener(SETTINGS_UPDATE_EVENT as any, handleUpdate as any);
    return () => {
      window.removeEventListener(SETTINGS_UPDATE_EVENT as any, handleUpdate as any);
    };
  }, [fetchSettings]);

  const updateSettingsLocal = useCallback((updated: ContactSettings) => {
    setSettings(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(SETTINGS_UPDATE_EVENT, { detail: updated }));
  }, []);

  return {
    settings,
    isLoading,
    fetchSettings,
    updateSettingsLocal,
  };
};

export default useSiteSettings;

