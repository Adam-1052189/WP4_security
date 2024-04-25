import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:8000/api-auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Inloggen</Text>
      <TextInput
        style={styles.input}
        placeholder="Gebruikersnaam"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Wachtwoord"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={handleSubmit} />
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => Linking.openURL('tel:+310107941111')}>
          <Text style={styles.footerText}>010 - 794 1111</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:service@hr.nl')}>
          <Text style={styles.footerText}>service@hr.nl</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#fff7ea',
  },
  loginText: {
    color: '#001e48',
    fontSize: 24,
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loginButton: {
    height: 50,
    backgroundColor: '#d30f4c',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins',
  },
  footer: {
    backgroundColor: '#d30f4c',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default Login;