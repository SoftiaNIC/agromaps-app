import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import AuthService from '../services/authService';
import { getUserData, clearAuthData, isAuthenticated, getAccessToken, setUserData, setAccessToken, setRefreshToken } from '../utils/storageHelpers';
import { ProfileResponse } from '../types/authServiceResponses';

export interface UseAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: ProfileResponse | null;
  error: string | null;
}

export interface UseAuthActions {
  login: (accessToken: string, refreshToken: string, userData: ProfileResponse) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

export interface UseAuthReturn extends UseAuthState, UseAuthActions {}

/**
 * Hook personalizado para manejar el estado global de autenticación
 */
export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<ProfileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Verificar el estado de autenticación al cargar el hook
   */
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Verificar el estado de autenticación
   */
  const checkAuthStatus = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Verificar si hay datos de usuario almacenados
      const storedUserData = await getUserData();
      const hasToken = await getAccessToken();
      
      if (storedUserData && hasToken) {
        // Si hay datos de usuario y token, asumir que está autenticado
        // La validación real se hará cuando sea necesario
        setIsAuthenticated(true);
        setUser(storedUserData);
      } else {
        // No hay datos o token, limpiar todo
        await clearAuthData();
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error verificando estado de autenticación:', error);
      setError('Error verificando autenticación');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Función para establecer el estado de login
   */
  const login = async (accessToken: string, refreshToken: string, userData: ProfileResponse): Promise<void> => {
    try {
      setIsAuthenticated(true);
      setUser(userData);
      setError(null);
    } catch (error) {
      console.error('Error estableciendo estado de login:', error);
      setUser(userData);
      setError('Error estableciendo sesión');
    }
  };

  /**
   * Función para hacer logout
   */
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Llamar al servicio de logout
      await AuthService.logout();

      // Limpiar estado local
      setIsAuthenticated(false);
      setUser(null);

      // Navegar al login
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error en logout:', error);
      setError('Error cerrando sesión');
      
      // Aún así limpiar el estado local
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Función para refrescar los datos del usuario
   */
  const refreshUser = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await AuthService.getProfile();
      const userData = response.data;
      
      setUser(userData);
    } catch (error) {
      console.error('Error refrescando datos del usuario:', error);
      setError('Error obteniendo datos del usuario');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Función para limpiar errores
   */
  const clearError = (): void => {
    setError(null);
  };

  return {
    // Estado
    isAuthenticated,
    isLoading,
    user,
    error,
    
    // Acciones
    login,
    logout,
    refreshUser,
    clearError,
  };
};
