import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.title}>Chatbot IA</Text>
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
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', margin: 20 },
  chat: { flex: 1, padding: 10 },
  message: { padding: 10, marginBottom: 10, borderRadius: 5 },
  userMessage: { backgroundColor: '#007bff', alignSelf: 'flex-end' },
  botMessage: { backgroundColor: '#e9ecef', alignSelf: 'flex-start' },
  messageText: { color: '#fff' },
  inputContainer: { flexDirection: 'row', padding: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  button: { backgroundColor: '#007bff', padding: 10, marginLeft: 10, borderRadius: 5 },
  buttonText: { color: '#fff' },
});
