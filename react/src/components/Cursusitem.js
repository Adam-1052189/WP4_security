import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import ActiviteitenList from './ActiviteitenList';

function CursusItem({cursusnaam}) {
    const [showDetails, setShowDetails] = useState(false);

    const handleClick = () => {
        setShowDetails(!showDetails);
    };

    console.log('Cursusnaam:', cursusnaam);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleClick} style={styles.card}>
                <Text style={styles.cardText}>{cursusnaam}</Text>
            </TouchableOpacity>
            {showDetails && <ActiviteitenList cursusnaam={cursusnaam} />}
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