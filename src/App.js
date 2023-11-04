import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Root from "./screens/root";
import Cadastro from "./screens/cadastro";
import Login from "./screens/login";
import Home from "./screens/Home";
import Refeicoes from "./screens/refeicoes"
import Listagem from "./screens/listagem";

function App() {
  const PrivateRoutes = () => {
    return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
  };

  useEffect(() => {
    PrivateRoutes();
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/root" element={<Root />}>
            <Route path="" element={<Home />} />
          </Route>
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/refeicoes" element={<Refeicoes />} />
        <Route path="/listagem" element={<Listagem />} />
      </Routes>
    </Router>
  );
}

export default App;
