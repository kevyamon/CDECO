import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import frCommon from "./locales/fr.json";
import frPages from "./locales/frPages.json";
import enCommon from "./locales/en.json";
import enPages from "./locales/enPages.json";

const resources = {
  fr: { translation: { ...frCommon, ...frPages } },
  en: { translation: { ...enCommon, ...enPages } },
};

// Liste des régions et pays francophones (France, Côte d'Ivoire, Bénin, Togo, Belgique, Congo, etc.)
const FRANCOPHONE_REGIONS = new Set([
  "fr", "ci", "bj", "tg", "sn", "cm", "cg", "cd", "ga", "bf", "ml", "ne",
  "td", "mg", "dj", "rw", "bi", "be", "ch", "ca", "lu", "mc", "gn", "cf"
]);

const FRANCOPHONE_TIMEZONES = [
  "Brazzaville", "Kinshasa", "Abidjan", "Dakar", "Douala", "Libreville",
  "Porto-Novo", "Lome", "Ouagadougou", "Niamey", "Ndjamena", "Paris",
  "Brussels", "Geneva", "Zurich", "Monaco", "Montreal", "Bamako", "Conakry",
  "Bangui", "Kigali", "Bujumbura", "Antananarivo"
];

/**
 * Détection instantanée et invisible du pays/navigateur :
 * - Français par défaut si pays francophone
 * - Anglais par défaut pour tout autre pays
 * - Respect absolu de la sélection explicite sauvegardée en localStorage
 */
export const detectInitialLanguage = (): "fr" | "en" => {
  if (typeof window === "undefined") return "fr";

  const saved = localStorage.getItem("cdeco_language");
  if (saved === "fr" || saved === "en") return saved;

  const navLangs = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
  for (const lang of navLangs) {
    const clean = lang.toLowerCase();
    if (clean.startsWith("fr")) return "fr";
    const parts = clean.split("-");
    if (parts.length > 1 && FRANCOPHONE_REGIONS.has(parts[1])) return "fr";
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (FRANCOPHONE_TIMEZONES.some((city) => tz.includes(city))) {
      return "fr";
    }
  } catch {
    // continue
  }

  return "en";
};

const initialLng = detectInitialLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLng,
    fallbackLng: "fr",
    supportedLngs: ["fr", "en"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "cdeco_language",
    },
  });

export default i18n;
