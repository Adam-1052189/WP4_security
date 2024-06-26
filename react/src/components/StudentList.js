import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const StudentList = () => {
    const [students, setStudents] = useState([]);

    const navigation = useNavigation();

    const fetchStudents = async () => {
    try {
        const response = await fetch('http://localhost:8000/glitch/gebruikers');
        let data = await response.json();
        data = JSON.parse(data);
        data = data.map(item => ({id: item.pk, ...item.fields}));
        data = data.filter(item => item.user_type === 'STUDENT');
        setStudents(data);
    } catch (error) {
        console.error(error);
    }
};

    useEffect(() => {
        fetchStudents();
    }, []);


    const renderItem = ({item}) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('StudentCard', { studentId: item.id })}
        >
            <View style={styles.cardContent}>
                <Text style={styles.cardText}>{item.voornaam} {item.achternaam}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={students}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 100,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: '#fff',
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
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