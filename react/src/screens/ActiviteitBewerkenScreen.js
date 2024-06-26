import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';

const ActiviteitBewerkenScreen = ({ activiteit, onClose, onUpdated }) => {
    const [taak, setTaak] = useState(activiteit.taak);
    const [niveau, setNiveau] = useState(activiteit.niveau);

    const submitChanges = async () => {
        try {
            const response = await fetch(`http://localhost:8000/glitch/activiteiten/${activiteit.activiteit_id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taak: taak,
                    niveau: niveau,
                }),
            });

            if (response.ok) {
            Alert.alert('Success', 'Changes have been saved.');
            onUpdated();
            onClose();
        }

            Alert.alert('Success', 'Changes have been saved.');
            onClose();
        } catch (error) {
            Alert.alert('Error', 'Failed to save changes.');
            console.error(error);
        }
    };

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
            <Button title="Submit" onPress={submitChanges} />
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