/**
 * Utilidades para validación y sanitización de datos de entrada
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedData?: any;
}

/**
 * Valida y sanitiza un email
 */
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('El email es requerido');
    return { isValid: false, errors };
  }

  // Sanitizar email: remover espacios y convertir a minúsculas
  const sanitizedEmail = email.trim().toLowerCase();
  
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitizedEmail)) {
    errors.push('El formato del email no es válido');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: sanitizedEmail
  };
};

/**
 * Valida y sanitiza una contraseña
 */
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('La contraseña es requerida');
    return { isValid: false, errors };
  }

  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres');
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra minúscula');
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra mayúscula');
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('La contraseña debe contener al menos un número');
  }

  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('La contraseña debe contener al menos un carácter especial (@$!%*?&)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: password // No sanitizar contraseñas por seguridad
  };
};

/**
 * Valida que dos contraseñas coincidan
 */
export const validatePasswordConfirmation = (password: string, confirmPassword: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!confirmPassword) {
    errors.push('La confirmación de contraseña es requerida');
    return { isValid: false, errors };
  }

  if (password !== confirmPassword) {
    errors.push('Las contraseñas no coinciden');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida y sanitiza un nombre de usuario
 */
export const validateUsername = (username: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!username) {
    errors.push('El nombre de usuario es requerido');
    return { isValid: false, errors };
  }

  // Sanitizar username: remover espacios y convertir a minúsculas
  const sanitizedUsername = username.trim().toLowerCase();
  
  if (sanitizedUsername.length < 3) {
    errors.push('El nombre de usuario debe tener al menos 3 caracteres');
  }

  if (sanitizedUsername.length > 30) {
    errors.push('El nombre de usuario no puede tener más de 30 caracteres');
  }

  // Solo permitir letras, números y guiones bajos
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(sanitizedUsername)) {
    errors.push('El nombre de usuario solo puede contener letras, números y guiones bajos');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: sanitizedUsername
  };
};

/**
 * Valida y sanitiza un nombre (first_name o last_name)
 */
export const validateName = (name: string, fieldName: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!name) {
    errors.push(`El ${fieldName} es requerido`);
    return { isValid: false, errors };
  }

  // Sanitizar nombre: remover espacios extra y capitalizar primera letra
  const sanitizedName = name.trim().replace(/\s+/g, ' ');
  const capitalizedName = sanitizedName.charAt(0).toUpperCase() + sanitizedName.slice(1).toLowerCase();
  
  if (capitalizedName.length < 2) {
    errors.push(`El ${fieldName} debe tener al menos 2 caracteres`);
  }

  if (capitalizedName.length > 50) {
    errors.push(`El ${fieldName} no puede tener más de 50 caracteres`);
  }

  // Solo permitir letras y espacios
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!nameRegex.test(capitalizedName)) {
    errors.push(`El ${fieldName} solo puede contener letras y espacios`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: capitalizedName
  };
};

/**
 * Valida todos los campos de registro
 */
export const validateRegistrationData = (data: {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
}): ValidationResult => {
  const errors: string[] = [];
  const sanitizedData: any = {};

  // Validar username
  const usernameValidation = validateUsername(data.username);
  if (!usernameValidation.isValid) {
    errors.push(...usernameValidation.errors);
  } else {
    sanitizedData.username = usernameValidation.sanitizedData;
  }

  // Validar email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors);
  } else {
    sanitizedData.email = emailValidation.sanitizedData;
  }

  // Validar contraseña
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.push(...passwordValidation.errors);
  } else {
    sanitizedData.password = passwordValidation.sanitizedData;
  }

  // Validar confirmación de contraseña
  const passwordConfirmValidation = validatePasswordConfirmation(data.password, data.password_confirm);
  if (!passwordConfirmValidation.isValid) {
    errors.push(...passwordConfirmValidation.errors);
  }

  // Validar nombres
  const firstNameValidation = validateName(data.first_name, 'nombre');
  if (!firstNameValidation.isValid) {
    errors.push(...firstNameValidation.errors);
  } else {
    sanitizedData.first_name = firstNameValidation.sanitizedData;
  }

  const lastNameValidation = validateName(data.last_name, 'apellido');
  if (!lastNameValidation.isValid) {
    errors.push(...lastNameValidation.errors);
  } else {
    sanitizedData.last_name = lastNameValidation.sanitizedData;
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData
  };
};

/**
 * Valida datos de login
 */
export const validateLoginData = (data: {
  username_or_email: string;
  password: string;
}): ValidationResult => {
  const errors: string[] = [];
  const sanitizedData: any = {};

  if (!data.username_or_email) {
    errors.push('El email o nombre de usuario es requerido');
  } else {
    // Sanitizar entrada
    sanitizedData.username_or_email = data.username_or_email.trim();
  }

  if (!data.password) {
    errors.push('La contraseña es requerida');
  } else {
    sanitizedData.password = data.password;
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData
  };
};
