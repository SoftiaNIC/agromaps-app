import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONSTANTS } from '../constants/apiConstants';
import {
  CreateStudyRequest,
  UpdateStudyRequest,
  ReactivateStudyRequest,
  CreateMacronutrientsRequest,
  CreateMicronutrientsRequest,
  CreatePhysicalPropertiesRequest,
  CreateOrganicMatterRequest,
  CreatePhLevelRequest,
  CreateSpecialAnalysesRequest,
} from '../types/soilFertilityServiceRequests';
import {
  StudyListResponse,
  StudyResponse,
  MacronutrientsResponse,
  MicronutrientsResponse,
  PhysicalPropertiesResponse,
  OrganicMatterResponse,
  PhLevelResponse,
  SpecialAnalysesResponse,
} from '../types/soilFertilityServiceResponses';

// Crear una instancia de Axios con configuración base
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONSTANTS.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de acceso a las solicitudes autenticadas
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // O usa AsyncStorage en React Native
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
    if (error.response?.status === 401) {
      // Aquí puedes implementar lógica para refrescar el token si es necesario
    }
    return Promise.reject(error);
  }
);

class SoilFertilityService {
  // Estudios de Suelo
  async listStudies(): Promise<AxiosResponse<StudyListResponse>> {
    return apiClient.get<StudyListResponse>(API_CONSTANTS.SOIL_STUDIES.STUDIES.LIST);
  }

  async createStudy(data: CreateStudyRequest): Promise<AxiosResponse<StudyResponse>> {
    return apiClient.post<StudyResponse>(API_CONSTANTS.SOIL_STUDIES.STUDIES.CREATE, data);
  }

  async getStudyById(id: string): Promise<AxiosResponse<StudyResponse>> {
    return apiClient.get<StudyResponse>(API_CONSTANTS.SOIL_STUDIES.STUDIES.GET_BY_ID(id));
  }

  async updateStudy(id: string, data: UpdateStudyRequest): Promise<AxiosResponse<StudyResponse>> {
    return apiClient.patch<StudyResponse>(API_CONSTANTS.SOIL_STUDIES.STUDIES.UPDATE(id), data);
  }

  async reactivateStudy(id: string, data: ReactivateStudyRequest): Promise<AxiosResponse<StudyResponse>> {
    return apiClient.patch<StudyResponse>(API_CONSTANTS.SOIL_STUDIES.STUDIES.REACTIVATE(id), data);
  }

  async deleteStudy(id: string): Promise<AxiosResponse> {
    return apiClient.delete(API_CONSTANTS.SOIL_STUDIES.STUDIES.DELETE(id));
  }

  // Macronutrientes
  async listMacronutrients(studyId: string): Promise<AxiosResponse<MacronutrientsResponse[]>> {
    return apiClient.get<MacronutrientsResponse[]>(API_CONSTANTS.SOIL_STUDIES.MACRONUTRIENTS.LIST(studyId));
  }

  async createMacronutrients(studyId: string, data: CreateMacronutrientsRequest): Promise<AxiosResponse<MacronutrientsResponse>> {
    return apiClient.post<MacronutrientsResponse>(API_CONSTANTS.SOIL_STUDIES.MACRONUTRIENTS.CREATE(studyId), data);
  }

  // Micronutrientes
  async listMicronutrients(studyId: string): Promise<AxiosResponse<MicronutrientsResponse[]>> {
    return apiClient.get<MicronutrientsResponse[]>(API_CONSTANTS.SOIL_STUDIES.MICRONUTRIENTS.LIST(studyId));
  }

  async createMicronutrients(studyId: string, data: CreateMicronutrientsRequest): Promise<AxiosResponse<MicronutrientsResponse>> {
    return apiClient.post<MicronutrientsResponse>(API_CONSTANTS.SOIL_STUDIES.MICRONUTRIENTS.CREATE(studyId), data);
  }

  // Propiedades Físicas
  async getPhysicalProperties(studyId: string): Promise<AxiosResponse<PhysicalPropertiesResponse>> {
    return apiClient.get<PhysicalPropertiesResponse>(API_CONSTANTS.SOIL_STUDIES.PHYSICAL_PROPERTIES.GET(studyId));
  }

  async createPhysicalProperties(studyId: string, data: CreatePhysicalPropertiesRequest): Promise<AxiosResponse<PhysicalPropertiesResponse>> {
    return apiClient.post<PhysicalPropertiesResponse>(API_CONSTANTS.SOIL_STUDIES.PHYSICAL_PROPERTIES.CREATE(studyId), data);
  }

  // Materia Orgánica
  async getOrganicMatter(studyId: string): Promise<AxiosResponse<OrganicMatterResponse>> {
    return apiClient.get<OrganicMatterResponse>(API_CONSTANTS.SOIL_STUDIES.ORGANIC_MATTER.GET(studyId));
  }

  async createOrganicMatter(studyId: string, data: CreateOrganicMatterRequest): Promise<AxiosResponse<OrganicMatterResponse>> {
    return apiClient.post<OrganicMatterResponse>(API_CONSTANTS.SOIL_STUDIES.ORGANIC_MATTER.CREATE(studyId), data);
  }

  // Nivel de pH
  async getPhLevel(studyId: string): Promise<AxiosResponse<PhLevelResponse>> {
    return apiClient.get<PhLevelResponse>(API_CONSTANTS.SOIL_STUDIES.PH_LEVEL.GET(studyId));
  }

  async createPhLevel(studyId: string, data: CreatePhLevelRequest): Promise<AxiosResponse<PhLevelResponse>> {
    return apiClient.post<PhLevelResponse>(API_CONSTANTS.SOIL_STUDIES.PH_LEVEL.CREATE(studyId), data);
  }

  // Análisis Especiales
  async getSpecialAnalyses(studyId: string): Promise<AxiosResponse<SpecialAnalysesResponse>> {
    return apiClient.get<SpecialAnalysesResponse>(API_CONSTANTS.SOIL_STUDIES.SPECIAL_ANALYSES.GET(studyId));
  }

  async createSpecialAnalyses(studyId: string, data: CreateSpecialAnalysesRequest): Promise<AxiosResponse<SpecialAnalysesResponse>> {
    return apiClient.post<SpecialAnalysesResponse>(API_CONSTANTS.SOIL_STUDIES.SPECIAL_ANALYSES.CREATE(studyId), data);
  }
}

export default new SoilFertilityService();