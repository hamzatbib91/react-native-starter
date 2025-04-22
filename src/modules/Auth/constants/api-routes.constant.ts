/**
 * Authentication API endpoints used throughout the application
 * 
 * @property {string} LOGIN - Endpoint for user login (POST)
 * @property {string} LOGOUT - Endpoint for user logout (POST)
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/api/login', // POST
  LOGOUT: '/api/logout', // POST
  test: '/api/logout/{id}', // POST
};

