import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
      try {
          const response = await fetch('http://localhost:8000/api-auth/register/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email,
                  password,
                  user_type: 'DOCENT',
                  is_staff: true
              })
          });

          const data = await response.json();

          if (response.ok) {
              console.log(`Docent aangemaakt met email: ${email}, en wachtwoord: ${password}`);
          } else {
              console.log('Aanmaken docent mislukt:', data);
          }
      } catch (error) {
          console.error('Er is een fout opgetreden:', error);
      }
  };

  return (
    <View style={styles.container}>
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
      <Button
          title="Maak Docent" onPress={handleSubmit}
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

export default AdminDashboard;