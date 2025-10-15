// Tipos para las respuestas de la API de Chatbot con Gemini AI

// Respuesta al enviar mensaje
export interface SendMessageResponse {
  response: string; // Respuesta generada por Gemini
  conversation_id: string; // ID de la conversación creada o existente
}

// Respuesta al obtener conversación
export interface GetConversationResponse {
  conversation_id: string;
  messages: {
    role: string; // Ej: "user" o "assistant"
    content: string;
  }[];
}

// Respuesta al eliminar conversación
export interface DeleteConversationResponse {
  message: string; // Ej: "Conversación eliminada"
}

// Respuesta al obtener contexto de suelo
export interface SoilContextResponse {
  study_id: number;
  macronutrients?: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    calcium: number;
    magnesium: number;
    sulfur: number;
  };
  micronutrients?: {
    iron: number;
    manganese: number;
    zinc: number;
    copper: number;
    boron: number;
    molybdenum: number;
    chlorine: number;
    nickel: number;
  };
  physical_properties?: {
    texture: string;
    structure: string;
    permeability: number;
    water_retention: number;
    bulk_density: number;
    drainage: string;
  };
  organic_matter?: {
    organic_matter_content: number;
    organic_carbon: number;
    carbon_nitrogen_ratio: number;
    organic_matter_quality: string;
    percentage?: number;
  };
  ph_level?: {
    ph_value: number;
    ph_level: string;
    buffer_ph: number;
    lime_requirement: number;
  };
  special_analyses?: {
    conductivity: number;
    sodium_absorption_ratio: number;
    exchangeable_sodium_percentage: number;
    base_saturation: number;
    aluminum_saturation: number;
    cation_exchange_capacity: number;
  };
  // Puedes agregar más campos si el backend devuelve más datos
}

// Respuesta del health check
export interface HealthCheckResponse {
  status: string; // Ej: "healthy"
  gemini_configured: boolean;
}
