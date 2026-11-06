import apiClient from "./client";

export interface ContactMessageData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactMessageItem extends ContactMessageData {
  _id: string;
  id?: string;
  isRead: boolean;
  createdAt: string;
}

export const contactService = {
  async submitContact(data: ContactMessageData) {
    const response = await apiClient.post("/contact", data);
    return response.data;
  },

  async getMessages(params?: { isRead?: boolean; page?: number; limit?: number }) {
    const response = await apiClient.get<{
      success: boolean;
      data: ContactMessageItem[];
      unreadCount: number;
      pagination: { total: number; page: number; limit: number; totalPages: number };
    }>("/contact", { params });
    return response.data;
  },

  async toggleReadStatus(id: string, isRead: boolean) {
    const response = await apiClient.patch(`/contact/${id}/read`, { isRead });
    return response.data;
  },

  async deleteMessage(id: string) {
    const response = await apiClient.delete(`/contact/${id}`);
    return response.data;
  },
};

export default contactService;

