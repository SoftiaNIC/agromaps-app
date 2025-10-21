import React from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useSoilStudies } from '../hooks/useSoilStudies';

export default function SoilMap() {
  const { studies, isLoading, error } = useSoilStudies();

  if (isLoading) return <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando mapa...</Text>;
  if (error) return <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>Error: {error}</Text>;

  // Centro inicial: Ejemplo en Nicaragua
  const center = { latitude: 12.1364, longitude: -86.2514 };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {studies.map((study) => (
          study.location_lat && study.location_lng ? (
            <Marker
              key={study.id}
              coordinate={{
                latitude: study.location_lat,
                longitude: study.location_lng,
              }}
            >
              <Callout>
                <View>
                  <Text><strong>{study.name}</strong></Text>
                  <Text>Ubicación: {study.location_name || 'N/A'}</Text>
                  <Text>Fecha: {study.date_of_study}</Text>
                  <Text>Muestras: {study.sample_number}</Text>
                </View>
              </Callout>
            </Marker>
          ) : null
        ))}
      </MapView>
    </View>
  );
}
