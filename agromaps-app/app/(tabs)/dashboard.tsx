import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function DashboardTabScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>
        Accede al panel principal con análisis y herramientas avanzadas.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(dashboard)/overview')}>
        <Text style={styles.buttonText}>Ir al Dashboard Completo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#007bff' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#666' },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 10, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
