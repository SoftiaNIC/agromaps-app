/**
 * Script simple para probar el registro
 * Ejecutar con: node scripts/testRegister.js
 */

const axios = require('axios');

// Configuración
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://api.agromapsnic.com/api';
const REGISTER_ENDPOINT = '/auth/register';

// Datos de test
const registerData = {
  username: 'testuser123',
  email: 'testuser123@example.com',
  password: 'securepassword123',
  password_confirm: 'securepassword123',
  first_name: 'John',
  last_name: 'Doe'
};

async function testRegister() {
  console.log('🧪 Iniciando test de registro...');
  console.log('🌐 URL:', API_BASE_URL + REGISTER_ENDPOINT);
  console.log('📤 Datos:', {
    username: registerData.username,
    email: registerData.email,
    password: '***',
    password_confirm: '***',
    first_name: registerData.first_name,
    last_name: registerData.last_name
  });

  try {
    const response = await axios.post(API_BASE_URL + REGISTER_ENDPOINT, registerData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 segundos timeout
    });

    console.log('✅ Registro exitoso!');
    console.log('📊 Status:', response.status);
    console.log('📊 Respuesta:', {
      hasAccessToken: !!response.data.access,
      hasRefreshToken: !!response.data.refresh,
      user: response.data.user ? {
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
        name: `${response.data.user.first_name} ${response.data.user.last_name}`,
        role: response.data.user.role,
        isVerified: response.data.user.is_verified,
        isActive: response.data.user.is_active,
        createdAt: response.data.user.created_at
      } : null
    });

    return { success: true, data: response.data };

  } catch (error) {
    console.log('❌ Error en registro:');
    
    if (error.response) {
      console.log('📊 Status:', error.response.status);
      console.log('📊 Error:', error.response.data);
      
      // Mostrar errores específicos si existen
      if (error.response.data.username) {
        console.log('👤 Error en username:', error.response.data.username);
      }
      if (error.response.data.email) {
        console.log('📧 Error en email:', error.response.data.email);
      }
      if (error.response.data.password) {
        console.log('🔒 Error en password:', error.response.data.password);
      }
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
testRegister().then(result => {
  console.log('\n🎯 Resultado:', result.success ? '✅ ÉXITO' : '❌ FALLO');
  process.exit(result.success ? 0 : 1);
}).catch(error => {
  console.log('💥 Error fatal:', error.message);
  process.exit(1);
});
