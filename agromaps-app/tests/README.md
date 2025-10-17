# Tests de Autenticación - AgroMaps App

## Descripción

Este directorio contiene tests para el sistema de autenticación de la aplicación AgroMaps, incluyendo tests unitarios y de integración.

## Archivos de Test

### 1. `authService.test.ts`
Tests unitarios para el servicio de autenticación usando Jest y mocks.

### 2. `loginIntegration.test.ts`
Tests de integración que pueden ejecutarse contra el servidor real.

### 3. `scripts/testLogin.js`
Script simple en JavaScript para probar el login directamente.

## Cómo Ejecutar los Tests

### Test Simple de Login (Recomendado)

```bash
# Ejecutar test simple de login
npm run test:login
```

Este comando ejecutará un test básico contra el servidor real usando las credenciales:
- **Usuario**: `thisismyusername`
- **Contraseña**: `securepassword123`

### Test de Integración Completo

```bash
# Ejecutar todos los tests de integración
npm run test:integration
```

Este comando ejecutará:
1. Test de login con credenciales válidas
2. Test de login con credenciales inválidas
3. Test de logout

### Test Unitario (Requiere Jest)

```bash
# Instalar Jest si no está instalado
npm install --save-dev jest @types/jest

# Ejecutar tests unitarios
npx jest tests/authService.test.ts
```

## Configuración

### Variables de Entorno

Asegúrate de tener configurada la variable de entorno:

```bash
# En tu archivo .env
EXPO_PUBLIC_API_BASE_URL=http://api.agromapsnic.com/api
```

### Credenciales de Test

Los tests usan las siguientes credenciales por defecto:
- **username_or_email**: `thisismyusername`
- **password**: `securepassword123`

Para cambiar las credenciales, modifica el archivo `scripts/testLogin.js` o `tests/loginIntegration.test.ts`.

## Interpretación de Resultados

### ✅ Éxito
```
✅ Login exitoso!
📊 Status: 200
📊 Respuesta: {
  hasAccessToken: true,
  hasRefreshToken: true,
  user: { id: 1, username: 'thisismyusername', ... }
}
```

### ❌ Error de Credenciales
```
❌ Error en login:
📊 Status: 401
📊 Error: { detail: 'Invalid credentials' }
```

### ❌ Error de Red
```
❌ Error en login:
🌐 Error: No se puede conectar al servidor
💡 Verifica que el servidor esté ejecutándose en: http://api.agromapsnic.com/api
```

## Troubleshooting

### 1. Error de Conexión
- Verifica que el servidor esté ejecutándose
- Verifica la URL en `constants/apiConstants.ts`
- Verifica tu conexión a internet

### 2. Error de Credenciales
- Verifica que las credenciales sean correctas
- Verifica que el usuario esté activo en el sistema

### 3. Error de Timeout
- El servidor puede estar lento
- Verifica la carga del servidor

## Estructura de Respuesta Esperada

### Login Exitoso
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "username": "thisismyusername",
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User",
    "is_staff": false,
    "is_active": true
  }
}
```

### Error de Credenciales
```json
{
  "detail": "Invalid credentials"
}
```

## Próximos Pasos

1. **Ejecutar test básico**: `npm run test:login`
2. **Verificar conectividad**: Asegurar que el servidor responda
3. **Probar credenciales**: Verificar que las credenciales sean válidas
4. **Integrar en CI/CD**: Agregar tests automáticos al pipeline

## Notas

- Los tests de integración requieren que el servidor esté ejecutándose
- Los tests unitarios usan mocks y no requieren servidor
- El test simple es la forma más rápida de verificar conectividad
