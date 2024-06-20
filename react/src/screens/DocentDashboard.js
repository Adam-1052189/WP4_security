import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CursusvoortgangCard from '../components/CursusvoortgangCard';
import ActiviteitenCard from '../components/ActiviteitCard';

const DocentDashboard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Docenten Dashboard</Text>
            <CursusvoortgangCard />
            <ActiviteitenCard />
            <Text>Welkom op het dashboard. Hier vind je alle relevante informatie.</Text>
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