import React from 'react';
import './styles.css';

function Login() {
    return (
        <div className="container">
            <div className="form-group">
                <img src={process.env.PUBLIC_URL + '/assets/brasaoUFT.png'} alt="Logo UFT" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Senha" />
                <div>
                    <button className="login">Login</button>
                    <button className="cadastrar">Cadastrar</button>
                </div>
            </div>

        </div>
    );
}

export default Login;