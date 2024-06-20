import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ActiviteitCard from '../components/ActiviteitCard';

const ActiviteitBewerkenScreen = () => {
    const [activiteiten, setActiviteiten] = useState([]);

    const fetchActiviteiten = async () => {
        try {
            const response = await fetch('http://localhost:8000/glitch/activiteiten');
            let data = await response.json();
            data = JSON.parse(data);
            data = data.map(item => ({id: item.pk, ...item.fields}));
            setActiviteiten(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchActiviteiten();
    }, []);

    console.log(activiteiten);

    const renderItem = ({item}) => {
        console.log(item);
        <ActiviteitCard activiteit={item} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activiteiten Bewerken</Text>
            <FlatList
                data={activiteiten}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ActiviteitBewerkenScreen;