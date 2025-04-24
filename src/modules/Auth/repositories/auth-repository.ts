import apiClient from "@/shared/config/api-client";
import { AUTH_ENDPOINTS } from "../constants/api-routes.constant";
import { LoginProps, AuthResponse, Auth } from "../types/auth.types";

/**
 * AuthRepository is responsible for handling all authentication-related API requests.
 * It contains methods for login, register, logout, and refresh token.
 */
export class AuthRepository {
    /**
     * Logs in a user with either a username or an email and a password.
     * 
     * @param {Object} data - Object containing username (optional), email (optional), and password (required).
     * @param {string} [data.email] - The email of the user.
     * @param {string} data.password - The password of the user.
     * 
     * @throws {Error} - Throws an error if neither username nor email is provided.
     * 
     * @returns {Promise<Object>} - A promise that resolves to the login response from the API.
     */
    async login(data: LoginProps): Promise<AuthResponse> {
      const { email, password } = data;
  
      // Validate that either email is provided
      if ( !email) {
        throw new Error('Either username or email must be provided');
      }
  
      // Send login request to the backend API
      const response = await apiClient({
        method: 'post',
        url: AUTH_ENDPOINTS.LOGIN,
        data: { email, password },
      });
  
      // Return the response data from the API
      return response.data.data;
    }
  
    /**
     * Logs out the currently authenticated user.
     * 
     * @returns {Promise<void>} - A promise that resolves once the logout request is completed.
     */
    async logout(): Promise<void> {
      // Send logout request to the backend API
      await apiClient({
        method: 'post',
        url: AUTH_ENDPOINTS.LOGOUT,
      });
    }
  
    /**
     * Refreshes the user's access token using the refresh token.
     * 
     * @returns {Promise<Object>} - A promise that resolves to the new authentication response with the refreshed token.
     */
    async refresh(): Promise<AuthResponse> {
      // Send refresh token request to the backend API
      const response = await apiClient({
        method: 'post',
        url: AUTH_ENDPOINTS.REFRESH,
        data: {},
      });
  
      // Return the response data from the API
      return response.data;
    }
  
    /**
     * Fetches the user's information.
     * 
     * @returns {Promise<Auth>} - A promise that resolves to the user's information.
     */
    async me(): Promise<Auth> {
      // Send user request to the backend API
      const response = await apiClient({
        method: 'get',
        url: AUTH_ENDPOINTS.ME,
      });
  
      // Return the response data from the API
      return response.data;
    }
  
  }