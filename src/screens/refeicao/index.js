import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

function Refeicao() {
    const [refeicao, setRefeicao] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/cardapio/${id}`)
            .then(response => response.json())
            .then(data => setRefeicao(data))
            .catch(error => console.error('Erro ao buscar dados:', error));
    }, [id]);

    // Função para lidar com a exclusão de uma refeição
    const handleDelete = () => {
        if(window.confirm('Tem certeza que deseja apagar esta refeição?')) {
            const token = localStorage.getItem('token'); // Obter o token do localStorage
    
            if (!token) {
                alert('Não autorizado. Faça o login novamente.');
                navigate('/login');
                return;
            }
    
            fetch(`http://localhost:5000/cardapio/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}` // Incluir o token de autenticação no cabeçalho
                },
            })
            .then(response => {
                if(response.ok) {
                    alert('Refeição apagada com sucesso.');
                    navigate('/listagem'); // Redireciona para a página inicial ou lista de refeições
                } else {
                    // Aqui podemos extrair o erro da mesma forma que fazemos no cadastro
                    response.json().then(errorData => {
                        alert(errorData.message || 'Não foi possível apagar a refeição.');
                    });
                }
            })
            .catch(error => console.error('Erro ao apagar refeição:', error));
        }
    };
    const handleEdit = () => {
        navigate(`/editar-refeicao/${id}`);
    };
    

    if (!refeicao) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="refeicao-detalhes">
            <h1>Detalhes da Refeição</h1>
            <p><strong>Data:</strong> {new Date(refeicao.estimateAt).toLocaleDateString('pt-BR')}</p>
            <p><strong>Refeição:</strong> {refeicao.refeicao}</p>
            <p><strong>Salada:</strong> {refeicao.salada}</p>
            <p><strong>Guarnição:</strong> {refeicao.guarnicao}</p>
            <p><strong>Leguminosas:</strong> {refeicao.leguminosas}</p>
            <p><strong>Carboidrato:</strong> {refeicao.carboidrato}</p>

            <button onClick={handleEdit} className="botao-editar">Editar</button>
            <button onClick={handleDelete} className="botao-apagar">Apagar</button>
        </div>
    );
}

export default Refeicao;
