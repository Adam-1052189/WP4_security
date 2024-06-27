import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, FlatList, TouchableOpacity } from 'react-native';

const StudentCard = ({ studentId, closeModal, modalVisible, setModalVisible }) => {
    const [activiteiten, setActiviteiten] = useState([]);

    const fetchActivitiesAndAssignments = async () => {
        try {
            const response = await fetch(`http://localhost:8000/glitch/gebruikers/${studentId}/activities/`);
            let data = await response.json();
            const activities = data.activiteiten.map(item => ({
                id: item.id,
                taak: item.taak,
                niveau: item.niveau,
                deadline: item.deadline,
                status: item.status,
            }));
            setActiviteiten(activities);
        } catch (error) {
            console.error('Error fetching activities and assignments:', error);
        }
    };

    useEffect(() => {
        fetchActivitiesAndAssignments();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8000/glitch/activiteiten/${id}/update_status/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                fetchActivitiesAndAssignments();
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const renderActivity = ({ item }) => (
        <View style={styles.activityCard}>
            <Text style={styles.activityText}>Taak: {item.taak}</Text>
            <Text style={styles.activityText}>Niveau: {item.niveau}</Text>
            <Text style={styles.activityText}>Deadline: {item.deadline}</Text>
            <Text style={styles.activityText}>Status: {item.status}</Text>
            {item.status === 'AFWACHTING' && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.buttonApprove}
                        onPress={() => updateStatus(item.id, 'GOEDGEKEURD')}
                    >
                        <Text style={styles.buttonText}>Goedkeuren</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonReject}
                        onPress={() => updateStatus(item.id, 'AFGEKEURD')}
                    >
                        <Text style={styles.buttonText}>Afkeuren</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <FlatList
                        data={activiteiten}
                        renderItem={renderActivity}
                        keyExtractor={item => item.id.toString()}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    activityCard: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    activityText: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonApprove: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    buttonReject: {
        backgroundColor: '#F44336',
        padding: 10,
        borderRadius: 5,
    },
    buttonSave: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#2196F3',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default StudentCard;
