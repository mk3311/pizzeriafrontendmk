import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://pizzeriabackend-pizzeriabackendmk.azuremicroservices.io/api/users/register', { username, password });
            console.log('Registered user:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Użytkownik o podanej nazwie już istnieje. Proszę wybrać inną nazwę.');
        }
    };

    return (
        <center>
        <div>
            <h2>Rejestracja</h2>
            <label>Username: <input type="text" onChange={(e) => setUsername(e.target.value)} /></label>
            <label>Password: <input type="password" onChange={(e) => setPassword(e.target.value)} /></label>
            <button onClick={handleRegister}>Zarejestruj</button>
        </div>
        </center>
    );
};

export default Register;