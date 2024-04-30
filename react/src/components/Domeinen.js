import React, { useEffect, useState } from "react";

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
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <div>
      <h2>Domeinen</h2>
      {domeinen.map((domein, index) => (
        <div key={index}>
          <h3>{domein.domeinnaam}</h3>
        </div>
      ))}
    </div>
  );
}

export default Domeinen;