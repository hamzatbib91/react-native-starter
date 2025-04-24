import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';


/**
 * Change the language of the app.
 *
 * @param lang - The language to change to. Supported values are 'en' and 'fr'.
 */
export const changeLanguage = async (lang: 'en' | 'fr') => {
  await i18n.changeLanguage(lang);
};

const config: InitOptions = {
  /**
   * The namespace of the translations.
   */
  ns: ['translation'],
  /**
   * The resources for the translations.
   */
  resources,
  /**
   * The fallback language in case the user's language is not supported.
   */
  fallbackLng: 'fr',
  /**
   * The interpolation options.
   */
  interpolation: {
    /**
     * Whether to escape the values or not.
     */
    escapeValue: false,
  },
};

i18n.use(initReactI18next).init(config);

export default i18n;
