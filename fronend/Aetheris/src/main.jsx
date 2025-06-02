import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ListaUsuarios from './components/ListaUsuarios.jsx';
import AgregarUsuario from './components/AgregarUsuario.jsx';
import Principal from './components/Principal.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/List" element={<ListaUsuarios />} />
      <Route path="/agregar" element={<AgregarUsuario />} />
    </Routes>
  </BrowserRouter>
);
