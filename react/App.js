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
import ProfileScreen from "./src/screens/ProfileScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, View} from 'react-native';



const Stack = createStackNavigator();

const App = () => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [initialRoute, setInitialRoute] = useState('Welkom');

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'Poppins-extra-bold': require('./src/assets/fonts/Poppins-ExtraBold.ttf'),
            });
            setFontLoaded(true);
        }
        loadFonts();
    }, []);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const accessToken = await AsyncStorage.getItem('access_token');
            const userType = await AsyncStorage.getItem('user_type');
            if (accessToken) {
                if (userType === 'DOCENT') {
                    setInitialRoute('DocentDashboard');
                } else if (userType === 'STUDENT') {
                    setInitialRoute('StudentDashboard');
                } else if (userType === 'ADMIN') {
                    setInitialRoute('AdminDashboard');
                }
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogout = async (navigation) => {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        await AsyncStorage.removeItem('user_type');
        await AsyncStorage.removeItem('user_id');
        Toast.show({
            type: 'success',
            text1: 'Uitgelogd',
            text2: 'Je bent succesvol uitgelogd',
        });
        navigation.navigate('Login');
    };

    if (!fontLoaded) {
        return null;
    }


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
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
                    options={({navigation, route}) => ({
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
                        headerRight: () => (
                            <View style={{flexDirection: 'row'}}>
                                <Button
                                    onPress={() => navigation.navigate('Profiel')}
                                    title="Profiel"
                                    color="#1a69da"
                                />
                                <Button
                                    onPress={() => handleLogout(navigation)}
                                    title="Uitloggen"
                                    color="#d30f4c"
                                />
                            </View>
                        ),
                    })}
                />
                <Stack.Screen name="Registreren" component={RegisterScreen}/>
                <Stack.Screen
                    name="StudentDashboard"
                    component={StudentDashboard}
                    options={({navigation, route}) => ({
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
                        headerRight: () => (
                            <View style={{flexDirection: 'row'}}>
                                <Button
                                    onPress={() => navigation.navigate('Profiel')}
                                    title="Profiel"
                                    color="#1a69da"
                                />
                                <Button
                                    onPress={() => handleLogout(navigation)}
                                    title="Uitloggen"
                                    color="#d30f4c"
                                />
                            </View>
                        ),
                    })}
                />
                <Stack.Screen
                    name="AdminDashboard"
                    component={AdminDashboard}
                    options={({navigation, route}) => ({
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
                        headerRight: () => (
                            <View style={{flexDirection: 'row'}}>
                                <Button
                                    onPress={() => navigation.navigate('Profiel')}
                                    title="Profiel"
                                    color="#1a69da"
                                />
                                <Button
                                    onPress={() => handleLogout(navigation)}
                                    title="Uitloggen"
                                    color="#d30f4c"
                                />
                            </View>
                        ),
                    })}
                />
                <Stack.Screen
                    name="Profiel"
                    component={ProfileScreen}
                    options={{
                        title: 'Profiel',
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
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
};

export default App;