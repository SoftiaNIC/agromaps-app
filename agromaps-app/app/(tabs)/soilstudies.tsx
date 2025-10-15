import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function SoilstudiesTabScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudios de Suelos</Text>
      <Text style={styles.subtitle}>
        Analiza nutrientes, pH y humedad para optimizar cultivos. Conecta con herramientas avanzadas.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(dashboard)/data')}>
        <Text style={styles.buttonText}>Ver Análisis Detallado</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#ffc107' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#666' },
  button: { backgroundColor: '#ffc107', padding: 15, borderRadius: 10, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
