import sharedLocales from '@/shared/locales';
import { modules } from '@/modules/locales';
import { LocaleData } from '@/shared/types/locales.type';


/**
 * languages is an array of strings representing the languages supported by the app.
 * The strings should be in the format of a language code (e.g. 'en' or 'fr').
 */
const languages: Array<'en' | 'fr'> = ['en', 'fr'];

/**
 * resources is an object with language codes as keys and an object with a `translation` property as values.
 * The `translation` property is an object with all the locales data merged together.
 */
const resources: Record<string, { translation: LocaleData }> = {};

languages.forEach((lang) => {
  resources[lang] = { translation: {} };

  /**
   * We loop through all the locales module and add their locales data to the resources object.
   * We spread the locales data of each module to the resources object.
   */
  Object.entries({...modules, shared: sharedLocales}).forEach(([_, moduleLocales]) => {
    const localeData = moduleLocales[lang];
    if (localeData) {
      resources[lang].translation = {
        ...resources[lang].translation,
        ...localeData,
      };
    }
  });
});

export { resources };
