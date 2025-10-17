import { useState, useEffect, useCallback } from 'react';
import SoilStudiesService, { CreateSoilStudyRequest, SoilStudyResponse } from '../services/soilStudiesService';
import { router } from 'expo-router';

export interface UseSoilStudiesState {
  studies: SoilStudyResponse[];
  isLoading: boolean;
  error: string | null;
}

export interface UseSoilStudiesActions {
  fetchStudies: () => Promise<void>;
  createStudy: (data: CreateSoilStudyRequest) => Promise<SoilStudyResponse | null>;
  clearError: () => void;
}

export interface UseSoilStudiesReturn extends UseSoilStudiesState, UseSoilStudiesActions {}

// Re-exportar tipos para facilitar el uso
export type { CreateSoilStudyRequest, SoilStudyResponse } from '../services/soilStudiesService';

/**
 * Hook personalizado para manejar estudios de suelo
 */
export const useSoilStudies = (): UseSoilStudiesReturn => {
  const [studies, setStudies] = useState<SoilStudyResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtener lista de estudios de suelo
   */
  const fetchStudies = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await SoilStudiesService.listStudies();
      setStudies(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al obtener estudios de suelo';
      setError(errorMessage);
      console.error('Error fetching studies:', err);

      // Si es un error de autenticación (e.g., 401 o token inválido), redirigir al login
      if (err.response?.status === 401 || errorMessage.includes('token') || errorMessage.includes('auth')) {
        router.replace('/(auth)/login');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Crear un nuevo estudio de suelo
   */
  const createStudy = useCallback(async (data: CreateSoilStudyRequest): Promise<SoilStudyResponse | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await SoilStudiesService.createStudy(data);
      const newStudy = response.data;

      // Agregar el nuevo estudio a la lista
      setStudies(prev => [newStudy, ...prev]);

      return newStudy;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al crear estudio de suelo';
      setError(errorMessage);
      console.error('Error creating study:', err);

      // Si es un error de autenticación, redirigir al login
      if (err.response?.status === 401 || errorMessage.includes('token') || errorMessage.includes('auth')) {
        router.replace('/(auth)/login');
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Limpiar error
   */
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  // Cargar estudios al montar el componente
  useEffect(() => {
    fetchStudies();
  }, [fetchStudies]);

  return {
    studies,
    isLoading,
    error,
    fetchStudies,
    createStudy,
    clearError,
  };
};

export default useSoilStudies;
