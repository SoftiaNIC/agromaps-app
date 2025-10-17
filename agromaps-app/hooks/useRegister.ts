import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import AuthService from '../services/authService';
import { validateRegistrationData } from '../utils/validationHelpers';
import { setAccessToken, setRefreshToken, setUserData } from '../utils/storageHelpers';
import { RegisterRequest } from '../types/authServiceRequests';
import { RegisterResponse, LoginResponse } from '../types/authServiceResponses';

export interface UseRegisterState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

export interface UseRegisterActions {
  register: (data: RegisterRequest) => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
}

export interface UseRegisterReturn extends UseRegisterState, UseRegisterActions {}

/**
 * Hook personalizado para manejar el proceso de registro
 */
export const useRegister = (): UseRegisterReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Función para realizar el registro
   */
  const register = async (data: RegisterRequest): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);

      // Validar datos de entrada
      const validation = validateRegistrationData(data);
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        Alert.alert(
          'Error de validación',
          validation.errors.join('\n'),
          [{ text: 'OK' }]
        );
        return;
      }

      // Realizar la petición de registro
      const response = await AuthService.register(validation.sanitizedData);
      const registerData: RegisterResponse = response.data;

      // Guardar tokens y datos del usuario automáticamente
      await saveAuthData({
        access: registerData.access,
        refresh: registerData.refresh,
        user: {
          id: registerData.user.id,
          username: registerData.user.username,
          email: registerData.user.email,
          first_name: registerData.user.first_name,
          last_name: registerData.user.last_name,
          is_staff: registerData.user.role === 'admin' || registerData.user.role === 'staff',
          is_active: registerData.user.is_active,
        }
      });

      setIsSuccess(true);
      
      // Mostrar mensaje de éxito
      Alert.alert(
        'Registro exitoso',
        `¡Cuenta creada exitosamente para ${registerData.user.first_name} ${registerData.user.last_name}!\n\n¡Ya estás logueado automáticamente!`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navegar directamente al dashboard
              router.replace('/(tabs)/dashboard');
            }
          }
        ]
      );

    } catch (error: any) {
      console.error('Error en registro:', error);
      
      let errorMessage = 'Error al crear la cuenta. Por favor, intenta de nuevo.';
      
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.data?.username) {
        errorMessage = `Nombre de usuario: ${error.response.data.username.join(', ')}`;
      } else if (error.response?.data?.email) {
        errorMessage = `Email: ${error.response.data.email.join(', ')}`;
      } else if (error.response?.data?.password) {
        errorMessage = `Contraseña: ${error.response.data.password.join(', ')}`;
      } else if (error.response?.data?.first_name) {
        errorMessage = `Nombre: ${error.response.data.first_name.join(', ')}`;
      } else if (error.response?.data?.last_name) {
        errorMessage = `Apellido: ${error.response.data.last_name.join(', ')}`;
      } else if (error.response?.data?.non_field_errors) {
        errorMessage = error.response.data.non_field_errors.join(', ');
      } else if (error.response?.status === 400) {
        errorMessage = 'Datos inválidos. Por favor, verifica la información ingresada.';
      } else if (error.response?.status === 409) {
        errorMessage = 'El email o nombre de usuario ya está en uso.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Error del servidor. Por favor, intenta más tarde.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
      }

      setError(errorMessage);
      
      // Mostrar alerta de error
      Alert.alert(
        'Error en el registro',
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
      await setUserData(loginData.user);
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
    register,
    clearError,
    clearSuccess,
  };
};
