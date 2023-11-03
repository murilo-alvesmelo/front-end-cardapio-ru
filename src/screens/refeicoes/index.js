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
        tipoRefeicao: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/your_endpoint_here', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    };

    return (
        <div className="container">
            <div className="header">Cadastro de Refeições</div>
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
                <label> Tipo de Refeição: </label>
                <select name="tipoRefeicao" value={form.tipoRefeicao} onChange={handleChange} className="input-field">
                    <option value="" disabled selected>Selecione uma opção</option>
                    <option value="Almoço">Almoço</option>
                    <option value="Jantar">Jantar</option>
                </select>
            </div>
            <div className="button-group">
                <button className="button" onClick={handleSubmit}>Finalizar</button>
                <button className="button">Voltar</button>
            </div>
        </div>
    );
}

export default Refeicoes;
