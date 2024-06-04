import React, {useState, useEffect} from "react"
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native"
import {useNavigation} from '@react-navigation/native'

const logoImg = require("./Images/Glitch_logo.png");

const styles = StyleSheet.create({
    listItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    text: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
    logo: {
        width: 150,
        height:75,
    },
    profielfoto: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
});

function Header() {
    const navigation = useNavigation();
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        const laad_profiel_foto = async () => {
            try {
                const response = await fetch('http://localhost:8000/glitch/gebruikers/');
                const data = await response.json();
                const users = JSON.parse(data)
                console.log('Profielfoto data:', data); // Controleer of de response correct is
                console.log('Profielfoto data:', users); // Controleer of de response correct is
                if (users.length > 0 && users[0].fields.profielfoto) {
                    const profilePicUrl = `http://localhost:8000/${users[0].fields.profielfoto}`;
                    console.log('Profielfoto URL:', profilePicUrl);
                    setProfilePic(profilePicUrl);
                }
            } catch (error) {
                console.error('Error fetching profile picture:', error);
            }
        };
        laad_profiel_foto();
    }, []);

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    return (
        <Header style={styles.container}>
                <View style={styles.listItem}>
                    <Image source={logoImg} style={styles.logo}/>
                    <Text style={styles.text}>Meldingen</Text>
                    <Text style={styles.text}>Instellingen</Text>
                    <Text style={styles.text}>Profielfoto</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.text}>Uitloggen</Text>
                    </TouchableOpacity>
                    {profilePic && (
                        <Image source={{uri: profilePic}} style={styles.profielfoto}/>
                    )}
                </View>
        </Header>
    );
}

export default Header