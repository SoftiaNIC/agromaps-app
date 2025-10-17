import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import UserHeader from '../../components/UserHeader';

export default function HomeScreen() {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Si está cargando, mostrar loading
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  // Debug: mostrar datos del usuario
  console.log('Debug - isAuthenticated:', isAuthenticated);
  console.log('Debug - user:', user);

  // Si está autenticado, mostrar contenido personalizado
  if (isAuthenticated && user) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.headerText}>👤 {user.first_name} {user.last_name}</Text>
            <Text style={styles.headerEmail}>{user.email}</Text>
          </View>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => {
              // Simple logout sin confirmación por ahora
              console.log('Logout clicked');
            }}
          >
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeTitle}>
            ¡Bienvenido, {user.first_name}! 👋
          </Text>
          <Text style={styles.subtitle}>
            Gestiona mapas agrícolas, analiza datos de suelos y chatea con IA para optimizar tus cultivos.
          </Text>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileTitle}>📋 Información del Perfil</Text>
            <View style={styles.profileItem}>
              <Text style={styles.profileLabel}>Usuario:</Text>
              <Text style={styles.profileValue}>{user.username}</Text>
            </View>
            <View style={styles.profileItem}>
              <Text style={styles.profileLabel}>Email:</Text>
              <Text style={styles.profileValue}>{user.email}</Text>
            </View>
            <View style={styles.profileItem}>
              <Text style={styles.profileLabel}>Rol:</Text>
              <Text style={styles.profileValue}>{user.role}</Text>
            </View>
            <View style={styles.profileItem}>
              <Text style={styles.profileLabel}>Estado:</Text>
              <Text style={[styles.profileValue, { color: user.is_active ? '#28a745' : '#dc3545' }]}>
                {user.is_active ? 'Activo' : 'Inactivo'}
              </Text>
            </View>
            {user.phone_number && (
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Teléfono:</Text>
                <Text style={styles.profileValue}>{user.phone_number}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.featuresContainer}>
            <TouchableOpacity 
              style={styles.featureButton} 
              onPress={() => router.push('/(dashboard)/overview')}
            >
              <Text style={styles.featureButtonText}>📊 Dashboard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureButton} 
              onPress={() => router.push('/(tabs)/map')}
            >
              <Text style={styles.featureButtonText}>🗺️ Mapas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureButton} 
              onPress={() => router.push('/(dashboard)/chatbot')}
            >
              <Text style={styles.featureButtonText}>🤖 Chatbot IA</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.featureButton} 
              onPress={() => router.push('/(tabs)/soilstudies')}
            >
              <Text style={styles.featureButtonText}>🌱 Estudios de Suelo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  // Si no está autenticado, mostrar pantalla de login
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a AgroMaps</Text>
      <Text style={styles.subtitle}>
        Gestiona mapas agrícolas, analiza datos de suelos y chatea con IA para optimizar tus cultivos.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.secondaryButtonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tertiaryButton} onPress={() => router.push('/(dashboard)/overview')}>
        <Text style={styles.tertiaryButtonText}>Ir al Dashboard (Prueba)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  userInfo: {
    flex: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  headerEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  profileInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
  },
  profileLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  profileValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
    textAlign: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 22,
  },
  featuresContainer: {
    width: '100%',
    maxWidth: 300,
  },
  featureButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  featureButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tertiaryButton: {
    backgroundColor: '#ffc107',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  tertiaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
