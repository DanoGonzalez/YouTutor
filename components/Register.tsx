// components/Register.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { auth } from '../utils/firebase'; // Ajusta la ruta según tu estructura
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registro exitoso');
    } catch (error:any) {
      setError(error.message);
      console.error('Error al registrarse:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registro</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Registrarse" onPress={handleRegister} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
  },
});

export default Register;
