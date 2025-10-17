import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONSTANTS } from '../constants/apiConstants';
import { getAccessToken, getRefreshToken, setAccessToken, clearAuthData } from '../utils/storageHelpers';
import { router } from 'expo-router'; // Importar router para redirección

// Crear una instancia de Axios con configuración base
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONSTANTS.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de acceso a las solicitudes autenticadas
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas (ej. refresh token si es necesario)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Intentar refrescar el token
        const refreshToken = await getRefreshToken();
        if (refreshToken) {
          const response = await apiClient.post(
            API_CONSTANTS.AUTH.REFRESH_TOKEN,
            { refresh: refreshToken }
          );

          const { access } = response.data;
          await setAccessToken(access);

          // Reintentar la petición original con el nuevo token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Si falla el refresh, limpiar datos de autenticación y redirigir al login
        console.error('Error al refrescar token:', refreshError);
        await clearAuthData();
        // Redirigir al login (solo si no estamos ya en una pantalla de auth)
        try {
          if (typeof window !== 'undefined' && window.location.pathname && !window.location.pathname.includes('/auth')) {
            router.replace('/(auth)/login');
          } else {
            router.replace('/(auth)/login'); // Fallback
          }
        } catch (redirectError) {
          console.error('Error al redirigir:', redirectError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export interface CreateSoilStudyRequest {
  name: string;
  date_of_study: string;
  location_name: string;
  latitude: number;
  longitude: number;
  notes?: string;
  region: string;
  laboratory_name?: string | null;
  analysis_date?: string | null;
  sample_number: number;
}

export interface SoilStudyResponse {
  id: string;
  name: string;
  date_of_study: string;
  location_name: string;
  latitude: number;
  longitude: number;
  notes?: string;
  region: string;
  laboratory_name?: string | null;
  analysis_date?: string | null;
  sample_number: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

class SoilStudiesService {
  /**
   * Listar estudios de suelo
   */
  async listStudies(): Promise<AxiosResponse<SoilStudyResponse[]>> {
    return apiClient.get<SoilStudyResponse[]>(API_CONSTANTS.SOIL_STUDIES.STUDIES.LIST);
  }

  /**
   * Crear un nuevo estudio de suelo
   */
  async createStudy(data: CreateSoilStudyRequest): Promise<AxiosResponse<SoilStudyResponse>> {
    return apiClient.post<SoilStudyResponse>(API_CONSTANTS.SOIL_STUDIES.STUDIES.CREATE, data);
  }

  /**
   * Obtener estudio de suelo por ID
   */
  async getStudyById(id: string): Promise<AxiosResponse<SoilStudyResponse>> {
    return apiClient.get<SoilStudyResponse>(API_CONSTANTS.SOIL_STUDIES.STUDIES.GET_BY_ID(id));
  }
}

export default new SoilStudiesService();
