import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StudentProgress = ({ docentId }) => {
    const [data, setData] = useState({ core_assignments: [], voortgangen: [] });

    useEffect(() => {
        fetch(`http://localhost:8000/glitch/docent_voortgang/${docentId}`)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, [docentId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Student Voortgang</Text>
            {data.core_assignments.map((item, index) => (
                <View key={index} style={styles.item}>
                    <Text>Core Assignment: {item.opdrachtnaam}</Text>
                </View>
            ))}
            {data.voortgangen.map((item, index) => (
                <View key={index} style={styles.item}>
                    <Text>Voortgang: {item.score}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
    },
});

export default StudentProgress;