import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 60000, // 60s pour gérer sereinement le réveil (cold start) de Render
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour injecter le jeton d'accès dans les requêtes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("cdeco_access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour renouveler automatiquement le token si 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const hasToken = typeof window !== "undefined" && localStorage.getItem("cdeco_access_token");
    if (
      hasToken &&
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        if (data.accessToken) {
          localStorage.setItem("cdeco_access_token", data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem("cdeco_access_token");
        localStorage.removeItem("cdeco_admin_user");
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

