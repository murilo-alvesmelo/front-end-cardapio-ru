import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function Refeicoes({ isEditing }) {
  const [form, setForm] = useState({
    refeicao: "",
    salada: "",
    guarnicao: "",
    leguminosas: "",
    carboidrato: "",
    estimateAt: "",
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Usado para identificar a refeição em caso de edição

  useEffect(() => {
    if (isEditing) {
      api
        .get(`/cardapio/${id}`)
        .then((response) => {
          setForm(response.data);
        })
        .catch((error) => {
          console.error("Erro na requisição:", error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? api.put : api.post;
    const url = isEditing ? `/cardapio/${id}` : "/cardapio";

    await method(url, form)
      .then((response) => {
        alert("Refeição cadastrada com sucesso!");
        navigate("/root/listagem");
      })
      .catch((error) => {
        console.log(error);
        alert("Erro ao cadastrar refeição.");
      });
  };

  return (
    <div className="container">
      <div className="header">
        {isEditing ? "Editar Refeição" : "Cadastro de Refeições"}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="input-field"
            type="text"
            name="refeicao"
            placeholder="Refeição"
            value={form.refeicao}
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="text"
            name="salada"
            placeholder="Salada"
            value={form.salada}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="input-field"
            type="text"
            name="guarnicao"
            placeholder="Guarnição"
            value={form.guarnicao}
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="text"
            name="leguminosas"
            placeholder="Leguminosas"
            value={form.leguminosas}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            className="input-field"
            type="text"
            name="carboidrato"
            placeholder="Carboidrato"
            value={form.carboidrato}
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="date"
            name="estimateAt"
            value={form.estimateAt}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button className="button" type="submit">
            {isEditing ? "Atualizar" : "Finalizar"}
          </button>
          <button className="button" type="button" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Refeicoes;
