import heroMeetingImg from "@/assets/hero-meeting.jpg";
import diplomatieImg from "@/assets/missions/diplomatie.jpg";
import pmeImg from "@/assets/missions/pme.jpg";
import intermediationImg from "@/assets/missions/intermediation.jpg";
import hydrocarburesImg from "@/assets/sectors/hydrocarbures.jpg";
import tourismeImg from "@/assets/sectors/tourisme.jpg";
import agricultureImg from "@/assets/sectors/agriculture.jpg";
import minesImg from "@/assets/sectors/mines.jpg";
import foretsImg from "@/assets/sectors/forets.jpg";
import infrastructureImg from "@/assets/sectors/infrastructure.jpg";
import educationImg from "@/assets/sectors/education.jpg";
import numeriqueImg from "@/assets/sectors/numerique.jpg";
import energieImg from "@/assets/sectors/energie.jpg";
import autresImg from "@/assets/sectors/autres.jpg";

export type MediaGroup = "all" | "sectors" | "pillars" | "hero_video";

export interface MediaSlot {
  key: string;
  fallbackKey?: string;
  group: "sectors" | "pillars" | "hero_video";
  title: string;
  section: string;
  description: string;
  type: "image" | "video";
  category: "hero" | "video" | "section";
  defaultAsset: string;
}

export const KEY_SLOTS: MediaSlot[] = [
  // 1. Haut de page & Vidéo
  {
    key: "hero_banner",
    group: "hero_video",
    title: "Bannière d'en-tête (Haut du site)",
    section: "Chambre de Diplomatie Économique",
    description: "Image de fond plein écran du haut de page d'accueil",
    type: "image",
    category: "hero",
    defaultAsset: heroMeetingImg,
  },
  {
    key: "home_video",
    group: "hero_video",
    title: "Vidéo de Présentation CDECO",
    section: "Découvrez la CDECO en Vidéo",
    description: "Vidéo institutionnelle intégrée sous la section d'accueil (MP4/WebM)",
    type: "video",
    category: "video",
    defaultAsset: "/videos/presentation-cdeco.mp4",
  },

  // 2. Trois Piliers d'Intervention
  {
    key: "mission_pillar_1",
    group: "pillars",
    title: "Pilier 1 : Diplomatie Commerciale",
    section: "Trois Piliers d'Intervention",
    description: "Carte du premier pilier d'intervention",
    type: "image",
    category: "section",
    defaultAsset: diplomatieImg,
  },
  {
    key: "mission_pillar_2",
    group: "pillars",
    title: "Pilier 2 : Soutien aux PME/PMI",
    section: "Trois Piliers d'Intervention",
    description: "Carte du deuxième pilier d'intervention",
    type: "image",
    category: "section",
    defaultAsset: pmeImg,
  },
  {
    key: "mission_pillar_3",
    group: "pillars",
    title: "Pilier 3 : Promotion de l'Excellence",
    section: "Trois Piliers d'Intervention",
    description: "Carte du troisième pilier d'intervention",
    type: "image",
    category: "section",
    defaultAsset: intermediationImg,
  },

  // 3. Secteurs Stratégiques d'Investissement (10 Secteurs)
  {
    key: "sector_slide_1",
    fallbackKey: "sectors_banner",
    group: "sectors",
    title: "Secteur 1 : Hydrocarbures",
    section: "Secteurs Stratégiques",
    description: "Pilier Central de l'Économie - Pétrole & Gaz Amont",
    type: "image",
    category: "section",
    defaultAsset: hydrocarburesImg,
  },
  {
    key: "sector_slide_2",
    group: "sectors",
    title: "Secteur 2 : Tourisme & Écotourisme",
    section: "Secteurs Stratégiques",
    description: "Ambitions Stratégiques et Projets Clés",
    type: "image",
    category: "section",
    defaultAsset: tourismeImg,
  },
  {
    key: "sector_slide_3",
    group: "sectors",
    title: "Secteur 3 : Agriculture & Agro-industrie",
    section: "Secteurs Stratégiques",
    description: "Potentiel Inexploité et Terres Arables",
    type: "image",
    category: "section",
    defaultAsset: agricultureImg,
  },
  {
    key: "sector_slide_4",
    group: "sectors",
    title: "Secteur 4 : Mines & Minéraux Stratégiques",
    section: "Secteurs Stratégiques",
    description: "Richesses du Sous-Sol - Fer, Potasse, Métaux Rares",
    type: "image",
    category: "section",
    defaultAsset: minesImg,
  },
  {
    key: "sector_slide_5",
    group: "sectors",
    title: "Secteur 5 : Forêts & Économie Verte",
    section: "Secteurs Stratégiques",
    description: "Patrimoine Durable du Bassin du Congo",
    type: "image",
    category: "section",
    defaultAsset: foretsImg,
  },
  {
    key: "sector_slide_6",
    group: "sectors",
    title: "Secteur 6 : Infrastructures & Transports",
    section: "Secteurs Stratégiques",
    description: "Port de Pointe-Noire et Corridors Régionaux",
    type: "image",
    category: "section",
    defaultAsset: infrastructureImg,
  },
  {
    key: "sector_slide_7",
    group: "sectors",
    title: "Secteur 7 : Éducation & Formation",
    section: "Secteurs Stratégiques",
    description: "Capital Humain et Formation d'Excellence",
    type: "image",
    category: "section",
    defaultAsset: educationImg,
  },
  {
    key: "sector_slide_8",
    group: "sectors",
    title: "Secteur 8 : Numérique & Innovation",
    section: "Secteurs Stratégiques",
    description: "Transformation Digitale et Hub Technologique",
    type: "image",
    category: "section",
    defaultAsset: numeriqueImg,
  },
  {
    key: "sector_slide_9",
    group: "sectors",
    title: "Secteur 9 : Énergie & Transition",
    section: "Secteurs Stratégiques",
    description: "Potentiel Hydroélectrique et Énergies Propres",
    type: "image",
    category: "section",
    defaultAsset: energieImg,
  },
  {
    key: "sector_slide_10",
    group: "sectors",
    title: "Secteur 10 : Diversification & Services",
    section: "Secteurs Stratégiques",
    description: "Banques, Assurances, Logistique et Commerce Régional",
    type: "image",
    category: "section",
    defaultAsset: autresImg,
  },
];

