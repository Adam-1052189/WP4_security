import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import * as Progress from 'react-native-progress';

function Card({ title, onPress, niveau, afgevinkt }) {
    const backgroundColor = afgevinkt ? '#a7ef93' : '#fff';

    return (
        <TouchableOpacity onPress={onPress} style={[styles.card, {backgroundColor}]}>
            <View style={styles.cardContent}>
                <Text style={[styles.cardText, {marginBottom: 10}]}>{title}</Text>
                {niveau !== undefined && <Progress.Bar progress={niveau / 4} width={200} />}
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
});

export default Card;