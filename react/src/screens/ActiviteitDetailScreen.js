import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Modal } from 'react-native';
import Card from '../components/Card';
import ActiviteitBewerkenScreen from './ActiviteitBewerkenScreen';

const ActiviteitDetailScreen = ({ route }) => {
    const [activiteiten, setActiviteiten] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedActiviteit, setSelectedActiviteit] = useState(null);

    const fetchAllActiviteiten = async () => {
        try {
            const response = await fetch('http://localhost:8000/glitch/activiteiten/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            setActiviteiten(data);
        } catch (error) {
            console.error('Failed to fetch activiteiten:', error);
        }
    };

    useEffect(() => {
        fetchAllActiviteiten();
    }, []);

    const renderItem = ({ item }) => (
        <Card
            title={item.taak}
            onPress={() => {
                setSelectedActiviteit(item);
                setModalVisible(true);
            }}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={activiteiten}
                renderItem={renderItem}
                keyExtractor={item => item.activiteit_id.toString()}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ActiviteitBewerkenScreen activiteit={selectedActiviteit} onClose={() => setModalVisible(false)} onUpdated={fetchAllActiviteiten} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
        backgroundColor: '#fff7ea',
    },
});

export default ActiviteitDetailScreen;