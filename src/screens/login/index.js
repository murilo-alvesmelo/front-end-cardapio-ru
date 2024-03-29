import "./styles.css";
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - Cardápio RU";
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = `${process.env.PUBLIC_URL}../../assets/brasaoUFT.png`;
    }
  }, []);

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
        navigate("/root");
      })
      .catch((error) => {
        console.log(error);
        alert("Email ou senha incorretos");
      });
  };

  return (
    <section className="container">
      <div className="div-login">
        <form className="form-group-login" onSubmit={handleLogin}>
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
              type="button"
              className="cadastrar"
              onClick={() => navigate("/cadastro")}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
