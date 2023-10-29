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
    if (email === "" || password === "")
      return alert("Preencha todos os campos");

    if (!email.includes("@")) return alert("Email inválido");

    if (email && password) {
      api
        .post("/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem(
            "user",
            JSON.stringify({
              nome: response.data.name,
              email: response.data.email,
            })
          );
          localStorage.setItem("token", response.data.token);
          navigate("/root");
        })
        .catch((error) => {
          alert("Email ou senha incorretos");
          console.log(error);
        });
    }
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
          <button className="cadastrar" onClick={() => navigate("/cadastro")}>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
