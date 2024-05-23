import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from "axios";
import DomeinItem from "../components/DomeinItem";
import CursusList from "../components/CursusList";

const DocentDashboard = () => {
    const [domeinen, setDomeinen] = useState([]);
    const [selectedCursusjaarId, setSelectedCursusjaarId] = useState(null);

    useEffect(() => {
        // Haal de domeinen op wanneer het component wordt geladen
        async function fetchDomeinen() {
            try {
                const response = await axios.get('http://localhost:8000/glitch/domeinen/');
                const data = response.data;
                console.log('Domeinen dashboard', data);

                // Set the fetched data to state
                setDomeinen(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchDomeinen();
    }, []);

    const handleSelect = (cursusjaarId) => {
        setSelectedCursusjaarId(cursusjaarId);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Docenten Dashboard</Text>
            <Text>Welkom op het dashboard. Hier vind je alle relevante informatie.</Text>
            {domeinen.map((domeinItem) => (
                <DomeinItem
                    key={domeinItem.domein_id}
                    domeinnaam={domeinItem.domeinnaam}
                    domein_id={domeinItem.domein_id.toString()}
                    onSelect={handleSelect}
                />
            ))}
            {selectedCursusjaarId && <CursusList cursusjaarId={selectedCursusjaarId} />}
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

