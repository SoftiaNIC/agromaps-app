import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OverviewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overview del Dashboard</Text>
      <Text style={styles.subtitle}>Bienvenido al panel principal. Aquí verás resúmenes generales de tus cultivos y mapas.</Text>
      {/* Aquí puedes agregar componentes como gráficos o listas de resumen */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', paddingHorizontal: 20 },
});
