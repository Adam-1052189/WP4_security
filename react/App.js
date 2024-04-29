import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import DocentDashboard from "./components/DocentDashboard"
import WelcomeScreen from './components/WelcomeScreen'
import Login from "./src/screens/Login"
import RegisterScreen from "./src/screens/RegisterScreen"
import StudentDashboard from "./components/StudentDashboard"



const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welkom">
                <Stack.Screen
                    name="Welkom"
                    component={WelcomeScreen}
                    options={{
                        title: 'Welkom',
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: 'Login',
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="DocentDashboard"
                    component={DocentDashboard}
                    options={{
                        title: 'Docenten Dashboard',
                        headerStyle: {
                            borderBottomColor: '#fff7ea',
                            backgroundColor: '#fff7ea',
                        },
                        headerTintColor: '#001e48',
                        headerTitleStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-extra-bold',
                        },
                    }}
                />
                <Stack.Screen name="Registreren" component={RegisterScreen}/>
                <Stack.Screen name="StudentDashboard" component={StudentDashboard}/>
                {/* Andere schermen na login */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;