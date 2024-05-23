import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CursusList from './CursusList';

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
        <div>
            <h2 onClick={handleClick}>{domeinnaam}</h2>
            {showDetails && (
                <div>
                    <h3>Cursusjaren:</h3>
                    {cursusjaren.length > 0 ? (
                        cursusjaren.map((cursusjaar) => (
                            <p key={cursusjaar.cursusjaar}
                               onClick={() => handleCursusjaarClick(cursusjaar.cursusjaar)}>{cursusjaar.cursusjaar}</p>
                        ))
                    ) : (
                        <p>Geen cursusjaren gevonden.</p>
                    )}
                    {SelectedCursusjaar && (
                        <CursusList cursusjaarId={SelectedCursusjaar}/>
                    )}
                </div>
            )}
        </div>
    );
}

DomeinItem.propTypes = {
    domeinnaam: PropTypes.string.isRequired,
    domein_id: PropTypes.string.isRequired,
};

export default DomeinItem;