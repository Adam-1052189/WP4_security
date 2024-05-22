import React, {useEffect, useState} from "react";
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
        <div>
            <h2>Domeinen</h2>
            <ul>
                {domeinen.map((item) => (
                    <DomeinItem
                        key={item.domein_id}
                        domeinnaam={item.domeinnaam}
                        domein_id={item.domein_id}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Domeinen;