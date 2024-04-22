import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Inloggen met gebruikersnaam: ${username} en wachtwoord: ${password}`);
    };

    return (
        <div>
            <h2>Inloggen</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Gebruikersnaam:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Wachtwoord:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Inloggen</button>
            </form>
        </div>
    );
}

export default Login;