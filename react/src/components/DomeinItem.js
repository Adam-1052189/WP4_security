import React, {useState, useEffect} from 'react';
import axios from 'axios';


function DomeinItem({domein}) {
    const [showDetails, setShowDetails] = useState(false);
    const [cursusjaren, setCursusjaren] = useState([]);

    const handleClick = async () => {
        if (!showDetails && domein && domein.domein_id) {
            const response = await axios.get(`http://localhost:8000/glitch/cursusjaren/${domein.domein_id}/`);
            console.log(response.data);
            setCursusjaren(response.data);
        }
        setShowDetails(!showDetails);
    };
    return (
    <div>
        <h2 onClick={handleClick}>{domein.domeinnaam}</h2>
        {showDetails && (
            <div>
                <h3>Cursusjaren:</h3>
                {cursusjaren.length > 0 ? (
                    cursusjaren.map((cursusjaar) => (
                        <p key={cursusjaar.cursusjaar_id}>{cursusjaar.cursusjaar}</p>
                    ))
                ) : (
                    <p>Geen cursusjaren gevonden.</p>
                )}
            </div>
        )}
    </div>
);
}

export default DomeinItem;


