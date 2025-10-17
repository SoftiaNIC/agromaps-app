/**
 * Script para probar el registro con las credenciales que funcionaron
 * Ejecutar con: node scripts/testRegisterWorking.js
 */

const axios = require('axios');

// Configuración
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://api.agromapsnic.com/api';
const REGISTER_ENDPOINT = '/auth/register';

// Datos de test que funcionaron
const registerData = {
  username: 'thisismyusername',
  email: 'newuser@example.com',
  password: 'securepassword123',
  password_confirm: 'securepassword123',
  first_name: 'John',
  last_name: 'Doe'
};

async function testRegisterWorking() {
  console.log('🧪 Iniciando test de registro con credenciales que funcionaron...');
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
      timeout: 10000
    });

    console.log('✅ Registro exitoso!');
    console.log('📊 Status:', response.status);
    console.log('📊 Respuesta completa:', JSON.stringify(response.data, null, 2));

    // Verificar estructura esperada
    if (response.data.user && response.data.access && response.data.refresh) {
      console.log('✅ Estructura de respuesta correcta');
      console.log('🔑 Tokens recibidos:');
      console.log('  - Access Token:', response.data.access.substring(0, 50) + '...');
      console.log('  - Refresh Token:', response.data.refresh.substring(0, 50) + '...');
      
      console.log('👤 Usuario creado:');
      console.log('  - ID:', response.data.user.id);
      console.log('  - Username:', response.data.user.username);
      console.log('  - Email:', response.data.user.email);
      console.log('  - Nombre:', `${response.data.user.first_name} ${response.data.user.last_name}`);
      console.log('  - Rol:', response.data.user.role);
      console.log('  - Verificado:', response.data.user.is_verified);
      console.log('  - Activo:', response.data.user.is_active);
      console.log('  - Creado:', response.data.user.created_at);
    } else {
      console.log('❌ Estructura de respuesta incorrecta');
    }

    return { success: true, data: response.data };

  } catch (error) {
    console.log('❌ Error en registro:');
    
    if (error.response) {
      console.log('📊 Status:', error.response.status);
      console.log('📊 Error:', error.response.data);
      
      // Si el usuario ya existe, es esperado
      if (error.response.status === 400 && 
          (error.response.data.username || error.response.data.email)) {
        console.log('ℹ️  Usuario ya existe - esto es esperado si ya se registró antes');
        return { success: true, error: 'User already exists (expected)' };
      }
    } else {
      console.log('💥 Error inesperado:', error.message);
    }

    return { success: false, error: error.message };
  }
}

// Ejecutar el test
testRegisterWorking().then(result => {
  console.log('\n🎯 Resultado:', result.success ? '✅ ÉXITO' : '❌ FALLO');
  if (result.error) {
    console.log('ℹ️  Nota:', result.error);
  }
  process.exit(result.success ? 0 : 1);
}).catch(error => {
  console.log('💥 Error fatal:', error.message);
  process.exit(1);
});
