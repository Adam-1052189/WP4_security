import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../components/Card';
import CoreAssignment from '../components/CoreAssignment';

function ActiviteitenList({ route }) {
    const { cursusnaam } = route.params;
    const [activiteiten, setActiviteiten] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            const response = await axios.post(`http://localhost:8000/glitch/activiteiten/${selectedActiviteit.activiteit_id}/submit/`, {
                submission_text: submissionText
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setModalVisible(false);
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
                        onPress={() => {}}
                        niveau={activiteit.niveau}
                        status={activiteit.status}
                    />
                </View>
            ))}
            {activiteiten.length === 0 && (
                <Text>No activities found.</Text>
            )}
            <CoreAssignment cursusnaam={cursusnaam} />
        </View>
    );
}

export default ActiviteitenList;
