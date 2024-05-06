import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import DocentDashboard from "./src/screens/DocentDashboard"
import WelcomeScreen from './src/screens/WelcomeScreen'
import Login from "./src/screens/Login"
import RegisterScreen from "./src/screens/RegisterScreen"
import StudentDashboard from "./src/screens/StudentDashboard"
import Toast from 'react-native-toast-message';
import DocentRegister from "./src/screens/AdminDashboard";
import * as Font from 'expo-font';
import AdminDashboard from "./src/screens/AdminDashboard";

const Stack = createStackNavigator();

const App = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    const [gebruiker, setGebruiker] = useState(null);
    const [gebruikerId, setGebruikerId] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const loggedInGebruikerId = await Login();
                setGebruikerId(loggedInGebruikerId);

                const response = await fetch(`http://localhost:8000/glitch/gebruikers/${loggedInGebruikerId}/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setGebruiker(data);
            } catch (error) {
                console.error('Er is een fout opgetreden: ' + error);
            }
            }


        fetchUser();
    }, []);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'Poppins-extra-bold': require('./src/assets/fonts/Poppins-ExtraBold.ttf'),
            });
            setFontLoaded(true);
        }
        loadFonts();
    }, []);
    if (!fontLoaded) {
        return null;
    }


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
                        title: gebruiker ? `${gebruiker.voornaam}, ${gebruiker.achternaam}` : 'Docenten Dashboard',
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
                <Stack.Screen name={"AdminDashboard"} component={AdminDashboard}/>
                {/* Andere schermen na login */}
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
};

export default App;