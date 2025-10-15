import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';

const Navbar = () => {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <Text style={styles.navbarTitle}>Dashboard AgroMaps</Text>
      <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
        <Text style={styles.navbarLogout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function DashboardLayout() {
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.content}>
        <Stack>
          <Stack.Screen name="overview" options={{ title: 'Overview' }} />
          <Stack.Screen name="data" options={{ title: 'Datos de Suelos' }} />
          <Stack.Screen name="chatbot" options={{ title: 'Chatbot IA' }} />
        </Stack>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007bff',
  },
  backIcon: { fontSize: 24, color: '#fff' },
  navbarTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  navbarLogout: { color: '#fff', fontSize: 16 },
  content: { flex: 1, padding: 20 },
});
