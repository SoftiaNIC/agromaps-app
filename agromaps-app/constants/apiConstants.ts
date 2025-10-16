/**
 * Constantes de API para el módulo de autenticación, estudios de suelo y chatbot.
 * Basado en el JSON de Postman proporcionado.
 * La BASE_URL se lee de la variable de entorno EXPO_PUBLIC_API_BASE_URL.
 */

export const API_CONSTANTS = {
  // Base URL - Se lee de la variable de entorno (ej. desde .env)
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',

  // Endpoints de Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/token/refresh',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },

  // Endpoints de Gestión de Usuarios
  USERS: {
    LIST: '/auth/users',
    GET_BY_ID: (id: number) => `/auth/users/${id}`,
    UPDATE: (id: number) => `/auth/users/${id}`,
    UPDATE_ACTIVE: (id: number) => `/auth/users/${id}`,
    DELETE: (id: number) => `/auth/users/${id}`,
    CHANGE_ROLE: (id: number) => `/auth/users/${id}/change-role`,
  },

  // Endpoints de Estadísticas (Admin)
  STATS: {
    USER_STATS: '/auth/stats/users',
  },

  // Endpoints de Estudios de Suelo
  SOIL_STUDIES: {
    STUDIES: {
      LIST: '/soil-studies/studies',
      CREATE: '/soil-studies/studies/',
      GET_BY_ID: (id: string) => `/soil-studies/studies/${id}/`,
      UPDATE: (id: string) => `/soil-studies/studies/${id}/`,
      REACTIVATE: (id: string) => `/soil-studies/studies/${id}/reactivate/`,
      DELETE: (id: string) => `/soil-studies/studies/${id}/`,
    },
    MACRONUTRIENTS: {
      LIST: (studyId: string) => `/soil-studies/studies/${studyId}/macronutrients/`,
      CREATE: (studyId: string) => `/soil-studies/studies/${studyId}/macronutrients/`,
    },
    MICRONUTRIENTS: {
      LIST: (studyId: string) => `/soil-studies/studies/${studyId}/micronutrients/`,
      CREATE: (studyId: string) => `/soil-studies/studies/${studyId}/micronutrients/`,
    },
    PHYSICAL_PROPERTIES: {
      GET: (studyId: string) => `/soil-studies/studies/${studyId}/physical-properties/`,
      CREATE: (studyId: string) => `/soil-studies/studies/${studyId}/physical-properties/`,
    },
    ORGANIC_MATTER: {
      GET: (studyId: string) => `/soil-studies/studies/${studyId}/organic-matter/`,
      CREATE: (studyId: string) => `/soil-studies/studies/${studyId}/organic-matter/`,
    },
    PH_LEVEL: {
      GET: (studyId: string) => `/soil-studies/studies/${studyId}/ph-level/`,
      CREATE: (studyId: string) => `/soil-studies/studies/${studyId}/ph-level/`,
    },
    SPECIAL_ANALYSES: {
      GET: (studyId: string) => `/soil-studies/studies/${studyId}/special-analyses/`,
      CREATE: (studyId: string) => `/soil-studies/studies/${studyId}/special-analyses/`,
    },
  },

  // Endpoints de Chatbot con Gemini AI
  CHATBOT: {
    SEND_MESSAGE: '/chatbot/message/',
    GET_CONVERSATION: (id: string) => `/chatbot/conversation/${id}/`,
    DELETE_CONVERSATION: (id: string) => `/chatbot/conversation/${id}/`,
    GET_SOIL_CONTEXT: (id: number) => `/chatbot/soil-context/${id}/`,
    HEALTH_CHECK: '/chatbot/health/',
  },
} as const;
