import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './styles.css';

function Listagem() {
    const [refeicoes, setRefeicoes] = useState([]);
    const navigate = useNavigate(); // Inicializar useNavigate

    useEffect(() => {
        fetch('http://localhost:5000/cardapio')
        .then(response => response.json())
        .then(data => setRefeicoes(data))
        .catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

    // Função para lidar com o clique na linha da tabela
    const handleRowClick = (id) => {
        navigate(`/refeicao/${id}`); // Usar a função navigate para redirecionar
    };

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
                        // Adicionando o evento onClick para cada linha da tabela
                        <tr key={refeicao.id} onClick={() => handleRowClick(refeicao.id)} style={{ cursor: 'pointer' }}>
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
