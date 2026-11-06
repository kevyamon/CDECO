import { useEffect, useState, useCallback } from "react";
import authService, { UserProfile } from "@/api/authService";

export const useAdminAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(() => authService.getCurrentUser());
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const cached = authService.getCurrentUser();
    return cached?.role === "admin";
  });
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const profile = await authService.getMe();
      if (profile && profile.role === "admin") {
        setUser(profile);
        setIsAdmin(true);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    } catch {
      setUser(null);
      setIsAdmin(false);
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
