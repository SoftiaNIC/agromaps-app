import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONSTANTS } from '../constants/apiConstants';
import { SendMessageRequest } from '../types/geminiAiserviceRequests';
import {
  SendMessageResponse,
  GetConversationResponse,
  DeleteConversationResponse,
  SoilContextResponse,
  HealthCheckResponse,
} from '../types/geminiAiServiceResponses';

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

class GeminiAiService {
  /**
   * Enviar un mensaje al chatbot (opcionalmente con contexto de estudio de suelo)
   */
  async sendMessage(data: SendMessageRequest): Promise<AxiosResponse<SendMessageResponse>> {
    return apiClient.post<SendMessageResponse>(API_CONSTANTS.CHATBOT.SEND_MESSAGE, data);
  }

  /**
   * Obtener una conversación por ID
   */
  async getConversation(id: string): Promise<AxiosResponse<GetConversationResponse>> {
    return apiClient.get<GetConversationResponse>(API_CONSTANTS.CHATBOT.GET_CONVERSATION(id));
  }

  /**
   * Eliminar una conversación por ID
   */
  async deleteConversation(id: string): Promise<AxiosResponse<DeleteConversationResponse>> {
    return apiClient.delete<DeleteConversationResponse>(API_CONSTANTS.CHATBOT.DELETE_CONVERSATION(id));
  }

  /**
   * Obtener contexto de suelo por estudio ID
   */
  async getSoilContext(id: number): Promise<AxiosResponse<SoilContextResponse>> {
    return apiClient.get<SoilContextResponse>(API_CONSTANTS.CHATBOT.GET_SOIL_CONTEXT(id));
  }

  /**
   * Verificar el estado del chatbot
   */
  async healthCheck(): Promise<AxiosResponse<HealthCheckResponse>> {
    return apiClient.get<HealthCheckResponse>(API_CONSTANTS.CHATBOT.HEALTH_CHECK);
  }
}

export default new GeminiAiService();