import { useColorScheme as useNativewindColorScheme } from 'nativewind';

/**
 * Hook to get the current color scheme (light or dark) and to toggle it.
 *
 * @returns An object with the current color scheme, a boolean indicating if it's dark, a function to set the color scheme and a function to toggle it.
 */
export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();
  const isDarkColorScheme = colorScheme === 'dark';

  return {
    colorScheme: colorScheme ?? 'dark',
    isDarkColorScheme,
    setColorScheme,
    toggleColorScheme,
  };
}