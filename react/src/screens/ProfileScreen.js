import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const ProfileScreen = () => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState('');
    const [profielfoto, setProfielfoto] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('access_token');
        const response = await fetch(`http://localhost:8000/glitch/gebruiker/${userId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setUser(data);
    };

    const handleUpdate = async () => {
        const userId = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('access_token');

        const { profielfoto, ...userData } = user;

        const response = await fetch(`http://localhost:8000/glitch/gebruiker/${userId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ ...userData, password: password || undefined })
        });

        if (response.ok) {
            Toast.show({
                type: 'success',
                text1: 'Succes',
                text2: 'Gebruikersgegevens succesvol bijgewerkt',
            });
            console.log('Gebruikersgegevens bijgewerkt');
        } else {
            const errorData = await response.json();
            Toast.show({
                type: 'error',
                text1: 'Fout',
                text2: 'Er is een fout opgetreden, vul alles in',
            });
            console.log('Er is een fout opgetreden', errorData);
        }
    };

    const selectImage = () => {
        if (Platform.OS !== 'web') {
            launchImageLibrary({ includeBase64: true }, (response) => {
                if (response.didCancel) {
                    console.log('Gebruiker heeft geannuleerd');
                } else if (response.errorCode) {
                    console.error('ImagePicker Error: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    setProfielfoto(response.assets[0]);
                }
            });
        } else {
            document.getElementById('fileInput').click();
        }
    };

    const handleWebImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfielfoto({ uri: e.target.result, type: file.type, name: file.name, base64: e.target.result.split(',')[1] });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadProfielfoto = async () => {
        if (!profielfoto) {
            Toast.show({
                type: 'error',
                text1: 'Fout',
                text2: 'Selecteer eerst een afbeelding',
            });
            return;
        }

        const userId = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('access_token');

        const response = await axios.put(`http://localhost:8000/glitch/gebruiker/${userId}/upload_profielfoto/`, {
            profielfoto: `data:${profielfoto.type};base64,${profielfoto.base64}`,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const updatedUser = { ...user, profielfoto: response.data.profielfoto };
            setUser(updatedUser);
            Toast.show({
                type: 'success',
                text1: 'Succes',
                text2: 'Profielfoto succesvol geüpload',
            });
            console.log('Profielfoto geüpload');
        } else {
            const errorData = await response.data;
            Toast.show({
                type: 'error',
                text1: 'Fout',
                text2: 'Er is een fout opgetreden bij het uploaden van de profielfoto',
            });
            console.log('Er is een fout opgetreden', errorData);
        }
    };

    if (!user) {
        return <Text>Laden...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <View style={styles.fieldContainer}>
                    <Text>Voornaam: {user.voornaam}</Text>
                    <TextInput
                        value={user.voornaam || ''}
                        onChangeText={(text) => setUser({ ...user, voornaam: text })}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text>Achternaam: {user.achternaam}</Text>
                    <TextInput
                        value={user.achternaam || ''}
                        onChangeText={(text) => setUser({ ...user, achternaam: text })}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text>Email: {user.email}</Text>
                    <TextInput
                        value={user.email || ''}
                        onChangeText={(text) => setUser({ ...user, email: text })}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text>Wachtwoord:</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={{ height: 20, borderColor: 'gray', borderWidth: 1 }}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={{ height: 100 }} numberOfLines={4}>Bio: {user.bio} </Text>
                    <TextInput
                        value={user.bio || ''}
                        onChangeText={(text) => setUser({ ...user, bio: text })}
                        style={{ height: 100 }}
                        textAlignVertical={'top'}
                        multiline={true}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text>Profielfoto:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ alignItems: 'center', marginRight: 20 }}>
                            <Text>Huidige</Text>
                            {user.profielfoto && (
                                <Image
                                    source={{ uri: user.profielfoto }}
                                    style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10, marginTop: 10 }}
                                />
                            )}
                        </View>
                        {profielfoto && (
                            <View style={{ alignItems: 'center' }}>
                                <Text>Nieuw</Text>
                                <Image
                                    source={{ uri: profielfoto.uri }}
                                    style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10, marginTop: 10 }}
                                />
                            </View>
                        )}
                    </View>
                    <TouchableOpacity onPress={selectImage}>
                        <Text style={{ color: 'blue', marginTop: 10 }}>Selecteer een afbeelding</Text>
                    </TouchableOpacity>
                    {Platform.OS === 'web' && (
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleWebImageSelect}
                        />
                    )}
                </View>
            </View>
            <Button title="Update" onPress={handleUpdate} color={'#d30f4c'} />
            <Button title="Upload Profielfoto" onPress={handleUploadProfielfoto} color={'#1a69da'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center-top',
        marginTop: 50,
        padding: 10,
        backgroundColor: '#fff7ea',
    },
    userContainer: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    fieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default ProfileScreen;