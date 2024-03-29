import "./styles.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import React, { useState, useEffect } from "react";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cadastro - Cardápio RU";
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = `${process.env.PUBLIC_URL}../../assets/brasaoUFT.png`;
    }
  }, []);

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
    <section className="container">
      <div className="div-cadastro">
        <form className="form-group-login" onSubmit={handleSubmit}>
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
      </div>
    </section>
  );
}

export default Cadastro;
