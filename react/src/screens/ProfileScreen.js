import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        const response = await fetch(`http://localhost:8000/glitch/gebruiker/${userId}/`);
        const data = await response.json();
        setUser(data);
    };

    const handleUpdate = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        const response = await fetch(`http://localhost:8000/glitch/gebruiker/${userId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...user, password })
        });

        if (response.ok) {
            console.log('Gebruikersgegevens bijgewerkt');
        } else {
            console.log('Er is een fout opgetreden bij het bijwerken van de gebruikersgegevens');
        }
    };

    if (!user) {
        return <Text>Laden...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <View style={styles.fieldContainer}>
                    <Text>Voornaam: {user.voornaam}</Text>
                    <TextInput
                        value={user.voornaam}
                        onChangeText={(text) => setUser({ ...user, voornaam: text })}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text>Achternaam: {user.achternaam}</Text>
                    <TextInput
                        value={user.achternaam}
                        onChangeText={(text) => setUser({ ...user, achternaam: text })}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text>Email: {user.email}</Text>
                    <TextInput
                        value={user.email}
                        onChangeText={(text) => setUser({ ...user, email: text })}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text>Wachtwoord:</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={{height: 100}} numberOfLines={4}>Bio: {user.bio} </Text>
                    <TextInput
                        value={user.bio}
                        onChangeText={(text) => setUser({ ...user, bio: text })}
                        style={{ height: 100 }}
                        textAlignVertical={'top'}
                        multiline={true}
                    />
                </View>
            </View>
            <Button title="Update" onPress={handleUpdate} color={'#d30f4c'}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center-top',
        marginTop: 50,
        padding: 10,
        backgroundColor: '#fff7ea',
    },
    userContainer: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    fieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default ProfileScreen;