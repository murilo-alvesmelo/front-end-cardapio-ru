import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";
import api from "../../services/api";
import Footer from '../../components/footer/index';

function Refeicao() {
  const [refeicao, setRefeicao] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  async function getRefeicaoId() {
    await api
      .get(`/cardapio/${id}`)
      .then((response) => {
        setRefeicao(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getRefeicaoId();
  }, []);

  // Função para lidar com a exclusão de uma refeição
  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja apagar esta refeição?")) {
      api
        .delete(`/cardapio/${id}`)
        .then((response) => {
          alert("Refeição apagada com sucesso!");
          navigate("/root/listagem");
        })
        .catch((error) => {
          console.log(error);
          alert("Erro ao apagar refeição.");
        });
    }
  };
  const handleEdit = () => {
    navigate(`/root/editar-refeicao/${id}`);
  };

  if (!refeicao) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="refeicao-detalhes">
      <h1>Detalhes da Refeição</h1>
      <p>
        <strong>Data:</strong>{" "}
        {new Date(refeicao.estimateAt).toLocaleDateString("pt-BR")}
      </p>
      <p>
        <strong>Refeição:</strong> {refeicao.refeicao}
      </p>
      <p>
        <strong>Salada:</strong> {refeicao.salada}
      </p>
      <p>
        <strong>Guarnição:</strong> {refeicao.guarnicao}
      </p>
      <p>
        <strong>Leguminosas:</strong> {refeicao.leguminosas}
      </p>
      <p>
        <strong>Carboidrato:</strong> {refeicao.carboidrato}
      </p>

      <button onClick={handleEdit} className="botao-editar">
        Editar
      </button>
      <button onClick={handleDelete} className="botao-apagar">
        Apagar
      </button>
      <Footer/>
    </div>
  );
}

export default Refeicao;
