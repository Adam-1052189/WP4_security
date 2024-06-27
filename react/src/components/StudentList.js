import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import StudentCard from '../screens/StudentCard';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:8000/glitch/gebruikers');
            let data = await response.json();
            data = JSON.parse(data);
            data = data.map(item => ({ id: item.pk, ...item.fields }));
            data = data.filter(item => item.user_type === 'STUDENT');
            setStudents(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                setSelectedStudent(item);
                setModalVisible(true);
            }}
        >
            <View style={styles.cardContent}>
                <Text style={styles.cardText}>{item.voornaam} {item.achternaam}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={students}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                {selectedStudent && (
                    <StudentCard
                        studentId={selectedStudent.id}
                        closeModal={() => setModalVisible(false)}
                    />
                )}
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        width: '100%',
        height: 80,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: '#fff',
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
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

export default StudentList;
