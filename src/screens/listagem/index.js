import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./styles.css";
import api from "../../services/api";
import moment from "moment/moment";

function Listagem() {
  const [refeicoes, setRefeicoes] = useState([]);
  const navigate = useNavigate(); 

  async function getCardapio() {
    const maxDate = moment().add({ days: 30 }).format("YYYY-MM-DD 23:59:59");
    await api
      .get(`/cardapio?date=${maxDate}`)
      .then((response) => {
        setRefeicoes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getCardapio();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/root/refeicoes/${id}`); 
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
          {refeicoes.map((refeicao) => (
            <tr
              key={refeicao.id}
              onClick={() => handleRowClick(refeicao.id)}
              style={{ cursor: "pointer" }}
            >
              <td>
                {new Date(refeicao.estimateAt).toLocaleDateString("pt-BR")}
              </td>
              <td>
                {new Date(refeicao.estimateAt).toLocaleDateString("pt-BR", {
                  weekday: "long",
                })}
              </td>
              <td>{refeicao.refeicao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listagem;
