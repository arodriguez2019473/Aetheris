import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ListaUsuarios from './components/ListaUsuarios.jsx';
import AgregarUsuario from './components/AgregarUsuario.jsx';
import Principal from './components/Principal.jsx';
import EditarUsuario from './components/EditarUsuario.jsx';
import ListaFacturas from './components/RegistroFacturas/ListaFacturas.jsx';
import AgregarRegistroFacturas from './components/RegistroFacturas/AgregarRegistroFacturas.jsx';
// import ModalRegistroFacturas from './components/RegistroFacturas/ModalRegistrofacturas.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/List" element={<ListaUsuarios />} />
      <Route path="/agregar" element={<AgregarUsuario />} />
      <Route path="/editar/:id" element={<EditarUsuario />} />
      <Route path="/registroFacturas" element={<ListaFacturas />} />
      <Route path="/RegistroFacAgregar" element={<AgregarRegistroFacturas />} />
      {/* <Route path="/factura/:id" element={<ModalRegistroFacturas />} /> */}

    </Routes>
  </BrowserRouter>
);
