import apiClient from "./client";

export interface ResourceItem {
  _id?: string;
  title: string;
  titleEn?: string;
  category: "guide" | "rapport" | "texte" | "other";
  description: string;
  descriptionEn?: string;
  fileUrl: string;
  fileName?: string;
  fileSize?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
}

export const resourceService = {
  async getResources(category?: string): Promise<ResourceItem[]> {
    try {
      const url = category ? `/resources?category=${category}` : "/resources";
      const response = await apiClient.get<{ success: boolean; data: ResourceItem[] }>(url);
      return response.data.data || [];
    } catch {
      return [];
    }
  },

  async createResource(data: Partial<ResourceItem>): Promise<ResourceItem> {
    const response = await apiClient.post<{ success: boolean; data: ResourceItem }>("/resources", data);
    return response.data.data;
  },

  async updateResource(id: string, data: Partial<ResourceItem>): Promise<ResourceItem> {
    const response = await apiClient.put<{ success: boolean; data: ResourceItem }>(`/resources/${id}`, data);
    return response.data.data;
  },

  async deleteResource(id: string): Promise<void> {
    await apiClient.delete(`/resources/${id}`);
  },
};

export default resourceService;

