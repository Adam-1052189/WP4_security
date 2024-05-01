import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";

const logoImg = require("./Images/Glitch_logo.png");

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    contentContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "black",
        marginBottom: 10,
        fontWeight: "bold",
    },
    logo: {
        width: 210,
        height: 100,
    },
});

function Footer() {
    return (
        <footer style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.text}>U bent aan het einde van de pagina gekomen</Text>
                <Image source={logoImg} style={styles.logo}/>
            </View>
        </footer>
    );
}

export default Footer;