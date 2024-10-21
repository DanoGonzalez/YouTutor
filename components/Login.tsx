import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { loginUsuario } from '@/controllers/usuariosController'; // Importamos la función de login
import { useNavigation } from '@react-navigation/native';

interface LoginProps {
  onLogin: () => void; // Función que se ejecuta cuando el login es exitoso
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      setError(null); // Limpiar errores anteriores
      const usuario = await loginUsuario(correo, password); // Llamada a la función de login
      console.log('Usuario logueado:', usuario);
      onLogin();
    } catch (err: any) {
      setError(err.message); // Mostrar mensaje de error
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/icons/book.png")} style={styles.icon} />
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.subtitle}>Inicia sesión ahora</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Registrar Cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Olvide mi contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#000000",
    fontFamily: "Roboto_700Bold",
    marginBottom: 10, // Closer to subtitle
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 30, // Separate subtitle from inputs
  },
  input: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '80%',
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  inputPassword: {
    flex: 1,
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  iconPassword: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#0078FF",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#0078FF",
    fontSize: 16,
    marginTop: 10,
  },
});

export default Login;
