import "./styles.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Footer from '../../components/footer/index';

function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nome === "" || cpf === "" || email === "" || password === "")
      return alert("Preencha todos os campos");

    if (nome && cpf && email && password) {
      await api
        .post("/signup", {
          name: nome,
          cpf: cpf,
          email: email,
          password: password,
        })
        .then(() => {
          alert("Cadastro realizado com sucesso!");
          navigate("/");
        })
        .catch((error) => {
          alert("Erro ao cadastrar");
          console.log(error);
        });
    }
  };

  return (
    <div className="container">
      <form className="form-group" onSubmit={handleSubmit}>
        <img
          src={process.env.PUBLIC_URL + "/assets/brasaoUFT.png"}
          alt="Logo UFT"
        />

        <input
          required={true}
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          required={true}
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <input
          required={true}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required={true}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <button className="login" onClick={() => navigate("/")}>
            Login
          </button>
          <button className="cadastrar">Cadastrar</button>
        </div>
      </form>
      <Footer/>
    </div>
  );
}

export default Cadastro;
