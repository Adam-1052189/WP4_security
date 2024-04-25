import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DocentDashboard from "./components/DocentDashboard";
import WelcomeScreen from './components/WelcomeScreen';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welkom">
        <Stack.Screen name="Welkom" component={WelcomeScreen}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DocentDashboard" component={DocentDashboard} />
        {/* Andere schermen na login */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};