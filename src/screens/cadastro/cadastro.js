import React from 'react';

function Cadastro() {
    return (
        <div className="container">
            <div className="form-group">
                <img src={process.env.PUBLIC_URL + '/assets/brasaoUFT.png'} alt="Logo UFT" />

                <input type="text" placeholder="Nome" />
                <input type="text" placeholder="CPF" />
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

export default Cadastro;
