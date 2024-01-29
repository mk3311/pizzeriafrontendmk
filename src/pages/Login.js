import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/users/login', { username, password });
            console.log('Logged in user:', response.data);
            onLogin(response.data);
            navigate('/');
        } catch (error) {
            console.error('Error during login:', error);
            alert('Błędna nazwa użytkownika lub hasło.');
        }
    };

    return (
        <center>
        <div>
            <h2>Logowanie</h2>
            <label>Username: <input type="text" onChange={(e) => setUsername(e.target.value)} /></label>
            <label>Password: <input type="password" onChange={(e) => setPassword(e.target.value)} /></label>
            <button onClick={handleLogin}>Zaloguj</button>
        </div>
        </center>
    );
};

export default Login;