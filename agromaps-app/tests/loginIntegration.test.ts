/**
 * Test de integración para el login
 * Este test puede ejecutarse directamente para probar el endpoint real
 */

import AuthService from '../services/authService';

/**
 * Test manual de login - ejecuta este test para probar con el servidor real
 */
export const testLoginIntegration = async () => {
  console.log('🧪 Iniciando test de integración de login...');
  
  try {
    // Datos de test
    const loginData = {
      username_or_email: 'thisismyusername',
      password: 'securepassword123',
    };

    console.log('📤 Enviando petición de login:', {
      username_or_email: loginData.username_or_email,
      password: '***', // No mostrar la contraseña en logs
    });

    // Ejecutar login
    const response = await AuthService.login(loginData);
    
    console.log('✅ Login exitoso!');
    console.log('📊 Respuesta del servidor:', {
      status: response.status,
      statusText: response.statusText,
      user: response.data.user,
      hasAccessToken: !!response.data.access,
      hasRefreshToken: !!response.data.refresh,
    });

    // Verificar estructura de respuesta
    if (response.data.access && response.data.refresh && response.data.user) {
      console.log('✅ Estructura de respuesta correcta');
      console.log('👤 Usuario:', {
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
        name: `${response.data.user.first_name} ${response.data.user.last_name}`,
        isActive: response.data.user.is_active,
      });
    } else {
      console.log('❌ Estructura de respuesta incorrecta');
    }

    return {
      success: true,
      data: response.data,
      status: response.status,
    };

  } catch (error: any) {
    console.log('❌ Error en el test de login:');
    
    if (error.response) {
      console.log('📊 Error del servidor:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      });
      
      return {
        success: false,
        error: error.response.data,
        status: error.response.status,
        type: 'server_error',
      };
    } else if (error.message === 'Network Error') {
      console.log('🌐 Error de red - Verifica tu conexión a internet');
      
      return {
        success: false,
        error: 'Network Error',
        type: 'network_error',
      };
    } else {
      console.log('💥 Error inesperado:', error.message);
      
      return {
        success: false,
        error: error.message,
        type: 'unexpected_error',
      };
    }
  }
};

/**
 * Test de credenciales inválidas
 */
export const testInvalidLogin = async () => {
  console.log('🧪 Iniciando test de login con credenciales inválidas...');
  
  try {
    const loginData = {
      username_or_email: 'wrongusername',
      password: 'wrongpassword',
    };

    console.log('📤 Enviando petición con credenciales inválidas...');

    await AuthService.login(loginData);
    
    console.log('❌ ERROR: El login debería haber fallado!');
    return { success: false, error: 'Login should have failed' };

  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log('✅ Comportamiento correcto: Login rechazado por credenciales inválidas');
      console.log('📊 Respuesta:', error.response.data);
      
      return {
        success: true,
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      console.log('❌ Error inesperado:', error.message);
      return { success: false, error: error.message };
    }
  }
};

/**
 * Test de logout
 */
export const testLogout = async () => {
  console.log('🧪 Iniciando test de logout...');
  
  try {
    const response = await AuthService.logout();
    
    console.log('✅ Logout exitoso!');
    console.log('📊 Respuesta:', response.status);
    
    return { success: true, status: response.status };

  } catch (error: any) {
    console.log('❌ Error en logout:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Ejecutar todos los tests de integración
 */
export const runAllIntegrationTests = async () => {
  console.log('🚀 Ejecutando todos los tests de integración...\n');
  
  // Test 1: Login válido
  console.log('='.repeat(50));
  console.log('TEST 1: Login con credenciales válidas');
  console.log('='.repeat(50));
  const loginResult = await testLoginIntegration();
  
  // Test 2: Login inválido
  console.log('\n' + '='.repeat(50));
  console.log('TEST 2: Login con credenciales inválidas');
  console.log('='.repeat(50));
  const invalidLoginResult = await testInvalidLogin();
  
  // Test 3: Logout
  console.log('\n' + '='.repeat(50));
  console.log('TEST 3: Logout');
  console.log('='.repeat(50));
  const logoutResult = await testLogout();
  
  // Resumen
  console.log('\n' + '='.repeat(50));
  console.log('📋 RESUMEN DE TESTS');
  console.log('='.repeat(50));
  console.log('Login válido:', loginResult.success ? '✅ PASS' : '❌ FAIL');
  console.log('Login inválido:', invalidLoginResult.success ? '✅ PASS' : '❌ FAIL');
  console.log('Logout:', logoutResult.success ? '✅ PASS' : '❌ FAIL');
  
  const allPassed = loginResult.success && invalidLoginResult.success && logoutResult.success;
  console.log('\n🎯 Resultado general:', allPassed ? '✅ TODOS LOS TESTS PASARON' : '❌ ALGUNOS TESTS FALLARON');
  
  return {
    login: loginResult,
    invalidLogin: invalidLoginResult,
    logout: logoutResult,
    allPassed,
  };
};

// Si se ejecuta directamente este archivo
if (require.main === module) {
  runAllIntegrationTests().then((results) => {
    process.exit(results.allPassed ? 0 : 1);
  });
}
