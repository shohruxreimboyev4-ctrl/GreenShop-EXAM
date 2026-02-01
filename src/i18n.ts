import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/common.json";
import ru from "./locales/ru/common.json";
import uz from "./locales/uz/common.json";

const resources = {
  en: { common: en },
  ru: { common: ru },
  uz: { common: uz },
} as const;

i18n
  .use(initReactI18next)
  .init({
    resources,

    lng: "uz",

    fallbackLng: "en",

    ns: ["common"],
    defaultNS: "common",

    interpolation: {
      escapeValue: false,
    },

    returnNull: false,
    returnEmptyString: false,
  });

export default i18n;
