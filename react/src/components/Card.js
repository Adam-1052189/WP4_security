import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet,} from 'react-native';
import * as Progress from 'react-native-progress';

function Card({title, onPress, niveau, status, isLocked}) {
    let backgroundColor;

    switch (status) {
        case 'GOEDGEKEURD':
            backgroundColor = '#a7ef93'; // Groen
            break;
        case 'AFGEKEURD':
            backgroundColor = '#ff6a6a'; // Rood
            break;
        case 'AFWACHTING':
            backgroundColor = '#e4a460'; // oranje
            break;
        case 'OPEN':
        default:
            backgroundColor = '#fff'; // Wit
            break;
    }

    return (
        <TouchableOpacity onPress={!isLocked ? onPress : null} style={[styles.card, {backgroundColor}]}>
            <View style={[styles.cardContent, {opacity: isLocked ? 0.2 : 1}]}>
                <Text style={[styles.cardText, {marginBottom: 10}]}>{title}</Text>
                {niveau !== undefined && <Progress.Bar progress={niveau / 4} width={200}/>}
            </View>
            {isLocked && <Text style={styles.lockedText}>Voltooi eerst alle activiteiten om de kernopdracht te
                ontgrendelen.</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 100,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
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
    lockedText: {
        fontSize: 16,
        color: 'red',
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
    },
});

export default Card;