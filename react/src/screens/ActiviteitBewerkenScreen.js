import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker'; // Assuming you have installed a date picker library

const ActiviteitBewerkenScreen = ({ activiteit, onClose, onUpdated }) => {
    const [taak, setTaak] = useState(activiteit.taak);
    const [deadline, setDeadline] = useState(activiteit.deadline);

    const submitChanges = async () => {
        try {
            const response = await fetch(`http://localhost:8000/glitch/activiteiten/${activiteit.activiteit_id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taak: taak,
                    deadline: deadline,
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Changes have been saved.');
                onUpdated();
                onClose();
            } else {
                Alert.alert('Error', 'Failed to save changes.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to save changes.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Activiteiten Bewerken</Text>
                <Text style={styles.label}>Taak:</Text>
                <TextInput
                    style={styles.input}
                    value={taak}
                    onChangeText={setTaak}
                />
                <Text style={styles.label}>Deadline:</Text>
                <DatePicker
                    style={styles.datePicker}
                    date={deadline}
                    mode="date"
                    placeholder="Select deadline"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => { setDeadline(date); }}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonSave} onPress={submitChanges}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    datePicker: {
        width: '100%',
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    buttonSave: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    buttonClose: {
        backgroundColor: '#F44336',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ActiviteitBewerkenScreen;
