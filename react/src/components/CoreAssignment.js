import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TextInput, Button, TouchableOpacity } from 'react-native';
import Card from "./Card";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CoreAssignment({ cursusnaam, activiteiten }) {
    const [coreAssignment, setCoreAssignment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [submissionText, setSubmissionText] = useState('');
    const [selectedCoreAssignment, setSelectedCoreAssignment] = useState(null);

    useEffect(() => {
        const fetchCoreAssignment = async () => {
            try {
                const token = await AsyncStorage.getItem('access_token');
                if (cursusnaam && token) {
                    const response = await axios.get(`http://localhost:8000/glitch/cursussen/${cursusnaam}/coreassignment/`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setCoreAssignment(response.data);
                    setSubmissionText(response.data.submission_text || '');
                }
            } catch (error) {
                console.error('Error fetching core assignment:', error);
            }
        };

        fetchCoreAssignment();
    }, [cursusnaam]);

    const openModal = () => {
        if (allActivitiesApproved) {
            setSelectedCoreAssignment(coreAssignment);
            setModalVisible(true);
        }
    };

    const handleSubmit = async () => {
        if (!selectedCoreAssignment) {
            console.error("No core assignment selected");
            return;
        }

        if (selectedCoreAssignment.status === 'GOEDGEKEURD') {
            console.error("Cannot submit for approved core assignments");
            return;
        }

        try {
            const token = await AsyncStorage.getItem('access_token');
            const response = await axios.post(`http://localhost:8000/glitch/coreassignments/${selectedCoreAssignment.id}/submit/`, {
                submission_text: submissionText
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setModalVisible(false);
            setSubmissionText('');
            setSelectedCoreAssignment(null);
            // Refresh core assignment
            const updatedResponse = await axios.get(`http://localhost:8000/glitch/cursussen/${cursusnaam}/coreassignment/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCoreAssignment(updatedResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    const allActivitiesApproved = activiteiten && activiteiten.every(activiteit => activiteit.status === 'GOEDGEKEURD');

    return (
        <View>
            <Card
                title={coreAssignment ? coreAssignment.opdrachtnaam : 'Loading...'}
                onPress={openModal}
                isLocked={coreAssignment ? !allActivitiesApproved : true}
                status={coreAssignment ? coreAssignment.status : 'OPEN'}
                deadline={coreAssignment?.deadline}
            />
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                        <Text style={{ marginBottom: 10 }}>Inleveren voor: {selectedCoreAssignment?.opdrachtnaam}</Text>
                        <Text style={{marginBottom: 10}}>Deadline: {selectedCoreAssignment?.deadline}</Text>
                        <TextInput
                            placeholder="Voer je tekst in"
                            value={submissionText}
                            onChangeText={setSubmissionText}
                            style={{ height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                            multiline
                            editable={selectedCoreAssignment?.status !== 'GOEDGEKEURD'}
                        />
                        {selectedCoreAssignment?.status !== 'GOEDGEKEURD' ? (
                            <Button title="Inleveren" onPress={handleSubmit} />
                        ) : (
                            <Text style={{ color: 'green' }}>Deze kernopdracht is al goedgekeurd en kan niet opnieuw worden ingeleverd.</Text>
                        )}
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>
                            <Text style={{ color: 'red' }}>Annuleren</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default CoreAssignment;