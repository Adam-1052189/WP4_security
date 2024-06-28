import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const userId = await AsyncStorage.getItem('user_id');
                const response = await fetch(`http://localhost:8000/glitch/notifications/${userId}/`);
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        if (isFocused) {
            fetchNotifications();
        }
    }, [isFocused]);

    const markAllAsRead = async () => {
        try {
            const userId = await AsyncStorage.getItem('user_id');
            const response = await fetch(`http://localhost:8000/glitch/notifications/mark-as-read/${userId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setNotifications([]);
            } else {
                console.error('Failed to mark all notifications as read');
            }
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const deleteNotification = async (notificatieId) => {
        try {
            const response = await fetch(`http://localhost:8000/glitch/notifications/delete/${notificatieId}/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setNotifications(notifications.filter(notif => notif.notificatie_id !== notificatieId));
            } else {
                console.error('Failed to delete notification');
            }
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.notificationCard, item.read ? styles.readNotification : styles.unreadNotification]}>
            <Text style={styles.notificationText}>{item.beschrijving}</Text>
            <Text style={styles.notificationDate}>{new Date(item.created_at).toLocaleString()}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => deleteNotification(item.notificatie_id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={markAllAsRead} style={styles.markAllAsReadButton}>
                <Text style={styles.markAllAsReadButtonText}>Mark All as Read</Text>
            </TouchableOpacity>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={item => item.notificatie_id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    notificationCard: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 5,
    },
    notificationText: {
        fontSize: 16,
    },
    notificationDate: {
        fontSize: 12,
        color: 'gray',
    },
    unreadNotification: {
        backgroundColor: '#f9f9f9',
    },
    readNotification: {
        backgroundColor: '#e0e0e0',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButton: {
        marginLeft: 10,
    },
    deleteButtonText: {
        fontSize: 18,
    },
    markAllAsReadButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    markAllAsReadButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Notifications;