import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
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
