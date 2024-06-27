import React, {useState, useEffect} from 'react';
import Toast from "react-native-toast-message";
import {TextInput, View, StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fontLoaded, setFontLoaded] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
            });
            setFontLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null;
    }

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/glitch/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email + '@hr.nl',
                    password: password,
                }),
            });
            const data = await response.json();
            console.log('Login response data:', data);
            if (response.status === 200) {
                await AsyncStorage.setItem('access_token', data.access);
                await AsyncStorage.setItem('refresh_token', data.refresh);
                await AsyncStorage.setItem('user_type', data.user_type);
                await AsyncStorage.setItem('user_id', String(data.user_id));
                await AsyncStorage.setItem('profielfoto', data.profielfoto);

                Toast.show({
                    type: 'success',
                    text1: 'Succes',
                    text2: 'Je bent succesvol aangemeld',
                });

                const userResponse = await fetch(`http://localhost:8000/glitch/gebruikers/${data.user_id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${data.access}`
                    },
                });

                const userData = await userResponse.json();
                console.log('User data:', userData);

                if (userResponse.status === 200) {
                    const user = {
                        voornaam: userData.voornaam,
                        achternaam: userData.achternaam,
                        profielfoto: data.profielfoto,
                    };
                    await AsyncStorage.setItem('user', JSON.stringify(user));

                    navigation.reset({
                        index: 0,
                        routes: [{
                            name: data.user_type === 'DOCENT' ? 'DocentDashboard' : data.user_type === 'STUDENT' ? 'StudentDashboard' : 'AdminDashboard',
                            params: {user: user}
                        }],
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Fout',
                        text2: 'Er is een fout opgetreden bij het ophalen van gebruikersgegevens',
                    });
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Fout',
                    text2: 'Onjuiste aanmeldgegevens',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Toast.show({
                type: 'error',
                text1: 'Fout',
                text2: 'Er is een fout opgetreden tijdens het aanmelden',
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Inloggen</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                    style={styles.emailinput}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    onSubmitEditing={handleLogin}
                />
                <TextInput
                    styles={styles.input}
                    value="@hr.nl"
                    editable={false}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Wachtwoord"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                onSubmitEditing={handleLogin}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Registreren')}>
                <Text style={styles.loginButtonText}>Registreren</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => Linking.openURL('tel:+310107941111')}>
                    <Text style={styles.footerText}>010 - 794 1111</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:service@hr.nl')}>
                    <Text style={styles.footerText}>service@hr.nl</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 0,
        backgroundColor: '#fff7ea',
        alignItems: 'center',
    },
    loginText: {
        color: '#001e48',
        fontSize: 24,
        fontFamily: 'Poppins',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 50,
    },
    emailinput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '20%',
        position: 'relative',
        right: '3%',
    },
    loginButton: {
        height: 50,
        backgroundColor: '#198ee1',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
        borderRadius: 5,
        width: '40%',
    },
    registerButton: {
        height: 50,
        backgroundColor: '#d30f4c',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
        borderRadius: 5,
        width: '40%',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins',
    },
    footer: {
        backgroundColor: '#d30f4c',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    footerText: {
        color: '#fff',
        textDecorationLine: 'underline',
    },
});

export default Login;