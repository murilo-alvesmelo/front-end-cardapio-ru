import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import api from "../../services/api";
import moment from "moment/moment";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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
    document.title = "Listagem - Cardápio RU";
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = `${process.env.PUBLIC_URL}../../assets/brasaoUFT.png`;
    }
  }, []);

  useEffect(() => {
    getCardapio();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/root/refeicoes/${id}`);
  };

  return (
    <section className="container">
      <div className="lista-refeicoes">
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Dia</TableCell>
                <TableCell>Dia da semana</TableCell>
                <TableCell>Prato</TableCell>
                <TableCell>Sobremesa</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {refeicoes.map((refeicao) => (
                <TableRow key={refeicao.id}>
                  <TableCell align="center">{refeicao.id}</TableCell>
                  <TableCell align="center">
                    {moment(refeicao.estimateAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    {moment(refeicao.estimateAt).locale("pt-br").format("dddd")}
                  </TableCell>
                  <TableCell align="center">{refeicao.refeicao}</TableCell>
                  <TableCell align="center">{refeicao.sobremesa}</TableCell>
                  <TableCell align="center">{refeicao.tipo}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      style={{ height: 30 }}
                      endIcon={<EditIcon />}
                      onClick={() => handleRowClick(refeicao.id)}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
}

export default Listagem;
