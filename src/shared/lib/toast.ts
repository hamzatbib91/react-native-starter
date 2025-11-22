/**
 * Toast utility for showing success, error, and info notifications in escooly.
 *
 * Uses react-native-toast-message under the hood, and applies a consistent, modern UI style.
 *
 * @module showToast
 */
import Toast, { ToastShowParams } from 'react-native-toast-message';

/**
 * Supported toast types.
 */
type ToastType = 'success' | 'error' | 'info';

/**
 * Shared base configuration for all toast messages.
 */
const baseToastConfig: Omit<ToastShowParams, 'type' | 'text1' | 'text2'> = {
  position: 'top',
  visibilityTime: 4000,
  autoHide: true,
  topOffset: 30,
  bottomOffset: 40,
};

/**
 * Show a toast notification.
 *
 * @param type - The type of toast ('success', 'error', 'info').
 * @param message - Main message (title) to display.
 * @param description - Optional description (subtitle).
 * @param options - Optional overrides for Toast.show.
 */
function show(type: ToastType, message: string, description = '', options?: Partial<ToastShowParams>) {
  Toast.show({
    ...baseToastConfig,
    ...options,
    type,
    text1: message,
    text2: description,
  });
}

/**
 * Toast notification API for escooly.
 *
 * Usage:
 *   showToast.success('Title', 'Optional description');
 *   showToast.error('Error!', 'Something went wrong');
 *   showToast.info('Heads up', 'This is an info message');
 *
 * Optionally, pass a fourth argument with Toast.show overrides.
 */
export const showToast = {
  /**
   * Show a success toast.
   * @param message - Main message (title).
   * @param description - Optional description.
   * @param options - Optional Toast.show overrides.
   */
  success: (message: string, description = '', options?: Partial<ToastShowParams>) =>
    show('success', message, description, options),

  /**
   * Show an error toast.
   * @param message - Main message (title).
   * @param description - Optional description.
   * @param options - Optional Toast.show overrides.
   */
  error: (message: string, description = '', options?: Partial<ToastShowParams>) =>
    show('error', message, description, options),

  /**
   * Show an info toast.
   * @param message - Main message (title).
   * @param description - Optional description.
   * @param options - Optional Toast.show overrides.
   */
  info: (message: string, description = '', options?: Partial<ToastShowParams>) =>
    show('info', message, description, options),
};