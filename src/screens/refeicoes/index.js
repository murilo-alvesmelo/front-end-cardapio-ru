import React from 'react';
import './styles.css';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = '/';
  };

  return (
    <header className="header">
        {isLoggedIn && (
          <>
            {/* Botão de Logout */}
            <button onClick={handleLogout} className="logout-variant">
              Logout
            </button>
            {/* Botão para abrir a sidebar */}
            <button className="grip-lines">
              Menu
            </button>
          </>
        )}
    </header>
  );
};

export default Navbar;
