import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import DashboardLayout from '../../components/DashboardLayout';

export default function MapTabScreen() {
  return (
    <DashboardLayout activeTab="maps">
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>🗺️ Mapas Agrícolas</Text>
          <Text style={styles.subtitle}>
            Visualiza mapas interactivos de cultivos y terrenos. Integra con datos en tiempo real.
          </Text>
          
          <View style={styles.mapCards}>
            <View style={styles.mapCard}>
              <Text style={styles.mapCardTitle}>Mapa de Fertilidad</Text>
              <Text style={styles.mapCardDesc}>Análisis de nutrientes del suelo</Text>
            </View>
            
            <View style={styles.mapCard}>
              <Text style={styles.mapCardTitle}>Mapa de Cultivos</Text>
              <Text style={styles.mapCardDesc}>Distribución de cultivos actuales</Text>
            </View>
            
            <View style={styles.mapCard}>
              <Text style={styles.mapCardTitle}>Mapa de Clima</Text>
              <Text style={styles.mapCardDesc}>Condiciones meteorológicas</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.button} onPress={() => router.push('/(dashboard)/data')}>
            <Text style={styles.buttonText}>Ver Datos Avanzados</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </DashboardLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    lineHeight: 22,
  },
  mapCards: {
    gap: 16,
    marginBottom: 30,
  },
  mapCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  mapCardDesc: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
