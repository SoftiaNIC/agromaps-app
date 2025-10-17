// Respuestas (Responses) para la API de autenticación - Estructuras típicas basadas en endpoints comunes
export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    is_staff: boolean;
    is_active?: boolean;
  };
}

export interface RegisterResponse {
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string | null;
    role: string;
    is_verified: boolean;
    created_at: string;
    is_active: boolean;
  };
  access: string;
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
}

export interface ProfileResponse {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  role: string;
  is_verified: boolean;
  created_at: string;
  is_active: boolean;
}

export interface UserListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_staff: boolean;
  }[];
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
}

export interface UserStatsResponse {
  total_users: number;
  active_users: number;
  staff_users: number;
}