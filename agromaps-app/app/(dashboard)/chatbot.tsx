import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import DashboardLayout from '../../components/DashboardLayout';

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hola, soy tu asistente IA para datos de suelos. ¿En qué puedo ayudarte?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { id: messages.length + 1, text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
      // Simulación de respuesta de IA
      setTimeout(() => {
        const botResponse = { id: messages.length + 2, text: 'Procesando datos de suelo... (Respuesta simulada)', sender: 'bot' };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <DashboardLayout activeTab="chatbot">
      <View style={styles.container}>
        <Text style={styles.title}>🤖 Chatbot IA</Text>
        <ScrollView style={styles.chat}>
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.message, msg.sender === 'user' ? styles.userMessage : styles.botMessage]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Escribe tu consulta sobre datos de suelos..."
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={sendMessage}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DashboardLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    color: '#333',
  },
  chat: {
    flex: 1,
    padding: 16,
  },
  message: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  messageText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 20,
    maxHeight: 100,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginLeft: 12,
    borderRadius: 20,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
