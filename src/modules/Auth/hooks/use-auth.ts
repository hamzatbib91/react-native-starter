import { useState, useCallback, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN, REFRESH_TOKEN, TOKEN_TYPE, USER_DATA } from '@/shared/constants';
import { useNavigation } from '@react-navigation/native';
import { AuthRepository } from '@/modules/Auth/repositories/auth-repository';
import { Auth, LoginProps, AuthResponse } from '@/modules/Auth/types/auth.types';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Auth | null>(null);
  const navigation = useNavigation();

  // Memoize repository instance so it isn’t recreated every render
  const authRepository = useMemo(() => new AuthRepository(), []);

  /**
   * Store tokens and user data in AsyncStorage
   */
  const storeTokens = async (data: AuthResponse) => {
    if (!data?.access_token) {
      throw new Error('No access token received');
    }
    try {
      await AsyncStorage.multiSet([
        [AUTH_TOKEN, data.access_token],
        [REFRESH_TOKEN, data.access_token], // Consider if refresh token should be different from access token
        [TOKEN_TYPE, data.token_type],
        [USER_DATA, JSON.stringify(data.user)]
      ]);
      setUser(data.user);
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw new Error('Failed to store authentication data');
    }
  };

  /**
   * Login function
   */
  const login = useCallback(async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await authRepository.login({ email, password });
      if (!response) {
        throw new Error('Invalid response from server');
      }
      await storeTokens(response);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [authRepository]);

  /**
   * Logout function
   */
  const logout = useCallback(async () => {
    try {
      await authRepository.logout();
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      await AsyncStorage.multiRemove([AUTH_TOKEN, REFRESH_TOKEN, TOKEN_TYPE, USER_DATA]);
      setIsAuthenticated(false);
      setUser(null);
      navigation.navigate('Auth', { screen: 'Login' });
    }
  }, [authRepository, navigation]);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN);
        const userData = await AsyncStorage.getItem(USER_DATA);
        if (token && userData) {
          setIsAuthenticated(true);
          setUser(JSON.parse(userData));
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuthState();
  }, []);



  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
}
