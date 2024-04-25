import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DocentDashboardMobile from "./src/screens/DocentDashboardMobile";
import Login from './components/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="">
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="DocentDashboard" component={DocentDashboardMobile}/>
              {/* Andere schermen na login */}
          </Stack.Navigator>
      </NavigationContainer>
);
}