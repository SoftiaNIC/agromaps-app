import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function MapTabScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapas Agrícolas</Text>
      <Text style={styles.subtitle}>
        Visualiza mapas interactivos de cultivos y terrenos. Integra con datos en tiempo real.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(dashboard)/data')}>
        <Text style={styles.buttonText}>Ver Datos Avanzados</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#28a745' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#666' },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
