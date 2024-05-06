import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';

function AdminDashboard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/glitch/gebruikers');
            let data = await response.json();
            data = JSON.parse(data);
            data = data.map(item => ({id: item.pk, ...item.fields}));
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const filteredUsers = users.filter(user => {
        if (filter === 'all') return true;
        if (filter === 'ADMIN') return user.user_type === 'ADMIN';
        if (filter === 'DOCENT') return user.user_type === 'DOCENT';
        if (filter === 'STUDENT') return user.user_type === 'STUDENT';
        return true;
    });

    const renderItem = ({item}) => (
        <View style={styles.userContainer}>
            <Text>Id: {item.id}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Is superuser: {item.is_superuser ? 'Ja' : 'Nee'}</Text>
            <Text>Type: {item.user_type}</Text>
            <Text>Is staff: {item.is_staff ? 'Ja' : 'Nee'}</Text>
            <Text>Is active: {item.is_active ? 'Ja' : 'Nee'}</Text>
        </View>
    );

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/api-auth/register-docent/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    voornaam,
                    achternaam,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(`Docent aangemaakt met voornaam: ${voornaam}, achternaam: ${achternaam}, email: ${email}, en wachtwoord: ${password}`);
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
                    placeholder="Voornaam"
                    onChangeText={setVoornaam}
                    value={voornaam}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Achternaam"
                    onChangeText={setAchternaam}
                    value={achternaam}
                />
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
            <View style={styles.filterContainer}>
                <Button title="All" onPress={() => setFilter('all')} />
                <Button title="Admin" onPress={() => setFilter('ADMIN')} />
                <Button title="Docent" onPress={() => setFilter('DOCENT')} />
                <Button title="Student" onPress={() => setFilter('STUDENT')} />
            </View>
            <FlatList
                data={filteredUsers.slice(0, 5)}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
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
    userContainer: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});

export default AdminDashboard;