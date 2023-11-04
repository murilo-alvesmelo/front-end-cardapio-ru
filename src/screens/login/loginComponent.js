// LoginComponent.js
import React, { useState } from 'react';
import axios from 'axios';

function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username: username,
                password: password
            });

            if (response.data && response.data.token) {
                // Salvar o token no localStorage
                localStorage.setItem('token', response.data.token); // Use a mesma chave que você usa no index.js para consistência
            }
        } catch (error) {
            console.error('Erro ao efetuar login:', error);
        }
    }

    return (
        <div>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuário" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginComponent;
