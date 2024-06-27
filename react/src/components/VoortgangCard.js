import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const VoortgangCard = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('StudentList')} style={styles.card}>
            <View style={styles.cardContent}>
                <Text style={styles.cardText}>Voortgang</Text>
                <Text style={styles.subtitleText}>Beheer activiteiten en kernopdrachten van studenten</Text>
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
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    cardText: {
        fontSize: 18,
        textAlign: 'center',
    },
    subtitleText: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

export default VoortgangCard;
