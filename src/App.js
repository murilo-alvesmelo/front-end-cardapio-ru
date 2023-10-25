import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Root from "./screens/root";
import Cadastro from "./screens/cadastro";
import Login from "./screens/login";

function App() {
  const PrivateRoutes = () => {
    return <Outlet />;
  };
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/root" element={<Root />}>
            {/* <Route path="cadastro" element={<Cadastro />} /> */}
          </Route>
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
