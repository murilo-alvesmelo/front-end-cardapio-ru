import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function Refeicoes() {
    const [form, setForm] = useState({
        refeicao: '',
        salada: '',
        guarnicao: '',
        leguminosas: '',
        carboidrato: '',
        estimateAt: '',
    });
    const navigate = useNavigate();

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
    
        try {
            const response = await fetch('http://localhost:5000/cardapio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(form),
            });
    
            // A resposta não é OK e também não é JSON válido
            if (!response.ok) {
                if (response.headers.get('Content-Type')?.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao salvar dados!');
                } else {
                    // Lidar com respostas não-JSON
                    const errorText = await response.text();
                    throw new Error(errorText || 'Erro desconhecido ocorreu!');
                }
            }
    
            // Se a resposta for OK, mas sem conteúdo.
            if (response.status === 204) {
                alert('Refeição cadastrada com sucesso!');
                navigate('/listagem');
                return;
            }
    
            // Somente analisar como JSON se a resposta tiver conteúdo
            const data = await response.json();
            console.log(data);
            alert('Refeição cadastrada com sucesso!');
            navigate('/rota-apos-cadastro');
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            alert(error.message || 'Falha ao cadastrar refeição.');
        }
    };
    
    return (
        <div className="container">
            <div className="header">Cadastro de Refeições</div>
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
                    <button className="button" type="submit">Finalizar</button>
                    <button className="button" type="button" onClick={() => navigate(-1)}>Voltar</button>
                </div>
            </form>
        </div>
    );
}

export default Refeicoes;
