import React, { useState, useEffect } from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Card from '../components/Card'; // Import the Card component

const ActiviteitDetailScreen = ({ route }) => {
    const [activiteiten, setActiviteiten] = useState([]);
    const navigation = useNavigation();

    const fetchAllActiviteiten = async () => {
        try {
            const response = await fetch('http://localhost:8000/glitch/activiteiten/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            setActiviteiten(data);
        } catch (error) {
            console.error('Failed to fetch activiteiten:', error);
        }
    };

    useEffect(() => {
        fetchAllActiviteiten();
    }, []);

    const renderItem = ({ item }) => (
        <Card
            title={item.taak}
            onPress={() => navigation.navigate('ActiviteitBewerkenScreen', {activiteit: item})}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={activiteiten}
                renderItem={renderItem}
                keyExtractor={item => item.activiteit_id.toString()}
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
});

export default ActiviteitDetailScreen;