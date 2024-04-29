import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';
import axios from 'axios';


function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/api-auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password}),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                console.log(`ingelogd: ${email}, en wachtwoord: ${password}`);
            } else {
                console.log(' mislukt:', data);
            }
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    };

    // if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    // }

//     const token = data.token;
//     const userType = data.user_type; // U moet ervoor zorgen dat uw server het user_type retourneert in de response
//     console.log(token);
//
//     // Navigeer naar het juiste dashboard op basis van het user_type
//     if (userType === 'Docent') {
//         navigation.navigate('DocentDashboard');
//     } else if (userType === 'Student') {
//         navigation.navigate('StudentDashboard');
//     } else {
//         console.log('Onbekend user_type: ', userType);
//     }
// }
//
// catch
// (error)
// {
//     console.log(error.message);
// }
// }
// ;
return (
    <View style={styles.container}>
        <Text style={styles.loginText}>Inloggen</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
        />
        <TextInput
            style={styles.input}
            placeholder="Wachtwoord"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
        />
        <Button title="Login" onPress={handleSubmit}/>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Registreren')}>
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
}

// ... rest of your code ...

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 0,
        backgroundColor: '#fff7ea',
    },
    loginText: {
        color: '#001e48',
        fontSize: 24,
        fontFamily: 'Poppins',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 50,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    loginButton: {
        height: 50,
        backgroundColor: '#d30f4c',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
        borderRadius: 5,
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