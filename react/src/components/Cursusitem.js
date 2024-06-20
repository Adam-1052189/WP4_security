import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function CursusItem({cursusnaam}) {
    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate('ActiviteitenList', { cursusnaam: cursusnaam });
    };

    console.log('Cursusnaam:', cursusnaam);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleClick} style={styles.card}>
                <Text style={styles.cardText}>{cursusnaam}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
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