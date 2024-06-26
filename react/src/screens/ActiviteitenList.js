import React, {useEffect, useState} from 'react';
import {View, Text, Modal, Button, TextInput} from 'react-native';
import axios from 'axios';
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
                if (cursusnaam) {
                    const response = await axios.get(`http://localhost:8000/glitch/cursussen/${cursusnaam}/activiteiten/`);
                    console.log(response.data);
                    if (response.data.activiteiten) {
                        setActiviteiten(response.data.activiteiten);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchActiviteiten();
    }, [cursusnaam]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/glitch/activiteiten/${selectedActiviteit.pk}/submit/`, {
                submission_text: submissionText
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
                        afgevinkt={activiteit.afgevinkt}
                    />
                    {index === activiteiten.length - 1 && <CoreAssignment cursusnaam={cursusnaam} activiteiten={activiteiten} />}
                </View>
            ))}
        </View>
    );
}

export default ActiviteitenList;