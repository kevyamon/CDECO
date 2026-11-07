import apiClient from "./client";

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: "admin" | "member";
  lastLogin?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user: UserProfile;
  accessToken: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", { email, password });
    if (response.data.accessToken) {
      localStorage.setItem("cdeco_access_token", response.data.accessToken);
      localStorage.setItem("cdeco_admin_user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      localStorage.removeItem("cdeco_access_token");
      localStorage.removeItem("cdeco_admin_user");
    }
  },

  async getMe(): Promise<UserProfile | null> {
    const token = typeof window !== "undefined" ? localStorage.getItem("cdeco_access_token") : null;
    if (!token) return null;
    try {
      const response = await apiClient.get<{ success: boolean; user: UserProfile }>("/auth/me");
      return response.data.user;
    } catch (err: any) {
      if (err?.response?.status === 401) {
        throw err;
      }
      return null;
    }
  },

  getCurrentUser(): UserProfile | null {
    const raw = localStorage.getItem("cdeco_admin_user");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
};

export default authService;

