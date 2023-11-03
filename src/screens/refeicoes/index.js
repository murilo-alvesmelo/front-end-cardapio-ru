import React, { useState } from 'react';
import './styles.css';

function Refeicoes() {
    const [form, setForm] = useState({
        refeicao: '',
        salada: '',
        guarnicao: '',
        leguminosas: '',
        carboidrato: '',
        estimateAt: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Isso impede que o navegador recarregue a página ao enviar o formulário

        try {
            const response = await fetch('http://localhost:5000/your_endpoint_here', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar dados!');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    };

    return (
        <div className="container">
            <div className="header">Cadastro de Refeições</div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input className="input-field" type="text" name="refeicao" placeholder="Refeição" onChange={handleChange} />
                    <input className="input-field" type="text" name="salada" placeholder="Salada" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input className="input-field" type="text" name="guarnicao" placeholder="Guarnição" onChange={handleChange} />
                    <input className="input-field" type="text" name="leguminosas" placeholder="Leguminosas" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <input className="input-field" type="text" name="carboidrato" placeholder="Carboidrato" onChange={handleChange} />
                    <input className="input-field" type="date" name="estimateAt" onChange={handleChange} />
                </div>
                <div className="button-group">
                    <button className="button" type="submit">Finalizar</button>
                    <button className="button" type="button">Voltar</button> 
                    {/* Adicionado type="button" para evitar que este botão tente enviar o formulário */}
                </div>
            </form>
        </div>
    );
}

export default Refeicoes;
