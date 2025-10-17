/**
 * Tests para el servicio de autenticación
 */

import AuthService from '../services/authService';
import { API_CONSTANTS } from '../constants/apiConstants';

// Mock de axios para los tests
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn(),
      },
      response: {
        use: jest.fn(),
      },
    },
  })),
}));

// Mock de las utilidades de almacenamiento
jest.mock('../utils/storageHelpers', () => ({
  getAccessToken: jest.fn(() => Promise.resolve('mock-token')),
  setAccessToken: jest.fn(() => Promise.resolve()),
  getRefreshToken: jest.fn(() => Promise.resolve('mock-refresh-token')),
  setRefreshToken: jest.fn(() => Promise.resolve()),
  setUserData: jest.fn(() => Promise.resolve()),
  clearAuthData: jest.fn(() => Promise.resolve()),
  isAuthenticated: jest.fn(() => Promise.resolve(true)),
}));

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      // Mock de respuesta exitosa del servidor
      const mockLoginResponse = {
        data: {
          access: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...',
          refresh: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...',
          user: {
            id: 1,
            username: 'thisismyusername',
            email: 'test@example.com',
            first_name: 'Test',
            last_name: 'User',
            is_staff: false,
            is_active: true,
          },
        },
        status: 200,
        statusText: 'OK',
      };

      // Mock del método post de axios
      const mockAxiosInstance = {
        post: jest.fn().mockResolvedValue(mockLoginResponse),
      };

      // Reemplazar la instancia de axios en AuthService
      (AuthService as any).apiClient = mockAxiosInstance;

      // Datos de login para el test
      const loginData = {
        username_or_email: 'thisismyusername',
        password: 'securepassword123',
      };

      // Ejecutar el test
      const result = await AuthService.login(loginData);

      // Verificaciones
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        API_CONSTANTS.AUTH.LOGIN,
        loginData
      );
      expect(result).toEqual(mockLoginResponse);
      expect(result.data.access).toBe('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...');
      expect(result.data.user.username).toBe('thisismyusername');
    });

    it('should handle login error with invalid credentials', async () => {
      // Mock de error del servidor
      const mockError = {
        response: {
          status: 401,
          data: {
            detail: 'Invalid credentials',
          },
        },
      };

      // Mock del método post de axios para que falle
      const mockAxiosInstance = {
        post: jest.fn().mockRejectedValue(mockError),
      };

      (AuthService as any).apiClient = mockAxiosInstance;

      // Datos de login inválidos
      const loginData = {
        username_or_email: 'wrongusername',
        password: 'wrongpassword',
      };

      // Ejecutar el test y verificar que lance error
      await expect(AuthService.login(loginData)).rejects.toEqual(mockError);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        API_CONSTANTS.AUTH.LOGIN,
        loginData
      );
    });

    it('should handle network error', async () => {
      // Mock de error de red
      const mockNetworkError = {
        message: 'Network Error',
        code: 'NETWORK_ERROR',
      };

      const mockAxiosInstance = {
        post: jest.fn().mockRejectedValue(mockNetworkError),
      };

      (AuthService as any).apiClient = mockAxiosInstance;

      const loginData = {
        username_or_email: 'thisismyusername',
        password: 'securepassword123',
      };

      await expect(AuthService.login(loginData)).rejects.toEqual(mockNetworkError);
    });

    it('should handle server error (500)', async () => {
      // Mock de error del servidor
      const mockServerError = {
        response: {
          status: 500,
          statusText: 'Internal Server Error',
          data: {
            detail: 'Internal server error',
          },
        },
      };

      const mockAxiosInstance = {
        post: jest.fn().mockRejectedValue(mockServerError),
      };

      (AuthService as any).apiClient = mockAxiosInstance;

      const loginData = {
        username_or_email: 'thisismyusername',
        password: 'securepassword123',
      };

      await expect(AuthService.login(loginData)).rejects.toEqual(mockServerError);
    });
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const mockRegisterResponse = {
        data: {
          id: 2,
          username: 'newuser',
          email: 'newuser@example.com',
          first_name: 'New',
          last_name: 'User',
        },
        status: 201,
        statusText: 'Created',
      };

      const mockAxiosInstance = {
        post: jest.fn().mockResolvedValue(mockRegisterResponse),
      };

      (AuthService as any).apiClient = mockAxiosInstance;

      const registerData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'SecurePassword123!',
        password_confirm: 'SecurePassword123!',
        first_name: 'New',
        last_name: 'User',
      };

      const result = await AuthService.register(registerData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        API_CONSTANTS.AUTH.REGISTER,
        registerData
      );
      expect(result).toEqual(mockRegisterResponse);
      expect(result.data.username).toBe('newuser');
    });
  });

  describe('logout', () => {
    it('should successfully logout and clear auth data', async () => {
      const mockLogoutResponse = {
        data: {},
        status: 200,
        statusText: 'OK',
      };

      const mockAxiosInstance = {
        post: jest.fn().mockResolvedValue(mockLogoutResponse),
      };

      (AuthService as any).apiClient = mockAxiosInstance;

      const result = await AuthService.logout();

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(API_CONSTANTS.AUTH.LOGOUT);
      expect(result).toEqual(mockLogoutResponse);
    });
  });

  describe('getProfile', () => {
    it('should successfully get user profile', async () => {
      const mockProfileResponse = {
        data: {
          id: 1,
          username: 'thisismyusername',
          email: 'test@example.com',
          first_name: 'Test',
          last_name: 'User',
          is_staff: false,
          is_active: true,
        },
        status: 200,
        statusText: 'OK',
      };

      const mockAxiosInstance = {
        get: jest.fn().mockResolvedValue(mockProfileResponse),
      };

      (AuthService as any).apiClient = mockAxiosInstance;

      const result = await AuthService.getProfile();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(API_CONSTANTS.AUTH.PROFILE);
      expect(result).toEqual(mockProfileResponse);
      expect(result.data.username).toBe('thisismyusername');
    });
  });
});
