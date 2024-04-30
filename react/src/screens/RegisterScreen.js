import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native'
import Toast from "react-native-toast-message";

function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
        const response = await fetch('http://localhost:8000/api-auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });

        const data = await response.json();

        if (response.ok) {
            Toast.show({
                type: 'success',
                text1: 'Succes',
                text2: 'Je bent succesvol geregistreerd',
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Fout',
                text2: 'Registratie mislukt',
            });
        }
    } catch (error) {
        console.error('Er is een fout opgetreden:', error);
        Toast.show({
            type: 'error',
            text1: 'Fout',
            text2: 'Er is een fout opgetreden tijdens het registreren',
        });
    }
};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Studentnummer of personeelscode"
        onChangeText={setEmail}
        value={email}
        onSubmitEditing={handleSubmit}
      />
      <TextInput
        style={styles.input}
        placeholder="Wachtwoord"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        onSubmitEditing={handleSubmit}
      />
      <Button
          title="Registreer" onPress={handleSubmit}
          color="#d30f4c"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff7ea',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default RegisterScreen;