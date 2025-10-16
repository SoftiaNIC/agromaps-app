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
} from "react-native";

// 🪴 Asegúrate de colocar tus imágenes en assets/
const backgroundImage = require("../../assets/images/background1.png");
const logo = require("../../assets/images/logo.png");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Inicio de Sesión</Text>

        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <Text style={styles.welcome}>Bienvenidos</Text>
        <Text style={styles.subtitle}>
          Inicia Sesión en nuestra App para mejorar tus suelos, siembras y mucho
          más...
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#777" />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#777" />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Contraseña"
            placeholderTextColor="#777"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/(dashboard)/overview")}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          ¿No tienes una Cuenta?{" "}
          <Text
            style={styles.linkText}
            onPress={() => router.push("/(auth)/register")}
          >
            Crear una Cuenta
          </Text>
        </Text>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>O Inicia Sesión con</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialContainer}>
          <FontAwesome name="facebook" size={28} color="#1877F2" />
          <FontAwesome name="google" size={28} color="#DB4437" />
          <FontAwesome name="apple" size={28} color="#000" />
        </View>
      </View>
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
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 80,
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
    borderWidth: 0,
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
