import React, { useState } from "react";
import "./styles.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    if (!email.includes("@")) {
      alert("Email inválido");
      return;
    }
    api
      .post("/login", { email, password })
      .then((response) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            nome: response.data.name,
            email: response.data.email,
          })
        );
        localStorage.setItem("token", response.data.token);
        // Navegar para a rota '/root'
        navigate("/root");
      })
      .catch((error) => {
        console.log(error);
        alert("Email ou senha incorretos");
      });
  };

  return (
    <div className="container">
      <form className="form-group" onSubmit={handleLogin}>
        <img
          src={process.env.PUBLIC_URL + "/assets/brasaoUFT.png"}
          alt="Logo UFT"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button className="login" type="submit">
            Login
          </button>
          <button
            type="button" // Isso evita que o botão submeta o formulário
            className="cadastrar"
            onClick={() => navigate("/cadastro")}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
