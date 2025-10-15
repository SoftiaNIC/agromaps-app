import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONSTANTS } from '../constants/apiConstants';
import { LoginRequest, RegisterRequest, RefreshTokenRequest, UpdateProfileRequest, ChangePasswordRequest, UpdateUserRequest, ChangeUserRoleRequest } from '../types/authServiceRequests';
import { LoginResponse, RegisterResponse, RefreshTokenResponse, ProfileResponse, UserListResponse, UserResponse, UserStatsResponse } from '../types/authServiceResponses';

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

class AuthService {
  /**
   * Iniciar sesión
   */
  async login(data: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
    return apiClient.post<LoginResponse>(API_CONSTANTS.AUTH.LOGIN, data);
  }

  /**
   * Registrar un nuevo usuario
   */
  async register(data: RegisterRequest): Promise<AxiosResponse<RegisterResponse>> {
    return apiClient.post<RegisterResponse>(API_CONSTANTS.AUTH.REGISTER, data);
  }

  /**
   * Refrescar el token de acceso
   */
  async refreshToken(data: RefreshTokenRequest): Promise<AxiosResponse<RefreshTokenResponse>> {
    return apiClient.post<RefreshTokenResponse>(API_CONSTANTS.AUTH.REFRESH_TOKEN, data);
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<AxiosResponse> {
    return apiClient.post(API_CONSTANTS.AUTH.LOGOUT);
  }

  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile(): Promise<AxiosResponse<ProfileResponse>> {
    return apiClient.get<ProfileResponse>(API_CONSTANTS.AUTH.PROFILE);
  }

  /**
   * Actualizar perfil del usuario autenticado
   */
  async updateProfile(data: UpdateProfileRequest): Promise<AxiosResponse<ProfileResponse>> {
    return apiClient.put<ProfileResponse>(API_CONSTANTS.AUTH.PROFILE, data);
  }

  /**
   * Cambiar contraseña del usuario autenticado
   */
  async changePassword(data: ChangePasswordRequest): Promise<AxiosResponse> {
    return apiClient.patch(API_CONSTANTS.AUTH.CHANGE_PASSWORD, data);
  }

  /**
   * Listar todos los usuarios (Admin)
   */
  async listUsers(): Promise<AxiosResponse<UserListResponse>> {
    return apiClient.get<UserListResponse>(API_CONSTANTS.USERS.LIST);
  }

  /**
   * Obtener usuario por ID (Admin)
   */
  async getUserById(id: number): Promise<AxiosResponse<UserResponse>> {
    return apiClient.get<UserResponse>(API_CONSTANTS.USERS.GET_BY_ID(id));
  }

  /**
   * Actualizar usuario (Admin)
   */
  async updateUser(id: number, data: UpdateUserRequest): Promise<AxiosResponse<UserResponse>> {
    return apiClient.put<UserResponse>(API_CONSTANTS.USERS.UPDATE(id), data);
  }

  /**
   * Actualizar estado activo de usuario (Admin)
   */
  async updateUserActive(id: number, data: { is_active: boolean }): Promise<AxiosResponse<UserResponse>> {
    return apiClient.put<UserResponse>(API_CONSTANTS.USERS.UPDATE_ACTIVE(id), data);
  }

  /**
   * Eliminar usuario (Admin)
   */
  async deleteUser(id: number): Promise<AxiosResponse> {
    return apiClient.delete(API_CONSTANTS.USERS.DELETE(id));
  }

  /**
   * Cambiar rol de usuario (Admin)
   */
  async changeUserRole(id: number, data: ChangeUserRoleRequest): Promise<AxiosResponse<UserResponse>> {
    return apiClient.patch<UserResponse>(API_CONSTANTS.USERS.CHANGE_ROLE(id), data);
  }

  /**
   * Obtener estadísticas de usuarios (Admin)
   */
  async getUserStats(): Promise<AxiosResponse<UserStatsResponse>> {
    return apiClient.get<UserStatsResponse>(API_CONSTANTS.STATS.USER_STATS);
  }
}

export default new AuthService();
