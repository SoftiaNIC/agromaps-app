/**
 * Script para probar el endpoint de perfil
 * Ejecutar con: node scripts/testProfile.js
 */

const axios = require('axios');

// Configuración
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://api.agromapsnic.com/api';
const PROFILE_ENDPOINT = '/auth/profile';

// Token de acceso (necesitas reemplazar esto con un token válido)
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYwNjg0MTczLCJpYXQiOjE3NjA2ODA1NzMsImp0aSI6Ijg0NWEyY2I2MTdmMjRiMzQ4N2EwMWExOTZmODgyODFlIiwidXNlcl9pZCI6MX0.RQibmNYu7qSa54-SC-OaKO3mtLrIcxN7RKcUB4YfsIw';

async function testProfile() {
  console.log('🧪 Iniciando test de perfil...');
  console.log('🌐 URL:', API_BASE_URL + PROFILE_ENDPOINT);
  console.log('🔑 Token:', ACCESS_TOKEN.substring(0, 50) + '...');

  try {
    const response = await axios.get(API_BASE_URL + PROFILE_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    console.log('✅ Perfil obtenido exitosamente!');
    console.log('📊 Status:', response.status);
    console.log('📊 Respuesta completa:', JSON.stringify(response.data, null, 2));

    // Verificar estructura del perfil
    if (response.data) {
      console.log('👤 Datos del perfil:');
      console.log('  - ID:', response.data.id);
      console.log('  - Username:', response.data.username);
      console.log('  - Email:', response.data.email);
      console.log('  - Nombre:', `${response.data.first_name} ${response.data.last_name}`);
      console.log('  - Teléfono:', response.data.phone_number || 'No especificado');
      console.log('  - Rol:', response.data.role);
      console.log('  - Verificado:', response.data.is_verified);
      console.log('  - Activo:', response.data.is_active);
      console.log('  - Creado:', response.data.created_at);
    }

    return { success: true, data: response.data };

  } catch (error) {
    console.log('❌ Error obteniendo perfil:');
    
    if (error.response) {
      console.log('📊 Status:', error.response.status);
      console.log('📊 Error:', error.response.data);
      
      if (error.response.status === 401) {
        console.log('🔐 Token inválido o expirado');
        console.log('💡 Necesitas un token válido para probar este endpoint');
      }
    } else {
      console.log('💥 Error inesperado:', error.message);
    }

    return { success: false, error: error.message };
  }
}

// Función para obtener un token válido primero
async function getValidToken() {
  console.log('🔑 Intentando obtener un token válido...');
  
  try {
    const loginResponse = await axios.post(API_BASE_URL + '/auth/login', {
      username_or_email: 'thisismyusername',
      password: 'securepassword123'
    });

    console.log('✅ Login exitoso, token obtenido');
    return loginResponse.data.access;
  } catch (error) {
    console.log('❌ Error obteniendo token:', error.response?.data || error.message);
    return null;
  }
}

// Función principal que obtiene token y luego perfil
async function testProfileWithLogin() {
  console.log('🚀 Iniciando test completo: Login → Perfil\n');
  
  // Paso 1: Obtener token
  const token = await getValidToken();
  if (!token) {
    console.log('❌ No se pudo obtener token válido');
    return { success: false, error: 'No valid token' };
  }

  // Paso 2: Usar token para obtener perfil
  console.log('\n' + '='.repeat(50));
  console.log('OBTENIENDO PERFIL CON TOKEN');
  console.log('='.repeat(50));
  
  try {
    const response = await axios.get(API_BASE_URL + PROFILE_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    console.log('✅ Perfil obtenido exitosamente!');
    console.log('📊 Status:', response.status);
    console.log('📊 Datos del usuario:');
    console.log(JSON.stringify(response.data, null, 2));

    return { success: true, data: response.data };

  } catch (error) {
    console.log('❌ Error obteniendo perfil:');
    console.log('📊 Status:', error.response?.status);
    console.log('📊 Error:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
}

// Ejecutar el test
testProfileWithLogin().then(result => {
  console.log('\n🎯 Resultado:', result.success ? '✅ ÉXITO' : '❌ FALLO');
  process.exit(result.success ? 0 : 1);
}).catch(error => {
  console.log('💥 Error fatal:', error.message);
  process.exit(1);
});
