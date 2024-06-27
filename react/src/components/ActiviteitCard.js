import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const ActiviteitCard = ({ activiteit }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ActiviteitDetailScreen', { activiteit: activiteit })}>
            <View style={styles.card}>
                <Text style={styles.title}>Activiteiten</Text>
                <Text style={styles.subtitle}>Beheer activiteiten</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 100,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: '#fff',
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

export default ActiviteitCard;
