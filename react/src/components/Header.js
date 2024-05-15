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
    const [profilePic, setProfilePic] = useState(null)

    const laad_profiel_foto = () => {
        const url = '/static/img/profiel1.png'; // Relatief pad naar je afbeelding
        setProfilePic(url);
    };

    useEffect(() => {
        laad_profiel_foto();
    }, []);

    const handleLogout = () => {
        navigation.navigate('Login');
    }
    return (
        <header style={styles.container}>
            <nav>
                <View style={styles.listItem}>
                    <Image source={logoImg} style={styles.logo}/>
                    <Text style={styles.text}>Meldingen</Text>
                    <Text style={styles.text}>Instellingen</Text>
                    <Text style={styles.text}>Profielfoto</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.text}>Uitloggen</Text>
                    </TouchableOpacity>
                    {profilePic !== null && (
                        <Image source={{uri: profilePic}} style={styles.profielfoto}/>
                    )}
                </View>
            </nav>
        </header>
    );
}

export default Header