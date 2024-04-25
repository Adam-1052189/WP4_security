import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DocentDashboardMobile from "./src/screens/DocentDashboardMobile";

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        // Voer hier de inloglogica uit
        console.log(`Inloggen met gebruikersnaam: ${username} en wachtwoord: ${password}`);
    };

    return (
        <View>
            <Text>Inloggen</Text>
            <Text>Gebruikersnaam:</Text>
            <TextInput value={username} onChangeText={setUsername} />
            <Text>Wachtwoord:</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Inloggen" onPress={handleSubmit} />
        </View>
    );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DocentDashboard" component={DocentDashboardMobile} />
        {/* Andere schermen na login */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});