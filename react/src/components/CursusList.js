import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const CursusList = ({ cursusjaarId }) => {
    const [cursussen, setCursussen] = useState([]);
    const [showDetails, setShowDetails] = useState(false);

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
            <TouchableOpacity onPress={handleClick}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cursussen:</Text>
            </TouchableOpacity>
            {showDetails && (
                <View>
                    {cursussen.length > 0 ? (
                        cursussen.map((cursus) => (
                            <Text key={cursus.vak_cursus_id}>{cursus.vaknaam}</Text>
                        ))
                    ) : (
                        <Text>Geen cursussen gevonden.</Text>
                    )}
                </View>
            )}
        </View>
    );
};

export default CursusList;