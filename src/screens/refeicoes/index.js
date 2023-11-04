import React, { useState, useEffect } from 'react';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';

function Refeicoes({ isEditing }) {
    const [form, setForm] = useState({
        refeicao: '',
        salada: '',
        guarnicao: '',
        leguminosas: '',
        carboidrato: '',
        estimateAt: '',
    });
    const navigate = useNavigate();
    const { id } = useParams(); // Usado para identificar a refeição em caso de edição

    useEffect(() => {
        if (isEditing) {
            const fetchData = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('Não autorizado. Faça o login novamente.');
                    navigate('/login');
                } else {
                    try {
                        const response = await fetch(`http://localhost:5000/cardapio/${id}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                        });

                        if (!response.ok) {
                            throw new Error('Erro ao buscar dados!');
                        }

                        const data = await response.json();
                        setForm(data); // Atualiza o estado do formulário com os dados recebidos
                    } catch (error) {
                        console.error('Erro na requisição:', error);
                        alert(error.message);
                    }
                }
            };

            fetchData();
        }
    }, [id, isEditing, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            alert('Não autorizado. Faça o login novamente.');
            navigate('/login');
            return;
        }

        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `http://localhost:5000/cardapio/${id}` : 'http://localhost:5000/cardapio';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) throw new Error('Falha ao salvar dados!');

            alert('Refeição cadastrada com sucesso!');
            navigate('/listagem'); // Modifique esta linha para a rota que deseja redirecionar após a operação
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            alert(error.message || 'Falha ao cadastrar refeição.');
        }
    };

    return (
        <div className="container">
            <div className="header">{isEditing ? 'Editar Refeição' : 'Cadastro de Refeições'}</div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input className="input-field" type="text" name="refeicao" placeholder="Refeição" value={form.refeicao} onChange={handleChange} />
                    <input className="input-field" type="text" name="salada" placeholder="Salada" value={form.salada} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input className="input-field" type="text" name="guarnicao" placeholder="Guarnição" value={form.guarnicao} onChange={handleChange} />
                    <input className="input-field" type="text" name="leguminosas" placeholder="Leguminosas" value={form.leguminosas} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input className="input-field" type="text" name="carboidrato" placeholder="Carboidrato" value={form.carboidrato} onChange={handleChange} />
                    <input className="input-field" type="date" name="estimateAt" value={form.estimateAt} onChange={handleChange} />
                </div>
                <div className="button-group">
                    <button className="button" type="submit">{isEditing ? 'Atualizar' : 'Finalizar'}</button>
                    <button className="button" type="button" onClick={() => navigate(-1)}>Voltar</button>
                </div>
            </form>
        </div>
    );
}

export default Refeicoes;