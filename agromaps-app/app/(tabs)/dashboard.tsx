import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { useSoilStudies, CreateSoilStudyRequest } from '../../hooks/useSoilStudies';

export default function DashboardTabScreen() {
  const { studies, isLoading, error, createStudy, fetchStudies, clearError } = useSoilStudies();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [newStudy, setNewStudy] = useState<CreateSoilStudyRequest>({
    name: '',
    date_of_study: '',
    location_name: '',
    latitude: 0,
    longitude: 0,
    notes: '',
    region: '',
    laboratory_name: null,
    analysis_date: null,
    sample_number: 1,
  });
  const [rawCoordinates, setRawCoordinates] = useState<{ latitude: string; longitude: string }>({
    latitude: '',
    longitude: '',
  });
  const [validationErrors, setValidationErrors] = useState<{ latitude?: boolean; longitude?: boolean }>({});
  const debounceRef = useRef<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });

  const validateCoordinate = (key: 'latitude' | 'longitude', text: string) => {
    // Limpiar debounce anterior
    if (debounceRef.current[key]) {
      clearTimeout(debounceRef.current[key]!);
    }

    // Si el texto está vacío, limpiar error
    if (text.trim() === '') {
      setValidationErrors(prev => ({ ...prev, [key]: false }));
      return;
    }

    // Setear debounce para validar después de 1 segundo
    debounceRef.current[key] = setTimeout(() => {
      const num = parseFloat(text);
      if (isNaN(num) || num === 0) {
        setValidationErrors(prev => ({ ...prev, [key]: true }));
      } else {
        setValidationErrors(prev => ({ ...prev, [key]: false }));
      }
    }, 1000);
  };

  const handleCreateStudy = async () => {
    if (!newStudy.name || !newStudy.date_of_study || !newStudy.location_name || !newStudy.region) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    // Parsear valores al enviar
    const latitudeNum = parseFloat(rawCoordinates.latitude);
    const longitudeNum = parseFloat(rawCoordinates.longitude);
    if (isNaN(latitudeNum) || latitudeNum === 0 || isNaN(longitudeNum) || longitudeNum === 0) {
      Alert.alert('Error', 'Por favor ingresa coordenadas válidas para latitud y longitud.');
      return;
    }

    const success = await createStudy({ ...newStudy, latitude: latitudeNum, longitude: longitudeNum });
    if (success) {
      setIsCreateModalVisible(false);
      setNewStudy({
        name: '',
        date_of_study: '',
        location_name: '',
        latitude: 0,
        longitude: 0,
        notes: '',
        region: '',
        laboratory_name: null,
        analysis_date: null,
        sample_number: 1,
      });
      setRawCoordinates({ latitude: '', longitude: '' });
      setValidationErrors({});
      Alert.alert('Éxito', 'Estudio de suelo creado exitosamente.');
    } else {
      Alert.alert('Error', error || 'Error al crear el estudio.');
      if (error && (error.includes('token') || error.includes('auth'))) {
        router.replace('/(auth)/login');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>📊 Dashboard de Estudios de Suelo</Text>
          <Text style={styles.subtitle}>
            Gestiona y consulta tus estudios de suelo. Crea nuevos estudios para análisis detallados.
          </Text>

          {/* Sección de Crear Estudio */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => setIsCreateModalVisible(true)}
          >
            <Text style={styles.createButtonText}>➕ Crear Nuevo Estudio</Text>
          </TouchableOpacity>

          {/* Lista de Estudios */}
          <View style={styles.studiesSection}>
            <Text style={styles.sectionTitle}>📋 Estudios de Suelo</Text>
            {isLoading && <Text style={styles.loadingText}>Cargando estudios...</Text>}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => {
                  clearError();
                  if (error.includes('token') || error.includes('auth')) {
                    router.replace('/(auth)/login');
                  }
                }}>
                  <Text style={styles.clearErrorText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            )}
            {!studies || studies.length === 0 && !isLoading && (
              <Text style={styles.emptyText}>No hay estudios de suelo disponibles.</Text>
            )}
            {studies && studies.length > 0 && studies.map((study) => (
              <TouchableOpacity key={study.id} style={styles.studyCard}>
                <Text style={styles.studyTitle}>{study.name}</Text>
                <Text style={styles.studyDetail}>📍 {study.location_name}</Text>
                <Text style={styles.studyDetail}>📅 {study.date_of_study}</Text>
                <Text style={styles.studyDetail}>🔢 Muestras: {study.sample_number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modal para Crear Estudio */}
      <Modal
        visible={isCreateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCreateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Crear Nuevo Estudio</Text>
            <ScrollView style={styles.modalScroll}>
              <TextInput
                style={styles.input}
                placeholder="Nombre del estudio *"
                value={newStudy.name}
                onChangeText={(text) => setNewStudy({ ...newStudy, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Fecha del estudio (YYYY-MM-DD) *"
                value={newStudy.date_of_study}
                onChangeText={(text) => setNewStudy({ ...newStudy, date_of_study: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Nombre de la ubicación *"
                value={newStudy.location_name}
                onChangeText={(text) => setNewStudy({ ...newStudy, location_name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Región *"
                value={newStudy.region}
                onChangeText={(text) => setNewStudy({ ...newStudy, region: text })}
              />
              <TextInput
                style={[
                  styles.input,
                  validationErrors.latitude && styles.inputError,
                ]}
                placeholder="Latitud (ej: 40.7128)"
                value={rawCoordinates.latitude}
                onChangeText={(text) => {
                  setRawCoordinates(prev => ({ ...prev, latitude: text }));
                  validateCoordinate('latitude', text);
                }}
                keyboardType="decimal-pad"
              />
              <TextInput
                style={[
                  styles.input,
                  validationErrors.longitude && styles.inputError,
                ]}
                placeholder="Longitud (ej: -74.0060)"
                value={rawCoordinates.longitude}
                onChangeText={(text) => {
                  setRawCoordinates(prev => ({ ...prev, longitude: text }));
                  validateCoordinate('longitude', text);
                }}
                keyboardType="decimal-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Número de muestras"
                value={newStudy.sample_number.toString()}
                onChangeText={(text) => setNewStudy({ ...newStudy, sample_number: parseInt(text) || 1 })}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Notas (opcional)"
                value={newStudy.notes}
                onChangeText={(text) => setNewStudy({ ...newStudy, notes: text })}
                multiline
              />
            </ScrollView>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsCreateModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleCreateStudy}>
                <Text style={styles.submitButtonText}>Crear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContainer: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#007bff', textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#666' },
  createButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, marginBottom: 20, alignItems: 'center' },
  createButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  studiesSection: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  loadingText: { textAlign: 'center', color: '#666' },
  errorContainer: { backgroundColor: '#f8d7da', padding: 10, borderRadius: 5, marginBottom: 10 },
  errorText: { color: '#721c24' },
  clearErrorText: { color: '#007bff', textAlign: 'right' },
  emptyText: { textAlign: 'center', color: '#999', fontStyle: 'italic' },
  studyCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  studyTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  studyDetail: { fontSize: 14, color: '#666', marginTop: 4 },
  fullButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 10, alignItems: 'center' },
  fullButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', borderRadius: 10, padding: 20, width: '90%', maxHeight: '80%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  modalScroll: { maxHeight: 300 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10, fontSize: 16 },
  inputError: { borderColor: '#dc3545' }, // Borde rojo para errores
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelButton: { backgroundColor: '#6c757d', padding: 10, borderRadius: 5, flex: 1, marginRight: 10, alignItems: 'center' },
  cancelButtonText: { color: '#fff', fontSize: 16 },
  submitButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 16 },
});
