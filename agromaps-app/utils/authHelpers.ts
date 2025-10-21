import { AuthService } from '../services';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Si usas Expo, instala con: npx expo install @react-native-async-storage/async-storage

// Ejemplo de función para login
export const loginUser = async (usernameOrEmail: string, password: string) => {
  try {
    const response = await AuthService.login({ username_or_email: usernameOrEmail, password });
    const { access, refresh, user } = response.data;

    // Guarda los tokens en AsyncStorage (React Native)
    await AsyncStorage.setItem('access_token', access);
    await AsyncStorage.setItem('refresh_token', refresh);

    // Puedes guardar más info del usuario si es necesario
    console.log('Login exitoso:', user);
    return response;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// Ejemplo de función para obtener perfil
export const getUserProfile = async () => {
  try {
    const response = await AuthService.getProfile();
    return response.data;
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    throw error;
  }
};

// Ejemplo de función para logout
export const logoutUser = async () => {
  try {
    await AuthService.logout();
    // Limpia los tokens
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
  } catch (error) {
    console.error('Error en logout:', error);
  }
};
