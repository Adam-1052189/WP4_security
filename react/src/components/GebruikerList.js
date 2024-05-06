import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';

function GebruikerList({ gebruikers }) {
    const [filter, setFilter] = useState('all');

    const filteredUsers = gebruikers.filter(user => {
        if (filter === 'all') return true;
        if (filter === 'ADMIN') return user.user_type === 'ADMIN';
        if (filter === 'DOCENT') return user.user_type === 'DOCENT';
        if (filter === 'STUDENT') return user.user_type === 'STUDENT';
        return true;
    });

    const renderItem = ({item}) => (
        <View style={styles.gebruikerContainer}>
            <Text>Id: {item.id}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Is superuser: {item.is_superuser ? 'Ja' : 'Nee'}</Text>
            <Text>Type: {item.user_type}</Text>
            <Text>Is staff: {item.is_staff ? 'Ja' : 'Nee'}</Text>
            <Text>Is active: {item.is_active ? 'Ja' : 'Nee'}</Text>
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
});

export default GebruikerList;