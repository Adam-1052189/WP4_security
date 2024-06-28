import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const HeaderRightButton = ({ handleLogout }) => {
    const navigation = useNavigation();
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const userId = await AsyncStorage.getItem('user_id');
                const response = await fetch(`http://localhost:8000/glitch/notifications/${userId}/`);
                const data = await response.json();
                setHasUnreadNotifications(data.some(notif => !notif.read));
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        if (isFocused) {
            fetchNotifications();
        }
    }, [isFocused]);

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
                style={styles.buttonNotification}
                onPress={() => navigation.navigate('Notifications')}
            >
                <Text style={styles.notificationIcon}>🔔</Text>
                {hasUnreadNotifications && <View style={styles.notificationDot} />}
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Profiel')}
            >
                <Text style={styles.buttonText}>Profiel</Text>
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
        position: 'relative',
        marginHorizontal: 5,
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
    notificationIcon: {
        fontSize: 24,
        color: '#fff',
    },
    notificationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        position: 'absolute',
        top: -2,
        right: -2,
    },
    buttonNotification: {
        position: 'relative',
        marginHorizontal: 5,
    },
});

export default HeaderRightButton;
