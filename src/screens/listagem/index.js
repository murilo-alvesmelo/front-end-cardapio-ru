import React, { useState, useEffect } from 'react';
import './styles.css';

function Listagem() {
    const [refeicoes, setRefeicoes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/cardapio')
        .then(response => response.json())
        .then(data => setRefeicoes(data))
        .catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    return (
        <div className="lista-refeicoes">
            <h1>Listagem de Refeições</h1>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Dia</th>
                        <th>Prato</th>
                    </tr>
                </thead>
                <tbody>
                    {refeicoes.map(refeicao => (
                    <tr key={refeicao.id}>
                        <td>{new Date(refeicao.estimateAt).toLocaleDateString('pt-BR')}</td>
                        <td>{new Date(refeicao.estimateAt).toLocaleDateString('pt-BR', { weekday: 'long' })}</td>
                        <td>{refeicao.refeicao}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Listagem;
