import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Button, TextInput} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

function GebruikerList({ route, navigation }) {
    const routeGebruikers = route.params.gebruikers;
    const [filter, setFilter] = useState('all');
    const [zoekTerm, setZoekTerm] = useState('');
    const isFocused = useIsFocused();
    const [gebruikers, setGebruikers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/glitch/gebruikers');
            let data = await response.json();
            data = JSON.parse(data);
            data = data.map(item => ({id: item.pk, ...item.fields}));
            setGebruikers(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchUsers();
        }
    }, [isFocused]);

    const filteredUsers = gebruikers.filter(user => {
        if (filter !== 'all' && user.user_type !== filter) return false;
        if (zoekTerm && !`${user.voornaam} ${user.achternaam}`.toLowerCase().includes(zoekTerm.toLowerCase())) return false;
        return true;
    });

    const renderItem = ({item}) => (
        <View style={styles.gebruikerContainer}>
            <Text>Id: {item.id}</Text>
            <Text>Voornaam: {item.voornaam}</Text>
            <Text>Achternaam: {item.achternaam}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Is superuser: {item.is_superuser ? 'Ja' : 'Nee'}</Text>
            <Text>Type: {item.user_type}</Text>
            <Text>Is staff: {item.is_staff ? 'Ja' : 'Nee'}</Text>
            <Text>Is active: {item.is_active ? 'Ja' : 'Nee'}</Text>
            <Button title="Bewerk" onPress={() => navigation.navigate('GebruikerEditScreen', {gebruiker: item})} />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <Button title="All" onPress={() => setFilter('all')} />
                <Button title="Admin" onPress={() => setFilter('ADMIN')} />
                <Button title="Docent" onPress={() => setFilter('DOCENT')} />
                <Button title="Student" onPress={() => setFilter('STUDENT')} />
            </View>
            <TextInput
                style={styles.zoekInput}
                placeholder="Zoek op naam"
                onChangeText={setZoekTerm}
                value={zoekTerm}
            />
            <FlatList
                data={filteredUsers}
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
    gebruikerContainer: {
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
    zoekInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
    },
});

export default GebruikerList;