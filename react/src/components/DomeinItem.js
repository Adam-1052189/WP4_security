import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native'; // Voeg StyleSheet toe
import axios from 'axios';
import PropTypes from 'prop-types';
import CursusList from './CursusList';
import Card from './Card';

function DomeinItem({domeinnaam, domein_id}) {
    const [showDetails, setShowDetails] = useState(false);
    const [cursusjaren, setCursusjaren] = useState([]);
    const [SelectedCursusjaar, setSelectedCursusjaar] = useState(null);

    const handleClick = async () => {
        if (!showDetails && domein_id) {
            try {
                const response = await axios.get(`http://localhost:8000/glitch/cursusjaren/${domein_id}/`);
                setCursusjaren(response.data);
            } catch (error) {
                console.error('Error fetching cursusjaren:', error);
            }
        }
        setShowDetails(!showDetails);
    };

    const handleCursusjaarClick = (cursusjaarId) => {
        setSelectedCursusjaar(cursusjaarId);
    };

    return (
        <View>
            <Card title={domeinnaam} onPress={handleClick} />
            {showDetails && (
                <View>
                    <Text>Cursusjaren:</Text>
                    {cursusjaren.length > 0 ? (
                        cursusjaren.map((cursusjaar) => (
                            <Card
                                key={cursusjaar.cursusjaar}
                                title={`Cursusjaar: ${cursusjaar.cursusjaar}`}
                                onPress={() => handleCursusjaarClick(cursusjaar.cursusjaar)}
                            />
                        ))
                    ) : (
                        <Text>Geen cursusjaren gevonden.</Text>
                    )}
                    {SelectedCursusjaar && (
                        <CursusList cursusjaarId={SelectedCursusjaar}/>
                    )}
                </View>
            )}
        </View>
    );
}



DomeinItem.propTypes = {
    domeinnaam: PropTypes.string.isRequired,
    domein_id: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({ // Voeg deze stijl toe
    linkText: {
        textDecorationLine: 'underline',
    },
});

export default DomeinItem;