import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import AuthService from '../services/authService';
import { validateLoginData } from '../utils/validationHelpers';
import { setAccessToken, setRefreshToken, setUserData } from '../utils/storageHelpers';
import { LoginRequest } from '../types/authServiceRequests';
import { LoginResponse } from '../types/authServiceResponses';

export interface UseLoginState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

export interface UseLoginActions {
  login: (data: LoginRequest) => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
}

export interface UseLoginReturn extends UseLoginState, UseLoginActions {}

/**
 * Hook personalizado para manejar el proceso de login
 */
export const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Función para realizar el login
   */
  const login = async (data: LoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);

      // Validar datos de entrada
      const validation = validateLoginData(data);
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        return;
      }

      // Realizar la petición de login
      const response = await AuthService.login(validation.sanitizedData);
      const loginData: LoginResponse = response.data;

      // Guardar tokens y datos del usuario
      await saveAuthData(loginData);

      // NO llamar a setAuthState - useAuth se actualizará automáticamente

      setIsSuccess(true);
      
      // Mostrar mensaje de éxito
      const userName = loginData.user.first_name || loginData.user.username;
      Alert.alert(
        'Éxito',
        `¡Bienvenido ${userName}!`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navegar al dashboard
              router.replace('/(dashboard)/overview');
            }
          }
        ]
      );

    } catch (error: any) {
      console.error('Error en login:', error);
      
      let errorMessage = 'Error al iniciar sesión. Por favor, intenta de nuevo.';
      
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.data?.non_field_errors) {
        errorMessage = error.response.data.non_field_errors.join(', ');
      } else if (error.response?.status === 401) {
        errorMessage = 'Credenciales incorrectas. Verifica tu email/usuario y contraseña.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Datos inválidos. Por favor, verifica la información ingresada.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Error del servidor. Por favor, intenta más tarde.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
      }

      setError(errorMessage);
      
      // Mostrar alerta de error
      Alert.alert(
        'Error',
        errorMessage,
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Función para guardar datos de autenticación
   */
  const saveAuthData = async (loginData: LoginResponse): Promise<void> => {
    try {
      await setAccessToken(loginData.access);
      await setRefreshToken(loginData.refresh);
      
      // Crear objeto de usuario completo para storage
      const userData = {
        id: loginData.user.id,
        username: loginData.user.username,
        email: loginData.user.email,
        first_name: loginData.user.first_name || loginData.user.username,
        last_name: loginData.user.last_name || '',
        phone_number: null,
        role: 'user',
        is_verified: false,
        created_at: new Date().toISOString(),
        is_active: loginData.user.is_active || true,
      };
      
      await setUserData(userData);
    } catch (error) {
      console.error('Error al guardar datos de autenticación:', error);
      throw new Error('Error al guardar la sesión');
    }
  };

  /**
   * Función para limpiar errores
   */
  const clearError = (): void => {
    setError(null);
  };

  /**
   * Función para limpiar estado de éxito
   */
  const clearSuccess = (): void => {
    setIsSuccess(false);
  };

  return {
    // Estado
    isLoading,
    error,
    isSuccess,
    
    // Acciones
    login,
    clearError,
    clearSuccess,
  };
};
