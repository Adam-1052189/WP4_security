import React, { useEffect, useState } from 'react';
import Card from "./Card";
import axios from 'axios';

function CoreAssignment({ cursusnaam, activiteiten }) {
    const [coreAssignment, setCoreAssignment] = useState(null);

    useEffect(() => {
        const fetchCoreAssignment = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/glitch/cursussen/${cursusnaam}/coreassignment/`);
                setCoreAssignment(response.data);
            } catch (error) {
                console.error('Error fetching core assignment:', error);
            }
        };

        fetchCoreAssignment();
    }, [cursusnaam]);

    const allActivitiesCompleted = activiteiten.every(activiteit => activiteit.afgevinkt);

    return (
        <Card title={coreAssignment ? coreAssignment.opdrachtnaam : 'Loading...'} onPress={() => {}} isLocked={!allActivitiesCompleted} />    );
}

export default CoreAssignment;