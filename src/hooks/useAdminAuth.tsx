import { useEffect, useState, useCallback } from "react";
import authService, { UserProfile } from "@/api/authService";

export const useAdminAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(() => authService.getCurrentUser());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const cached = authService.getCurrentUser();
    const token = typeof window !== "undefined" ? localStorage.getItem("cdeco_access_token") : null;
    return Boolean(token && cached?.role === "admin");
  });
  const [loading, setLoading] = useState<boolean>(() => {
    // Si un admin valide est déjà en cache avec son token, chargement instantané sans blocage
    const cached = authService.getCurrentUser();
    const token = typeof window !== "undefined" ? localStorage.getItem("cdeco_access_token") : null;
    return !(token && cached?.role === "admin");
  });

  const checkAuth = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("cdeco_access_token") : null;
    if (!token) {
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    try {
      const profile = await authService.getMe();
      if (profile) {
        setUser(profile);
        setIsAdmin(profile.role === "admin");
        localStorage.setItem("cdeco_admin_user", JSON.stringify(profile));
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        await authService.logout();
        setUser(null);
        setIsAdmin(false);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const signOut = async () => {
    await authService.logout();
    setUser(null);
    setIsAdmin(false);
  };

  return { user, isAdmin, loading, signOut, refreshAuth: checkAuth };
};
