import React, { useEffect, useState } from 'react';
import Card from "./Card";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CoreAssignment({ cursusnaam, activiteiten }) {
    const [coreAssignment, setCoreAssignment] = useState(null);

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
                }
            } catch (error) {
                console.error('Error fetching core assignment:', error);
            }
        };

        fetchCoreAssignment();
    }, [cursusnaam]);

    const allActivitiesApproved = activiteiten && activiteiten.every(activiteit => activiteit.status === 'GOEDGEKEURD');

    return (
        <Card
            title={coreAssignment ? coreAssignment.opdrachtnaam : 'Loading...'}
            onPress={() => {}}
            isLocked={coreAssignment ? !allActivitiesApproved : true}
        />
    );
}

export default CoreAssignment;
