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
import Refeicoes from "./screens/refeicoes";
import Listagem from "./screens/listagem";
import Navbar from "./components/navbar/index";
import Footer from "./components/footer";

function App() {
  const PrivateRoutes = () => {
    return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
  };

  useEffect(() => {
    PrivateRoutes();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/root" element={<Root />}>
              <Route index element={<Listagem />} />
              <Route path="refeicoes" element={<Refeicoes />} />
              <Route path="refeicoes/:id" element={<Refeicoes />} />
              <Route path="editar-refeicao/:id" element={<Refeicoes isEditing={true} />} />
            </Route>
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
