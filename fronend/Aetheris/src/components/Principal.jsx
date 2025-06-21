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
        
        <div className="navbar-logo-combo">
        
          <img src="/fumada.png" alt="Logo personaje" className="navbar-logo-image" />        
        </div>

          
          <div className="dropdown">
            <button className="navbar-button" onClick={toggleDropdown}>
              Funciones ▾
            
            </button>
            {showDropdown && (

              <div className="dropdown-menu">
                <a href="/List" className="dropdown-link">ListadosUsuario</a>
                <a href="/registroFacturas" className="dropdown-link">RegistroFacturas</a>
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
    
        <p className="main-description">
          En Aetheris, cada producto es una obra maestra de elegancia y funcionalidad.
          Desde la delicada artesanía de nuestros accesorios hasta la sofisticación de nuestros dispositivos, 
          cada artículo está diseñado para elevar tu experiencia diaria.
          Descubre un mundo donde la calidad y el estilo se encuentran en perfecta armonía.
          que no se note que es una pagina de prueba, que se vea como una pagina de ventas profesional.
          codigo npi de donde me salio, pero que se vea bien. la minita de logo no me lo hizo una ia :v
        </p>
        <div>
          no se we no se me ocurrio nada mas que poner esto, pero que se vea bien
        </div>
        <div>
          si se les ocurre algo mas que poner, pues lo ponen, pero que se vea bien
        </div>
      </main>

    
    </div>
  );
};

export default Principal;
