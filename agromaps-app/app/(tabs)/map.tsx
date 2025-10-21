import React from 'react';
import { View, StyleSheet } from 'react-native';
import SoilMap from '../../components/Map';

export default function MapTabScreen() {
  return (
    <View style={styles.container}>
      <SoilMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
