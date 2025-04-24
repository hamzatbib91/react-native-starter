import { LocalesModule } from '@/shared/types/locales.type';
import authLocales from "@/modules/Auth/locales";

/**
 * A dictionary of locales modules, keyed by module name.
 * 
 * Each module should export a dictionary with locale codes as keys and locale data as values.
 * 
 * @example
 * import en from './en.json';
 * import fr from './fr.json';
 * 
 * export default {
 *   en,
 *   fr,
 * };
 */
export const modules: Record<string, LocalesModule> = {
    auth: authLocales,
};