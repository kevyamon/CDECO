import apiClient from "./client";

export interface MembershipRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality?: string;
  age?: number | string;
  profession?: string;
  organization?: string;
  address?: string;
  memberType?: string;
  motivation?: string;
}

export interface MembershipRequestItem extends MembershipRequestData {
  _id: string;
  id?: string;
  status: "pending" | "approved" | "rejected";
  adminNotes?: string;
  createdAt: string;
}

export interface MembershipStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  approvalRate: number;
  monthly: Array<{ _id: { year: number; month: number }; count: number }>;
}

export const membershipService = {
  async submitMembership(data: MembershipRequestData) {
    const response = await apiClient.post("/memberships", data);
    return response.data;
  },

  async getMemberships(params?: { status?: string; search?: string; page?: number; limit?: number }) {
    const response = await apiClient.get<{
      success: boolean;
      data: MembershipRequestItem[];
      pagination: { total: number; page: number; limit: number; totalPages: number };
    }>("/memberships", { params });
    return response.data;
  },

  async updateStatus(id: string, status: "pending" | "approved" | "rejected", adminNotes?: string) {
    const response = await apiClient.patch(`/memberships/${id}/status`, { status, adminNotes });
    return response.data;
  },

  async deleteMembership(id: string) {
    const response = await apiClient.delete(`/memberships/${id}`);
    return response.data;
  },

  async getStats(): Promise<MembershipStats> {
    const response = await apiClient.get<{ success: boolean; data: MembershipStats }>("/memberships/stats");
    return response.data.data;
  },
};

export default membershipService;

