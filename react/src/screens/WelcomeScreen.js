import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welkom bij G.L.I.T.C.H!</Text>
      <Button
        title="Inloggen/Registreren"
        color="#d30f4c"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff7ea',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default WelcomeScreen;