import React from "react";
import { Text, View } from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Domeinen from "../components/Domeinen";

function StudentDashboard() {
    return (
        <View>
            <Header />
                <View>
                    <Text>hier komt te staan welkom naam gebruiker</Text>
                    <Text>hier staan de vakken</Text>
                    <Domeinen />
                </View>
            <Footer />
        </View>
    )
}

export default StudentDashboard;