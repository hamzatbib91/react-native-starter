import { type ClassValue, clsx } from 'clsx';
import { PressableStateCallbackType } from 'react-native';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isTextChildren(
  children: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode)
) {
  return Array.isArray(children)
    ? children.every((child) => typeof child === 'string')
    : typeof children === 'string';
}

export function formatErrorApi(errors: Record<string, string[]>): Record<string, string | string> {
  const denormalized: Record<string, string | string> = {};
  for (const key in errors) {
    denormalized[key] = errors[key].length > 0 ? errors[key][0] : '';
  }
  return denormalized;
}