/**
 * Script simple para probar el login
 * Ejecutar con: node scripts/testLogin.js
 */

const axios = require('axios');

// Configuración
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://api.agromapsnic.com/api';
const LOGIN_ENDPOINT = '/auth/login';

// Datos de test
const loginData = {
  username_or_email: 'thisismyusername',
  password: 'securepassword123'
};

async function testLogin() {
  console.log('🧪 Iniciando test de login...');
  console.log('🌐 URL:', API_BASE_URL + LOGIN_ENDPOINT);
  console.log('📤 Datos:', {
    username_or_email: loginData.username_or_email,
    password: '***'
  });

  try {
    const response = await axios.post(API_BASE_URL + LOGIN_ENDPOINT, loginData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 segundos timeout
    });

    console.log('✅ Login exitoso!');
    console.log('📊 Status:', response.status);
    console.log('📊 Respuesta:', {
      hasAccessToken: !!response.data.access,
      hasRefreshToken: !!response.data.refresh,
      user: response.data.user ? {
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
        name: `${response.data.user.first_name} ${response.data.user.last_name}`
      } : null
    });

    return { success: true, data: response.data };

  } catch (error) {
    console.log('❌ Error en login:');
    
    if (error.response) {
      console.log('📊 Status:', error.response.status);
      console.log('📊 Error:', error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.log('🌐 Error: No se puede conectar al servidor');
      console.log('💡 Verifica que el servidor esté ejecutándose en:', API_BASE_URL);
    } else if (error.code === 'ENOTFOUND') {
      console.log('🌐 Error: No se encontró el servidor');
      console.log('💡 Verifica la URL del servidor');
    } else if (error.message === 'timeout of 10000ms exceeded') {
      console.log('⏱️ Error: Timeout - El servidor tardó demasiado en responder');
    } else {
      console.log('💥 Error inesperado:', error.message);
    }

    return { success: false, error: error.message };
  }
}

// Ejecutar el test
testLogin().then(result => {
  console.log('\n🎯 Resultado:', result.success ? '✅ ÉXITO' : '❌ FALLO');
  process.exit(result.success ? 0 : 1);
}).catch(error => {
  console.log('💥 Error fatal:', error.message);
  process.exit(1);
});
