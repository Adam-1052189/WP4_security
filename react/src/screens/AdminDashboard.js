import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';

function AdminDashboard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/api-auth/register-docent/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(`Docent aangemaakt met email: ${email}, en wachtwoord: ${password}`);
                Toast.show({
                    type: 'success',
                    text1: 'Succes',
                    text2: 'Docent succesvol aangemaakt',
                });
            } else {
                console.log('Aanmaken docent mislukt:', data);
                Toast.show({
                    type: 'error',
                    text1: 'Fout',
                    text2: 'Aanmaken docent mislukt',
                });
            }
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
            Toast.show({
                type: 'error',
                text1: 'Fout',
                text2: 'Er is een fout opgetreden tijdens het aanmaken van de docent',
            });
        }
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                onSubmitEditing={handleSubmit}
            />
            <TextInput
                style={styles.input}
                placeholder="Wachtwoord"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                onSubmitEditing={handleSubmit}
            />
            <Button
                title="Maak Docent" onPress={handleSubmit}
                color="#d30f4c"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff7ea',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default AdminDashboard;