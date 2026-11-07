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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
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
