import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

function Refeicao() {
    const [refeicao, setRefeicao] = useState(null);
    const { id } = useParams(); // Extrair o id da URL

    useEffect(() => {
        fetch(`http://localhost:5000/cardapio/${id}`)
            .then(response => response.json())
            .then(data => setRefeicao(data))
            .catch(error => console.error('Erro ao buscar dados:', error));
    }, [id]);

    if (!refeicao) {
        return <div>Carregando...</div>; // Mensagem de carregamento
    }

    // Renderizar os detalhes da refeição
    return (
        <div className="refeicao-detalhes">
            <h1>Detalhes da Refeição</h1>
            <p><strong>Data:</strong> {new Date(refeicao.estimateAt).toLocaleDateString('pt-BR')}</p>
            <p><strong>Refeição:</strong> {refeicao.refeicao}</p>
            <p><strong>Salada:</strong> {refeicao.salada}</p>
            <p><strong>Guarnição:</strong> {refeicao.guarnicao}</p>
            <p><strong>Leguminosas:</strong> {refeicao.leguminosas}</p>
            <p><strong>Carboidrato:</strong> {refeicao.carboidrato}</p>
        </div>
    );
}

export default Refeicao;
