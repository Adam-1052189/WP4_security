import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GebruikerDetailsScreen = ({ route }) => {
    const { gebruiker } = route.params;

    return (
        <View style={styles.container}>
            <Text>{gebruiker.voornaam} {gebruiker.achternaam}</Text>
            // ... toon hier andere details van de gebruiker
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GebruikerDetailsScreen;