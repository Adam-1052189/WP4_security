import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


function DomeinItem({domeinnaam, domein_id}) {
    const [showDetails, setShowDetails] = useState(false);
    const [cursusjaren, setCursusjaren] = useState([]);

    const handleClick = async () => {
        if (!showDetails && domein_id) {
            try {
                const response = await axios.get(`http://localhost:8000/glitch/cursusjaren/${domein_id}/`);
                console.log(response.data);
                setCursusjaren(response.data);
            } catch (error) {
                console.error('Error fetching cursusjaren:', error);
            }
        }
        setShowDetails(!showDetails);
    };
    
    return (
        <div>
            <h2 onClick={handleClick}>{domeinnaam}</h2>
            {showDetails && (
                <div>
                    <h3>Cursusjaren:</h3>
                    {cursusjaren.length > 0 ? (
                        cursusjaren.map((cursusjaar) => (
                            <p key={cursusjaar.cursusjaar}>{cursusjaar.cursusjaar}</p>
                        ))
                    ) : (
                        <p>Geen cursusjaren gevonden.</p>
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


