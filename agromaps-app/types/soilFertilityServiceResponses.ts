// Respuestas (Responses) para la API de Estudios de Suelo - Estructuras típicas basadas en endpoints comunes

// Estudios de Suelo
export interface StudyListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: StudyResponse[];
}

export interface StudyResponse {
  id: string;
  name: string;
  date_of_study: string;
  location_name: string;
  latitude: number;
  longitude: number;
  notes?: string;
  region?: string | null;
  laboratory_name?: string | null;
  analysis_date?: string | null;
  sample_number?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Macronutrientes
export interface MacronutrientsResponse {
  id: string;
  study: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  calcium: number;
  magnesium: number;
  sulfur: number;
  created_at: string;
}

// Micronutrientes
export interface MicronutrientsResponse {
  id: string;
  study: string;
  iron: number;
  manganese: number;
  zinc: number;
  copper: number;
  boron: number;
  molybdenum: number;
  chlorine: number;
  nickel: number;
  created_at: string;
}

// Propiedades Físicas
export interface PhysicalPropertiesResponse {
  id: string;
  study: string;
  texture: string;
  structure: string;
  permeability: number;
  water_retention: number;
  bulk_density: number;
  drainage: string;
  created_at: string;
}

// Materia Orgánica
export interface OrganicMatterResponse {
  id: string;
  study: string;
  organic_matter_content: number;
  organic_carbon: number;
  carbon_nitrogen_ratio: number;
  organic_matter_quality: string;
  percentage?: number;
  created_at: string;
}

// Nivel de pH
export interface PhLevelResponse {
  id: string;
  study: string;
  ph_value: number;
  ph_level: string;
  buffer_ph: number;
  lime_requirement: number;
  created_at: string;
}

// Análisis Especiales
export interface SpecialAnalysesResponse {
  id: string;
  study: string;
  conductivity: number;
  sodium_absorption_ratio: number;
  exchangeable_sodium_percentage: number;
  base_saturation: number;
  aluminum_saturation: number;
  cation_exchange_capacity: number;
  created_at: string;
}