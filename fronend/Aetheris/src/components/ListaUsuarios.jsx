import React, { useEffect, useState } from 'react';
import { getUsuarios, eliminarUsuario } from '../api/usuarioApi';
import './ListaUsuario.css';
import { useNavigate } from 'react-router-dom';
import ModalEditarUsuario from './ModalEditarUsuario';

const ListaUsuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [idEditar, setIdEditar] = useState(null);

  const cargarUsuarios = async () => {
    const datos = await getUsuarios();
    setUsuarios(datos);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div className="contenedor-usuarios">
      <h2>Lista de Usuarios</h2>

      <button className='volver-simple' onClick={() => navigate('/')}>
        ← Volver al Inicio
      </button>

      <button className='elegant-bttn' onClick={() => navigate('/agregar')}>
        Agregar Usuario
      </button>


      <div className="grid-usuarios">
        {usuarios.map((u, index) => (
          <div className="tarjeta-usuario" key={u.id}>
            <h3>{u.nombre}</h3>
            <p><strong>ID:</strong> {index + 1}</p>
            <p><strong>Edad:</strong> {u.edad} años</p>

            <button className='eliminar-bttn' onClick={async () => {
              if (window.confirm(`¿Eliminar a ${u.nombre}?`)) {
                await eliminarUsuario(u.id);
                setUsuarios(usuarios.filter(usuario => usuario.id !== u.id));
              }
            }}>
              Eliminar
            </button>

            <button className='editar-bttn' onClick={() => setIdEditar(u.id)}>
              Editar
            </button>
          </div>
        ))}
      </div>

      {idEditar && (
        <ModalEditarUsuario
          id={idEditar}
          onClose={() => setIdEditar(null)}
          onEditado={cargarUsuarios}
        />
      )}
    </div>
  );
};

export default ListaUsuarios;
