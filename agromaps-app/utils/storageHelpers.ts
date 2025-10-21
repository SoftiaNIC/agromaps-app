/**
 * Utilidades para el manejo de almacenamiento local
 * Compatible con web (localStorage) y React Native (AsyncStorage)
 */

// Función para obtener el token de acceso
export const getAccessToken = async (): Promise<string | null> => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Web - usar localStorage
      return localStorage.getItem('access_token');
    } else {
      // React Native - usar AsyncStorage
      // TODO: Implementar AsyncStorage cuando sea necesario
      // const AsyncStorage = await import('@react-native-async-storage/async-storage');
      // return await AsyncStorage.getItem('access_token');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener access token:', error);
    return null;
  }
};

// Función para guardar el token de acceso
export const setAccessToken = async (token: string): Promise<void> => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Web - usar localStorage
      localStorage.setItem('access_token', token);
    } else {
      // React Native - usar AsyncStorage
      // TODO: Implementar AsyncStorage cuando sea necesario
      // const AsyncStorage = await import('@react-native-async-storage/async-storage');
      // await AsyncStorage.setItem('access_token', token);
    }
  } catch (error) {
    console.error('Error al guardar access token:', error);
    throw error;
  }
};

// Función para obtener el refresh token
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Web - usar localStorage
      return localStorage.getItem('refresh_token');
    } else {
      // React Native - usar AsyncStorage
      // TODO: Implementar AsyncStorage cuando sea necesario
      // const AsyncStorage = await import('@react-native-async-storage/async-storage');
      // return await AsyncStorage.getItem('refresh_token');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener refresh token:', error);
    return null;
  }
};

// Función para guardar el refresh token
export const setRefreshToken = async (token: string): Promise<void> => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Web - usar localStorage
      localStorage.setItem('refresh_token', token);
    } else {
      // React Native - usar AsyncStorage
      // TODO: Implementar AsyncStorage cuando sea necesario
      // const AsyncStorage = await import('@react-native-async-storage/async-storage');
      // await AsyncStorage.setItem('refresh_token', token);
    }
  } catch (error) {
    console.error('Error al guardar refresh token:', error);
    throw error;
  }
};

// Función para obtener datos del usuario
export const getUserData = async (): Promise<any | null> => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Web - usar localStorage
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } else {
      // React Native - usar AsyncStorage
      // TODO: Implementar AsyncStorage cuando sea necesario
      // const AsyncStorage = await import('@react-native-async-storage/async-storage');
      // const userData = await AsyncStorage.getItem('user_data');
      // return userData ? JSON.parse(userData) : null;
      return null;
    }
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return null;
  }
};

// Función para guardar datos del usuario
export const setUserData = async (userData: any): Promise<void> => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Web - usar localStorage
      localStorage.setItem('user_data', JSON.stringify(userData));
    } else {
      // React Native - usar AsyncStorage
      // TODO: Implementar AsyncStorage cuando sea necesario
      // const AsyncStorage = await import('@react-native-async-storage/async-storage');
      // await AsyncStorage.setItem('user_data', JSON.stringify(userData));
    }
  } catch (error) {
    console.error('Error al guardar datos del usuario:', error);
    throw error;
  }
};

// Función para limpiar todos los datos de autenticación
export const clearAuthData = async (): Promise<void> => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Web - usar localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
    } else {
      // React Native - usar AsyncStorage
      // TODO: Implementar AsyncStorage cuando sea necesario
      // const AsyncStorage = await import('@react-native-async-storage/async-storage');
      // await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user_data']);
    }
  } catch (error) {
    console.error('Error al limpiar datos de autenticación:', error);
    throw error;
  }
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await getAccessToken();
    return token !== null && token !== '';
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    return false;
  }
};
