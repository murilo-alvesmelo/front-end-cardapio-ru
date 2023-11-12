import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CachedIcon from "@mui/icons-material/Cached";
import Restaurant from "@mui/icons-material/Restaurant";
import api from "../../services/api";
import "./styles.css";

function Refeicoes() {
  const [form, setForm] = useState({
    refeicao: "",
    salada: "",
    guarnicao: "",
    leguminosas: "",
    carboidrato: "",
    estimateAt: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api
        .get(`/cardapio/${id}`)
        .then((response) => {
          const formattedDate = response.data.estimateAt.split("T")[0];
          setForm({ ...response.data, estimateAt: formattedDate });
          setIsEditing(false);
        })
        .catch((error) => {
          console.error("Erro na requisição:", error);
        });
    } else {
      setIsEditing(true);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || isEditing) {
      const method = id ? api.put : api.post;
      const url = id ? `/cardapio/${id}` : "/cardapio";

      await method(url, form)
        .then(() => {
          const message = id
            ? "Refeição atualizada com sucesso!"
            : "Refeição cadastrada com sucesso!";
          alert(message);
          navigate("/root/");
        })
        .catch((error) => {
          console.error(error);
          alert("Erro ao salvar refeição.");
        });
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja apagar esta refeição?"
    );
    if (confirmDelete && id) {
      try {
        await api.delete(`/cardapio/${id}`);
        alert("Refeição apagada com sucesso!");
        navigate("/root");
      } catch (error) {
        console.error(error);
        alert("Erro ao apagar refeição.");
      }
    }
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const getTitle = () => {
    if (id && isEditing) {
      return "Editar Refeição";
    } else if (id) {
      return "Visualizar Refeição";
    } else {
      return "Cadastro de Refeições";
    }
  };

  return (
    <section className="container">
      <div className="div-refeicoes">
        <h2>{getTitle()}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <CalendarMonth className="input-icon" />
            <label htmlFor="estimateAt" className="input-label">
              Data
            </label>
            <input
              className="input-field"
              type="date"
              id="estimateAt"
              name="estimateAt"
              value={form.estimateAt}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <Restaurant className="input-icon" />
            <label htmlFor="refeicao" className="input-label">
              Refeição
            </label>
            <input
              className="input-field"
              type="text"
              id="refeicao"
              name="refeicao"
              placeholder="Digite o nome da refeição"
              value={form.refeicao}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <Restaurant className="input-icon" />
            <label htmlFor="salada" className="input-label">
              Salada
            </label>
            <input
              className="input-field"
              type="text"
              id="salada"
              name="salada"
              placeholder="Digite a salada"
              value={form.salada}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <Restaurant className="input-icon" />
            <label htmlFor="guarnicao" className="input-label">
              Guarnição
            </label>
            <input
              className="input-field"
              type="text"
              id="guarnicao"
              name="guarnicao"
              placeholder="Digite a guarnição"
              value={form.guarnicao}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <Restaurant className="input-icon" />
            <label htmlFor="leguminosas" className="input-label">
              Leguminosas
            </label>
            <input
              className="input-field"
              type="text"
              id="leguminosas"
              name="leguminosas"
              placeholder="Digite as leguminosas"
              value={form.leguminosas}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <Restaurant className="input-icon" />
            <label htmlFor="carboidrato" className="input-label">
              Carboidrato
            </label>
            <input
              className="input-field"
              type="text"
              id="carboidrato"
              name="carboidrato"
              placeholder="Digite o carboidrato"
              value={form.carboidrato}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="button-group">
            <div className="div-button">
              <button
                className="button"
                type="button"
                onClick={() => navigate("/root")}
              >
                <ArrowBackIcon className="icone-voltar" />
              </button>
              {!id && (
                <button className="button" type="submit">
                  Salvar
                </button>
              )}
              {id && !isEditing && (
                <button
                  className="button"
                  type="button"
                  onClick={toggleEditing}
                >
                  <EditIcon />
                  Editar
                </button>
              )}
              {id && isEditing && (
                <button className="button" type="submit">
                  <CachedIcon />
                  Atualizar
                </button>
              )}
              {id && !isEditing && (
                <button
                  className="button button-delete"
                  type="button"
                  onClick={handleDelete}
                >
                  <DeleteIcon /> Apagar
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Refeicoes;
