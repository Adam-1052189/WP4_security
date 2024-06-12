import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';
import Card from './Card';
import CursusItem from './Cursusitem';

const CursusList = ({cursusjaarId}) => {
    const [cursussen, setCursussen] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [domein, setDomein] = useState(''); // Nieuwe state voor het domein

    const [selectedCursusjaar, setSelectedCursusjaar] = useState(null);
    const handleCursusjaarClick = (cursusjaarId) => {
        if (selectedCursusjaar === cursusjaarId) {
            setSelectedCursusjaar(null);
        } else {
            setSelectedCursusjaar(cursusjaarId);
        }
    };

    useEffect(() => {
        const fetchCursussen = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/glitch/cursusjaren/${cursusjaarId}/cursussen/`);
                setCursussen(response.data);
                // Stel hier ook het domein in op basis van de ontvangen data
                
                setDomein(response.data.domein);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCursussen();
    }, [cursusjaarId]);

    const handleClick = () => {
        setShowDetails(!showDetails);
    };

    return (
        <View>
            <Card title="Cursussen" onPress={handleClick} />
            {domein && (
                <Card title={domein} />
            )}
            {showDetails && (
                <View>
                    {cursussen.length > 0 ? (
                        cursussen.map((cursus) => (
                            <CursusItem
                                key={cursus.vak_cursus_id}
                                cursusnaam={cursus.vaknaam}
                            />
                        ))
                    ) : (
                        <Card title="Geen cursussen gevonden." />
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    linkText: {
        textDecorationLine: 'underline',
    },
});

export default CursusList;