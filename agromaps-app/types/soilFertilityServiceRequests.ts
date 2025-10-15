// Tipos para las solicitudes y respuestas de la API de Estudios de Suelo

// Estudios de Suelo
export interface CreateStudyRequest {
  name: string;
  date_of_study: string; // Fecha en formato YYYY-MM-DD
  location_name: string;
  latitude: number;
  longitude: number;
  notes?: string;
  region?: string | null;
  laboratory_name?: string | null;
  analysis_date?: string | null;
  sample_number?: number;
}

export interface UpdateStudyRequest {
  name?: string;
  date_of_study?: string;
  location_name?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  region?: string | null;
  laboratory_name?: string | null;
  analysis_date?: string | null;
  is_active?: boolean;
}

export interface ReactivateStudyRequest {
  is_active: boolean;
}

// Macronutrientes
export interface CreateMacronutrientsRequest {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  calcium: number;
  magnesium: number;
  sulfur: number;
}

// Micronutrientes
export interface CreateMicronutrientsRequest {
  iron: number;
  manganese: number;
  zinc: number;
  copper: number;
  boron: number;
  molybdenum: number;
  chlorine: number;
  nickel: number;
}

// Propiedades Físicas
export interface CreatePhysicalPropertiesRequest {
  texture: string; // Ej: "sandy_loam"
  structure: string; // Ej: "granular"
  permeability: number;
  water_retention: number;
  bulk_density: number;
  drainage: string; // Ej: "well"
}

// Materia Orgánica
export interface CreateOrganicMatterRequest {
  organic_matter_content: number;
  organic_carbon: number;
  carbon_nitrogen_ratio: number;
  organic_matter_quality: string; // Ej: "buena"
  percentage?: number;
}

// Nivel de pH
export interface CreatePhLevelRequest {
  ph_value: number;
  ph_level: string; // Ej: "ligeramente_acido"
  buffer_ph: number;
  lime_requirement: number;
}

// Análisis Especiales
export interface CreateSpecialAnalysesRequest {
  conductivity: number;
  sodium_absorption_ratio: number;
  exchangeable_sodium_percentage: number;
  base_saturation: number;
  aluminum_saturation: number;
  cation_exchange_capacity: number;
}