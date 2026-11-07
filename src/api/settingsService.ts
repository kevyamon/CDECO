import apiClient from "./client";

export interface ContactSettings {
  phone: string;
  email: string;
  address: string;
  addressEn: string;
  hours: string;
  hoursEn: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  website: string;
  // KAMPUS CDECO fields
  kampusDirectorName?: string;
  kampusDirectorTitle?: string;
  kampusDirectorTitleEn?: string;
  kampusDirectorBio?: string;
  kampusDirectorBioEn?: string;
  kampusDirectorImage?: string;
  kampusAddress?: string;
  kampusEmail?: string;
  kampusWebsite?: string;
}

export const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  phone: "+242 05 595 8119",
  email: "contact@cdeco.com",
  address: "Moungali Centre-Ville, Brazzaville, République du Congo",
  addressEn: "Moungali Downtown, Brazzaville, Republic of the Congo",
  hours: "Lun - Ven : 8h00 - 17h00 | Sam : 9h00 - 13h00",
  hoursEn: "Mon - Fri: 8:00 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM",
  facebook: "https://www.facebook.com/share/1B3SMHVzWk/?mibextid=wwXIfr",
  linkedin: "https://www.linkedin.com/company/chambre-de-diplomatie-economique-du-congo/",
  twitter: "https://twitter.com/cdeco",
  website: "https://cdeco.org",
  kampusDirectorName: "Steve Patrick MBOUKOU",
  kampusDirectorTitle: "Directeur KAMPUS CDECO",
  kampusDirectorTitleEn: "Director of KAMPUS CDECO",
  kampusDirectorBio: "Chargé de l'entrepreneuriat des jeunes et du développement des compétences pour la nouvelle génération congolaise.",
  kampusDirectorBioEn: "In charge of youth entrepreneurship and professional skill-building for the new Congolese generation.",
  kampusDirectorImage: "",
  kampusAddress: "n°40 Av. des 3 martyrs, Moungali Brazzaville",
  kampusEmail: "contact@cdeco.com",
  kampusWebsite: "www.cdeco.com",
};

export const settingsService = {
  async getContactSettings(): Promise<ContactSettings> {
    try {
      const response = await apiClient.get<{ success: boolean; data: ContactSettings }>("/settings/contact");
      return response.data.data || DEFAULT_CONTACT_SETTINGS;
    } catch {
      return DEFAULT_CONTACT_SETTINGS;
    }
  },

  async updateContactSettings(data: Partial<ContactSettings>): Promise<ContactSettings> {
    const response = await apiClient.put<{ success: boolean; data: ContactSettings }>("/settings/contact", data);
    return response.data.data;
  },
};

export default settingsService;
