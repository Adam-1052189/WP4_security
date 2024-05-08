import React from "react"
import {View, Text, Image, StyleSheet} from "react-native"

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
});

function Header() {
    return (
        <header style={styles.container}>
            <nav>
                <View style={styles.listItem}>
                    <Image source={logoImg} style={styles.logo}/>
                    <Text style={styles.text}>Meldingen</Text>
                    <Text style={styles.text}>Instellingen</Text>
                    <Text style={styles.text}>Profielfoto</Text>
                </View>
            </nav>
        </header>
    );
}

export default Header