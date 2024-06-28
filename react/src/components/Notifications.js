import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        try {
            const userId = await AsyncStorage.getItem('user_id');
            console.log(`Fetching notifications for user ID: ${userId}`);
            const response = await fetch(`http://localhost:8000/glitch/notifications/${userId}/`);
            const data = await response.json();
            console.log(`Notifications data: ${JSON.stringify(data)}`);
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const renderNotificationItem = ({ item }) => (
        <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>{item.beschrijving}</Text>
            <Text style={styles.notificationDate}>{new Date(item.created_at).toLocaleDateString('nl-NL')}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={renderNotificationItem}
                keyExtractor={item => item.notificatie_id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    notificationCard: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    notificationText: {
        fontSize: 16,
    },
    notificationDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
    },
});

export default Notifications;