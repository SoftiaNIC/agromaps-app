import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function ChatbotTabScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🤖 Chatbot IA</Text>
        <Text style={styles.subtitle}>
          Interactúa con nuestro asistente de IA para consultas sobre suelo y cultivos.
        </Text>
        <Text style={styles.placeholder}>Chatbot en desarrollo...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#007bff' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#666' },
  placeholder: { fontSize: 18, color: '#999', fontStyle: 'italic' },
});
