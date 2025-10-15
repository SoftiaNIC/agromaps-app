import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DataScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos de Suelos</Text>
      <Text style={styles.subtitle}>Visualiza y analiza datos técnicos de los suelos, como nutrientes, pH y humedad.</Text>
      {/* Aquí integrarías gráficos o tablas con datos reales */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', paddingHorizontal: 20 },
});
