import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BackButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    backButton: {
        marginLeft: 10,
        marginRight: 10,
    },
});

export default BackButton;