import React, {useEffect, useState} from 'react';
import {View, Text, Modal, TextInput, Button, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card';
import CoreAssignment from '../components/CoreAssignment';

function ActiviteitenList({route}) {
    const {cursusnaam} = route.params;
    const [activiteiten, setActiviteiten] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [submissionText, setSubmissionText] = useState('');
    const [selectedActiviteit, setSelectedActiviteit] = useState(null);

    useEffect(() => {
        const fetchActiviteiten = async () => {
            try {
                const token = await AsyncStorage.getItem('access_token');
                if (cursusnaam && token) {
                    const response = await axios.get(`http://localhost:8000/glitch/cursussen/${cursusnaam}/activiteiten/`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log('Activiteiten response:', response.data);
                    if (response.data.activiteiten) {
                        setActiviteiten(response.data.activiteiten);
                    }
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActiviteiten();
    }, [cursusnaam]);

    const openModal = (activiteit) => {
        setSelectedActiviteit(activiteit);
        setSubmissionText(activiteit.submission_text || '');
        setModalVisible(true);
    };

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            const response = await axios.post(`http://localhost:8000/glitch/activiteiten/${selectedActiviteit.pk}/submit/`, {
                submission_text: submissionText
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setModalVisible(false);
            setSubmissionText('');
            setSelectedActiviteit(null);
            const updatedResponse = await axios.get(`http://localhost:8000/glitch/cursussen/${cursusnaam}/activiteiten/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setActiviteiten(updatedResponse.data.activiteiten);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            {activiteiten && activiteiten.map((activiteit, index) => (
                <View key={index}>
                    <Card
                        title={activiteit.taak}
                        onPress={() => openModal(activiteit)}
                        niveau={activiteit.niveau}
                        status={activiteit.status}
                    />
                </View>
            ))}
            {activiteiten.length === 0 && (
                <Text>No activities found.</Text>
            )}
            <CoreAssignment cursusnaam={cursusnaam} activiteiten={activiteiten}/>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <View style={{width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10}}>
                        <Text style={{marginBottom: 10}}>Inleveren voor: {selectedActiviteit?.taak}</Text>
                        <TextInput
                            placeholder="Voer je tekst in"
                            value={submissionText}
                            onChangeText={setSubmissionText}
                            style={{height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
                            multiline
                        />
                        <Button title="Inleveren" onPress={handleSubmit}/>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{marginTop: 10}}>
                            <Text style={{color: 'red'}}>Annuleren</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ActiviteitenList;
