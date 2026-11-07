import apiClient from "./client";

export interface Member {
  _id?: string;
  name: string;
  role: string;
  roleEn?: string;
  type: "bureau" | "cci" | "other";
  bio?: string;
  bioEn?: string;
  image?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
}

export const memberService = {
  async getMembers(type?: string): Promise<Member[]> {
    try {
      const url = type ? `/members?type=${type}` : "/members";
      const response = await apiClient.get<{ success: boolean; data: Member[] }>(url);
      return response.data.data || [];
    } catch {
      return [];
    }
  },

  async createMember(data: Partial<Member>): Promise<Member> {
    const response = await apiClient.post<{ success: boolean; data: Member }>("/members", data);
    return response.data.data;
  },

  async updateMember(id: string, data: Partial<Member>): Promise<Member> {
    const response = await apiClient.put<{ success: boolean; data: Member }>(`/members/${id}`, data);
    return response.data.data;
  },

  async deleteMember(id: string): Promise<void> {
    await apiClient.delete(`/members/${id}`);
  },
};

export default memberService;

