import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function CursusItem({ cursusnaam, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <View style={styles.cardContent}>
                <Text style={styles.cardText}>{cursusnaam}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
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
});

export default CursusItem;