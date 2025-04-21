import {
  BACKEND_API_URL,
  MODE_ENV,
  AUTH_TOKEN,
  REFRESH_TOKEN,
  TOKEN_TYPE,
  USER_DATA,
} from '@/shared/constants';
import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from '@/shared/lib/toast';
import { formatErrorApi } from '../lib';

/**
 * Axios instance configured with the backend API URL.
 */
let apiClient: AxiosInstance = axios.create({
  baseURL: BACKEND_API_URL,
  timeout: 10000, // 10 second timeout
});

/**
 * Logs messages to the console in development mode.
 * @param message - The message to log.
 * @param log - Optional additional log information.
 */
const logOnDev = (message: string, log?: any): void => {
  if (MODE_ENV === 'development') {
    console.log(message, log);
  }
};

/**
 * Checks if the data object contains any files.
 * @param data - The data object to check.
 * @returns True if the data contains files, false otherwise.
 */
const hasFile = (data: Record<string, any>): boolean => {
  return Object.values(data).some(value => {
    // In React Native, we check for Blob or if the value has a uri property (for React Native files)
    if (value instanceof Blob || (value && typeof value === 'object' && 'uri' in value)) return true;
    return false;
  });
};

apiClient.interceptors.request.use(async (request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN);
  const { method, url } = request;

  if (token && request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }

  if (
    request.data &&
    typeof request.data === 'object' &&
    !(request.data instanceof FormData) &&
    hasFile(request.data)
  ) {
    const formData = new FormData();
    Object.entries(request.data).forEach(([key, value]) => {
      if (value instanceof Blob || (value && typeof value === 'object' && 'uri' in value)) {
        // Handle React Native file objects which typically have uri, type, and name properties
        if ('uri' in value) {
          const fileObj = value as { uri: string; type?: string; name?: string };
          formData.append(key, {
            uri: fileObj.uri,
            type: fileObj.type || 'application/octet-stream',
            name: fileObj.name || 'file',
          });
        } else {
          formData.append(key, value);
        }
      } else {
        formData.append(key, String(value));
      }
    });
    request.data = formData;
    if (request.headers) {
      delete request.headers['Content-Type'];
    }
  }

  logOnDev(`🚀 [${method?.toUpperCase()}] ${url} | Request`, request);

  return request;
});

// Response interceptor to log responses and handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    const { method, url } = response.config;
    const { status } = response;

    logOnDev(
      `✨ [${method?.toUpperCase()}] ${url} | Response ${status}`,
      response,
    );

    return response;
  },
  async (error: AxiosError<any>): Promise<never> => {
    const { message } = error;
    const { method, url } = error.config || {};

    // Handle network errors
    if (!error.response) {
      const errorMessage = {
        message:
          'Network Error: Unable to connect to the server. Please check your internet connection.',
        status: 'error',
      };

      showToast.error(
        'Network Error',
        'Unable to connect to the server. Please check your internet connection.',
      );

      logOnDev(
        `🚨 [${method?.toUpperCase()}] ${url} | Network Error | ${message}`,
        error,
      );

      return Promise.reject(errorMessage);
    }

    const { status, data } = error.response;

    // Handle authentication errors
    if (status === 401) {
      await AsyncStorage.multiRemove([
        AUTH_TOKEN,
        REFRESH_TOKEN,
        TOKEN_TYPE,
        USER_DATA,
      ]);
      showToast.error(
        'Authentication Error',
        'Your session has expired. Please log in again.',
      );
    }

    // Handle validation errors
    if (status === 422 && data.errors) {
      const denormalizedErrors = formatErrorApi(data.errors);
      error.response.data = { ...data, errors: denormalizedErrors };
      showToast.error('Validation Error', Object.values(denormalizedErrors)[0]);
    }

    // Handle other errors
    if (status !== 401 && status !== 422) {
      showToast.error(
        'Error',
        data?.message || 'An unexpected error occurred.',
      );
    }

    logOnDev(
      `🚨 [${method?.toUpperCase()}] ${url} | Error ${status} | ${
        data?.message || message
      }`,
      error,
    );

    return Promise.reject(error.response.data);
  },
);

export default apiClient;
