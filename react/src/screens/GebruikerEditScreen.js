import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text, CheckBox} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Toast from "react-native-toast-message";

function GebruikerEditScreen({route, navigation}) {
    const gebruiker = route.params.gebruiker;
    const [voornaam, setVoornaam] = useState(gebruiker.voornaam || '');
    const [achternaam, setAchternaam] = useState(gebruiker.achternaam || '');
    const [email, setEmail] = useState(gebruiker.email || '');
    const [password, setPassword] = useState('');
    const [user_type, setUserType] = useState(gebruiker.user_type || '');
    const [is_active, setIsActive] = useState(gebruiker.is_active || false);
    const [is_staff, setIsStaff] = useState(gebruiker.is_staff || false);
    const [is_superuser, setIsSuperuser] = useState(gebruiker.is_superuser || false);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8000/glitch/gebruiker/${gebruiker.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    voornaam,
                    achternaam,
                    email,
                    password,
                    user_type,
                    is_active,
                    is_staff,
                    is_superuser,
                })
            });

            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Update succesvol',
                    text2: 'De gebruiker is succesvol bijgewerkt.',
                });
                navigation.goBack();
            } else {
                const errorText = await response.text();
                console.error('Update mislukt:', errorText);
                Toast.show({
                    type: 'error',
                    text1: 'Update mislukt',
                    text2: errorText,
                });

            }
        } catch
            (error) {
            Toast.show({
                type: 'error',
                text1: 'Update mislukt',
                text2: 'Er is een fout opgetreden bij het bijwerken van de gebruiker.',
            });
            console.error('Er is een fout opgetreden:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Voornaam:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Voornaam"
                    onChangeText={setVoornaam}
                    value={voornaam}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Achternaam:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Achternaam"
                    onChangeText={setAchternaam}
                    value={achternaam}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>User Type:</Text>
                <Picker
                    selectedValue={user_type}
                    onValueChange={(itemValue) => setUserType(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="Admin" value="ADMIN"/>
                    <Picker.Item label="Docent" value="DOCENT"/>
                    <Picker.Item label="Student" value="STUDENT"/>
                </Picker>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Is Active:</Text>
                <CheckBox
                    value={is_active}
                    onValueChange={setIsActive}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Is Staff:</Text>
                <CheckBox
                    value={is_staff}
                    onValueChange={setIsStaff}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Is Superuser:</Text>
                <CheckBox
                    value={is_superuser}
                    onValueChange={setIsSuperuser}
                />
            </View>
            <Button title="Update" onPress={handleUpdate}/>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        marginRight: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        flex: 1,
    },
});

export default GebruikerEditScreen;