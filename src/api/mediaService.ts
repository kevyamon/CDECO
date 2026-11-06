import apiClient from "./client";

export interface SiteMediaItem {
  _id: string;
  id?: string;
  key: string;
  title: string;
  category: "hero" | "leadership" | "gallery" | "partner" | "general";
  url: string;
  publicId: string;
  altText: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export const mediaService = {
  async getMediaDictionary(): Promise<Record<string, string>> {
    try {
      const response = await apiClient.get<{ success: boolean; data: Record<string, string> }>(
        "/media/dictionary"
      );
      return response.data.data || {};
    } catch {
      return {};
    }
  },

  async getMediaList(category?: string): Promise<SiteMediaItem[]> {
    const response = await apiClient.get<{ success: boolean; data: SiteMediaItem[] }>("/media", {
      params: { category },
    });
    return response.data.data;
  },

  async uploadMedia(formData: FormData): Promise<SiteMediaItem> {
    const response = await apiClient.post<{ success: boolean; data: SiteMediaItem }>(
      "/media/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },

  async deleteMedia(id: string): Promise<void> {
    await apiClient.delete(`/media/${id}`);
  },
};

export default mediaService;

