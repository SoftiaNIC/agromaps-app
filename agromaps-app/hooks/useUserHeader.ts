import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useAuth } from './useAuth';
import { router } from 'expo-router';

export interface UseUserHeaderState {
  userName: string;
  userEmail: string;
  isLoading: boolean;
  isLoggingOut: boolean;
  error: string | null;
}

export interface UseUserHeaderActions {
  handleLogout: () => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

export interface UseUserHeaderReturn extends UseUserHeaderState, UseUserHeaderActions {}

/**
 * Hook personalizado para manejar el header del usuario con información y logout
 */
export const useUserHeader = (): UseUserHeaderReturn => {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user, isLoading, logout: authLogout, refreshUser: authRefreshUser, clearError: authClearError } = useAuth();

  /**
   * Actualizar información del usuario cuando cambie
   */
  useEffect(() => {
    if (user) {
      const fullName = `${user.first_name} ${user.last_name}`.trim();
      setUserName(fullName || user.username);
      setUserEmail(user.email);
    } else {
      setUserName('');
      setUserEmail('');
    }
  }, [user]);

  /**
   * Función para manejar el logout con confirmación
   */
  const handleLogout = async (): Promise<void> => {
    try {
      setIsLoggingOut(true);
      setError(null);

      Alert.alert(
        'Cerrar Sesión',
        '¿Estás seguro de que quieres cerrar sesión?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => setIsLoggingOut(false)
          },
          {
            text: 'Cerrar Sesión',
            style: 'destructive',
            onPress: async () => {
              try {
                await authLogout();
                // La navegación se maneja en el hook useAuth
              } catch (error) {
                console.error('Error en logout:', error);
                setError('Error al cerrar sesión');
                setIsLoggingOut(false);
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error mostrando confirmación de logout:', error);
      setError('Error al procesar logout');
      setIsLoggingOut(false);
    }
  };

  /**
   * Función para refrescar datos del usuario
   */
  const refreshUser = async (): Promise<void> => {
    try {
      setError(null);
      await authRefreshUser();
    } catch (error) {
      console.error('Error refrescando usuario:', error);
      setError('Error al actualizar datos del usuario');
    }
  };

  /**
   * Función para limpiar errores
   */
  const clearError = (): void => {
    setError(null);
    authClearError();
  };

  return {
    // Estado
    userName,
    userEmail,
    isLoading,
    isLoggingOut,
    error,
    
    // Acciones
    handleLogout,
    clearError,
    refreshUser,
  };
};
