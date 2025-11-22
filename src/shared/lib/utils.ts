/**
 * Shared utility functions for escooly.
 *
 * Includes class name merging, text child detection, and API error formatting helpers.
 * All utilities are typed and designed for use in a modern React Native/TypeScript codebase.
 *
 * @module utils
 */
import { type ClassValue, clsx } from 'clsx';
import { PressableStateCallbackType } from 'react-native';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind, NativeWind, and custom class names conditionally.
 *
 * Uses `clsx` for conditional logic and `tailwind-merge` for deduplication.
 *
 * @param inputs - Any number of class values (strings, arrays, objects).
 * @returns A single merged class string.
 *
 * @example
 * cn('p-4', isActive && 'bg-primary', 'rounded-lg');
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Checks if the provided children are exclusively text nodes (string),
 * or a function returning only text nodes for Pressable components.
 *
 * Useful for optimizing rendering or applying special logic to text-only children.
 *
 * @param children - React node(s) or a render function for Pressable.
 * @returns True if all children are strings, otherwise false.
 */
export function isTextChildren(
  children: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode)
) {
  return Array.isArray(children)
    ? children.every((child) => typeof child === 'string')
    : typeof children === 'string';
}

/**
 * Formats API error responses by denormalizing error arrays into a single string per field.
 *
 * Takes an object where each key maps to an array of error messages (e.g., from a backend API),
 * and returns an object with the same keys mapping to the first error string (or empty string if none).
 *
 * @param errors - API error object, e.g. { email: ['Invalid email'], password: ['Required'] }
 * @returns Denormalized error object, e.g. { email: 'Invalid email', password: 'Required' }
 */
export function formatErrorApi(errors: Record<string, string[]>): Record<string, string | string> {
  const denormalized: Record<string, string | string> = {};
  for (const key in errors) {
    denormalized[key] = errors[key].length > 0 ? errors[key][0] : '';
  }
  return denormalized;
}