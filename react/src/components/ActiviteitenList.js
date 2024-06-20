import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import Card from './Card';
import CoreAssignment from './CoreAssignment';

function ActiviteitenList({ cursusnaam }) {
    const [activiteiten, setActiviteiten] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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