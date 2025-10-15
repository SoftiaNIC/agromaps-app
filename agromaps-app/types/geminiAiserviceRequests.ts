// Tipos para las solicitudes de la API de Chatbot con Gemini AI

// Enviar mensaje (opcionalmente con contexto de estudio de suelo)
export interface SendMessageRequest {
  message: string;
  soil_study_id?: number; // Opcional: si se incluye, el chatbot usa el contexto del estudio
}

// Nota: Los otros endpoints (GET Conversation, DELETE Conversation, GET Soil Context, GET Health) no requieren body