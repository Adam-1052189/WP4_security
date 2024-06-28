import React from 'react';
import { View, Button, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const HeaderRightButton = () => {
    const navigation = useNavigation();

    const logout = async () => {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        await AsyncStorage.removeItem('user_type');
        await AsyncStorage.removeItem('user_id');
        await AsyncStorage.removeItem('user');
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
            <TouchableOpacity
                style={styles.notificationButton}
                onPress={() => navigation.navigate('Notifications')}
            >
                <Image
                    source={require('../components/Images/notification-icon.png')}
                    style={styles.notificationIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={logout}
            >
                <Text style={styles.buttonText}>Uitloggen</Text>
            </TouchableOpacity>
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
    notificationButton: {
        marginHorizontal: 10,
    },
    notificationIcon: {
        width: 24,
        height: 24,
    },
    logoutButton: {
        backgroundColor: '#d30f4c',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});

export default HeaderRightButton;