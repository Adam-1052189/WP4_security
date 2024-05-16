import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Domeinen from '../components/Domeinen';
import axios from "axios";
import DomeinItem from "../components/DomeinItem";


const DocentDashboard = () => {
    const [domeinen, setDomeinen] = useState([]);

    useEffect(() => {
        // Haal de domeinen op wanneer het component wordt geladen
        const fetchDomeinen = async () => {
            const response = await axios.get('http://localhost:8000/glitch/domeinen/');
            setDomeinen(response.data);
        };

        fetchDomeinen();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Docenten Dashboard</Text>
            <Text>Welkom op het dashboard. Hier vind je alle relevante informatie.</Text>
            {domeinen.map((domein) => (
                <DomeinItem key={domein.domein_id} domein={domein} />
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
});

export default DocentDashboard;

