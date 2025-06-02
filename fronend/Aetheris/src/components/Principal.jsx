import React, { useState } from 'react';
import './Principal.css';

const Principal = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="principal-container">
      
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo">Aetheris</div>
          
          <div className="dropdown">
            <button className="navbar-button" onClick={toggleDropdown}>
              Funciones ▾
            
            </button>
            {showDropdown && (

              <div className="dropdown-menu">
                <a href="/List" className="dropdown-link">ListadosUsuario</a>
                <a href="#" className="dropdown-link">Estadísticas</a>
                <a href="#" className="dropdown-link">Configuración</a>
              </div>
            )}
          </div>
        </div>

        <ul className="navbar-links">
          <li className="navbar-item">
            <a className="navbar-button" href="">Login</a>
            <a className="navbar-button" href="">Register</a>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <h1 className="main-title">Aetheris</h1>
        <p className="main-subtitle">Donde lo esencial resplandece en cada detalle.</p>
      </main>
    
    </div>
  );
};

export default Principal;
