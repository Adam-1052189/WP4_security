import React from 'react';
import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const HeaderRightButton = ({ handleLogout }) => {
    const navigation = useNavigation();

    const logout = async () => {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        await AsyncStorage.removeItem('user_type');
        await AsyncStorage.removeItem('user_id');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('profielfoto');
        Toast.show({
            type: 'success',
            text1: 'Uitgelogd',
            text2: 'Je bent succesvol uitgelogd',
        });
        navigation.navigate('Login');
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Profiel')}
            >
                <Text style={styles.buttonText}>Profiel</Text>
            </TouchableOpacity>
            <View style={{ width: 10 }} />
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={logout}
            >
                <Text style={styles.buttonText}>Uitloggen</Text>
            </TouchableOpacity>
            <View style={{ width: 10 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1a69da',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#d30f4c',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});

export default HeaderRightButton;