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
                    options={({route}) => ({
                        title: route.params ? `${route.params.achternaam}, ${route.params.voornaam}` : 'Docenten Dashboard',
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
                    })}
                />
                <Stack.Screen name="Registreren" component={RegisterScreen}/>
                <Stack.Screen
                    name="StudentDashboard"
                    component={StudentDashboard}
                    options={({route}) => ({
                        title: route.params ? `${route.params.achternaam}, ${route.params.voornaam}` : 'Admin Dashboard',
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
                    })}
                />
                <Stack.Screen
                    name={"AdminDashboard"}
                    component={AdminDashboard}
                    options={({route}) => ({
                        title: route.params ? `${route.params.achternaam}, ${route.params.voornaam}` : 'Admin Dashboard',
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
                    })}
                />
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
};

export default App;