import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          Alert.alert('Logged in successfully');
          if (data.user_type === 'DOCENT') {
            navigation.navigate('DocentDashboard');
          } else if (data.user_type === 'STUDENT') {
            navigation.navigate('StudentDashboard');
          }
        } else {
          Alert.alert('Error', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
        <Text style={styles.loginText}>Inloggen</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
        />
        <TextInput
            style={styles.input}
            placeholder="Wachtwoord"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
        />
        <Button title="Login" onPress={handleLogin}/>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Registreren')}>
            <Text style={styles.loginButtonText}>Registreren</Text>
        </TouchableOpacity>
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
};

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