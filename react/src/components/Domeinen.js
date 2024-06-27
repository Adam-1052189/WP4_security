import React, {useEffect, useState} from "react";
import { Text, View } from 'react-native';
import DomeinItem from "./DomeinItem";

function Domeinen() {
    const [domeinen, setDomeinen] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/glitch/domeinen/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setDomeinen(data);
                console.log('setDomeinen:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <View>
            <Text>Domeinen</Text>
            {domeinen.map((item) => (
                <DomeinItem
                    key={item.domein_id}
                    domeinnaam={item.domeinnaam}
                    domein_id={item.domein_id.toString()}
                />
            ))}
        </View>
    );
}

export default Domeinen;