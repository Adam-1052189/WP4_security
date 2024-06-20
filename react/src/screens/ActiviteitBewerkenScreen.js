import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList , Button, TextInput } from 'react-native';
import ActiviteitCard from '../components/ActiviteitCard';

const ActiviteitBewerkenScreen = ({ activiteit, onClose }) => {
    const [activiteiten, setActiviteiten] = useState([]);
    const [taak, setTaak] = useState(activiteit.taak);
    const [niveau, setNiveau] = useState(activiteit.niveau);

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

    const renderItem = ({item}) => {
        return <ActiviteitCard activiteit={item} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activiteiten Bewerken</Text>
            <Text style={styles.label}>Taak:</Text>
            <TextInput
                style={styles.input}
                value={taak}
                onChangeText={setTaak}
            />
            <Text style={styles.label}>Niveau:</Text>
            <TextInput
                style={styles.input}
                value={niveau}
                onChangeText={setNiveau}
            />
            <FlatList
                data={activiteiten}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <Button title="Close" onPress={onClose} />
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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 10,
    },
});

export default ActiviteitBewerkenScreen;