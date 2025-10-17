import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import DashboardLayout from '../../components/DashboardLayout';

export default function SoilstudiesTabScreen() {
  return (
    <DashboardLayout activeTab="library">
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>📚 Biblioteca de Cultivos</Text>
          <Text style={styles.subtitle}>
            Explora datos de cultivos, fertilidad del suelo y recomendaciones para optimizar tus cosechas.
          </Text>
          
          <View style={styles.libraryCards}>
            <View style={styles.libraryCard}>
              <Text style={styles.libraryCardTitle}>🌱 Tipos de Cultivos</Text>
              <Text style={styles.libraryCardDesc}>Catálogo completo de plantas y sus características</Text>
            </View>
            
            <View style={styles.libraryCard}>
              <Text style={styles.libraryCardTitle}>🌿 Fertilidad del Suelo</Text>
              <Text style={styles.libraryCardDesc}>Guías de análisis y mejora de nutrientes</Text>
            </View>
            
            <View style={styles.libraryCard}>
              <Text style={styles.libraryCardTitle}>📊 Recomendaciones</Text>
              <Text style={styles.libraryCardDesc}>Consejos personalizados para tus cultivos</Text>
            </View>
            
            <View style={styles.libraryCard}>
              <Text style={styles.libraryCardTitle}>🔬 Estudios de Suelos</Text>
              <Text style={styles.libraryCardDesc}>Analiza nutrientes, pH y humedad</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.button} onPress={() => router.push('/(dashboard)/data')}>
            <Text style={styles.buttonText}>Ver Análisis Detallado</Text>
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
    color: '#ffc107',
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
  libraryCards: {
    gap: 16,
    marginBottom: 30,
  },
  libraryCard: {
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
  libraryCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  libraryCardDesc: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#ffc107',
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
