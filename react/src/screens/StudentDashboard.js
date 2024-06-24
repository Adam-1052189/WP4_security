import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Domeinen from '../components/Domeinen';
import Footer from '../components/Footer';
import PushNotificationConfig from '../components/PushNotificationConfig';
import axios from 'axios';

const StudentDashboard = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://your-backend-url/notificaties/', {
                    headers: {
                        Authorization: `Bearer ${your_token}`,
                    },
                });
                setNotifications(response.data);

                response.data.forEach(notificatie => {
                    showNotification('Deadline Alert', notificatie.beschrijving);
                });
            } catch (error) {
                console.error('Error fetching notifications', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <View>
            <Domeinen />
            <Footer />
            {notifications.map((notification, index) => (
                <Text key={index}>{notification.beschrijving}</Text>
            ))}
        </View>
    );
};

export default StudentDashboard;