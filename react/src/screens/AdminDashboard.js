import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet, Text, FlatList} from 'react-native';
import Toast from 'react-native-toast-message';

function AdminDashboard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/glitch/gebruikers');
            let data = await response.json();
            data = JSON.parse(data);
            data = data.map(item => item.fields);
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

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
            <View style={styles.formContainer}>
                <Text>Maak een nieuw docent aan:</Text>
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
            <View style={styles.gebruikerListContainer}>
                <Text>Gebruikers:</Text>
                {users.map((user, index) => (
                    <View key={index}>
                        <Text>{user.id}</Text>
                        <Text>{user.email}</Text>
                        <Text>{user.is_superuser}</Text>
                        <Text>{user.user_type}</Text>
                        <Text>{user.is_staff}</Text>
                        <Text>{user.is_active}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
        backgroundColor: '#fff7ea',
    },
    formContainer: {
        width: '50%',
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    gebruikerListContainer: {
        flex: 1,
        marginTop: 20,
    },
});

export default AdminDashboard;