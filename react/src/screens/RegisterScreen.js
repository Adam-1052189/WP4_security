import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    // registratielogica hier
    // console.log(`Geregistreerd met gebruikersnaam: ${username}, en wachtwoord: ${password}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Studentnummer of personeelscode"
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