import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const CursusvoortgangCard = () => {
    const navigation = useNavigation();
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
        fetchUsers();
    }, []);

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate('GebruikerDetailsScreen', {gebruiker: item})}>
            <Text>{item.voornaam} {item.achternaam}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Student voortgang</Text>
            <FlatList
                data={gebruikers}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 100,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: '#fff',
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    cardText: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default CursusvoortgangCard;