import apiClient from "./client";

export interface CdecoEvent {
  _id?: string;
  id?: string | number;
  title: string;
  titleEn?: string;
  category: "upcoming" | "highlight" | "past";
  date: string;
  dateEn?: string;
  location?: string;
  locationEn?: string;
  type?: string;
  typeEn?: string;
  typeColor?: string;
  description?: string;
  descriptionEn?: string;
  attendees?: string;
  attendeesEn?: string;
  impact?: string;
  impactEn?: string;
  image?: string;
  slug?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
}

export const eventService = {
  async getEvents(category?: string): Promise<CdecoEvent[]> {
    try {
      const response = await apiClient.get<{ success: boolean; data: CdecoEvent[] }>("/events", {
        params: { category },
      });
      return response.data.data || [];
    } catch {
      return [];
    }
  },

  async getEventById(id: string): Promise<CdecoEvent | null> {
    try {
      const response = await apiClient.get<{ success: boolean; data: CdecoEvent }>(`/events/${id}`);
      return response.data.data || null;
    } catch {
      return null;
    }
  },

  async createEvent(eventData: Partial<CdecoEvent>): Promise<CdecoEvent> {
    const response = await apiClient.post<{ success: boolean; data: CdecoEvent }>("/events", eventData);
    return response.data.data;
  },

  async updateEvent(id: string, eventData: Partial<CdecoEvent>): Promise<CdecoEvent> {
    const response = await apiClient.put<{ success: boolean; data: CdecoEvent }>(`/events/${id}`, eventData);
    return response.data.data;
  },

  async deleteEvent(id: string): Promise<void> {
    await apiClient.delete(`/events/${id}`);
  },
};

export default eventService;

