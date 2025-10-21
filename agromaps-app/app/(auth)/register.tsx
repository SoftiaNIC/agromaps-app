import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRegister } from "../../hooks/useRegister";

const backgroundImage = require("../../assets/images/background1.png");
const logo = require("../../assets/images/logo.png");

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  // Hook para manejar el registro
  const { register, isLoading, error, clearError } = useRegister();

  // Función para manejar el registro
  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim() || !confirm.trim() || !firstName.trim() || !lastName.trim()) {
      return;
    }
    
    await register({
      username: username.trim(),
      email: email.trim(),
      password: password,
      password_confirm: confirm,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
    });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/(auth)/login")}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Crear Cuenta</Text>

        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <Text style={styles.welcome}>Bienvenidos</Text>
        <Text style={styles.subtitle}>
          Crea una nueva cuenta en nuestra App para mejorar tus suelos,
          siembras y muchos más...
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#777" />
          <TextInput
            style={styles.input}
            placeholder="Nombre de Usuario"
            placeholderTextColor="#777"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (error) clearError();
            }}
            autoCapitalize="none"
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#777" />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            placeholderTextColor="#777"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) clearError();
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#777" />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#777"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              if (error) clearError();
            }}
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#777" />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor="#777"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              if (error) clearError();
            }}
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#777" />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#777"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (error) clearError();
            }}
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#777" />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#777"
            secureTextEntry
            value={confirm}
            onChangeText={(text) => {
              setConfirm(text);
              if (error) clearError();
            }}
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Crear Cuenta</Text>
          )}
        </TouchableOpacity>

        {/* Mostrar error si existe */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <Text style={styles.footerText}>
          ¿Ya tienes una Cuenta?{" "}
          <Text
            style={styles.linkText}
            onPress={() => router.push("/(auth)/login")}
          >
            Iniciar Sesión
          </Text>
        </Text>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>O Crea una cuenta con</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialContainer}>
          <FontAwesome name="facebook" size={28} color="#1877F2" />
          <FontAwesome name="google" size={28} color="#DB4437" />
          <FontAwesome name="apple" size={28} color="#000" />
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 80,
    paddingBottom: 40,
    minHeight: '100%',
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 25,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  logo: {
    width: 90,
    height: 90,
    marginVertical: 15,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    color: "#eee",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "100%",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#000",
  },
  button: {
    backgroundColor: "#003F2D",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#666",
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    borderWidth: 1,
    borderColor: "#ff4444",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    width: "100%",
  },
  errorText: {
    color: "#ff4444",
    textAlign: "center",
    fontSize: 14,
  },
  footerText: {
    color: "#fff",
    marginTop: 15,
  },
  linkText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "100%",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#fff",
    fontSize: 12,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginTop: 15,
  },
});
