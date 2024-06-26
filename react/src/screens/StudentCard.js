import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

const StudentCard = ({route}) => {
    const [activiteiten, setActiviteiten] = useState([]);
    const {studentId} = route.params;

    const fetchActivitiesAndAssignments = async () => {
        try {
            const response = await fetch(`http://localhost:8000/glitch/gebruikers/${studentId}/activities/`);
            let data = await response.json();
            console.log('Response data:', data);
            const activities = data.activiteiten.map(item => {
                console.log('Item:', item);
                const gebruikeractiviteit = item.gebruikeractiviteit.map(ga => ga.niveau);
                return {
                    id: item.id,
                    taak: item.taak,
                    niveau: gebruikeractiviteit
                };
            });
            console.log('Mapped activities:', activities);
            setActiviteiten(activities);
        } catch (error) {
            console.error('Error fetching activities and assignments:', error);
        }
    };

    useEffect(() => {
        fetchActivitiesAndAssignments();
    }, []);

    return (
        <View style={styles.container}>
            {activiteiten.map((activiteit) => (
                <View key={activiteit.id}>
                    <Text style={styles.title}>Activiteiten Bewerken</Text>
                    <Text style={styles.label}>Taak:</Text>
                    <TextInput
                        style={styles.input}
                        value={activiteit.taak || 'Data not available'}
                        editable={true}
                    />
                    <Text style={styles.label}>Niveau:</Text>
                    <TextInput
                        style={styles.input}
                        value={activiteit.niveau || 'Data not available'}
                        editable={true}
                    />
                </View>
            ))}
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

export default StudentCard;