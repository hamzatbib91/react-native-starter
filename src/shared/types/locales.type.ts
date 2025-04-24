
/**
 * The shape of the data for a single locale.
 */
export type LocaleData = Record<string, any>;

/**
 * The shape of a module containing locale data.
 */
export type LocalesModule = Record<'en' | 'fr', LocaleData>;