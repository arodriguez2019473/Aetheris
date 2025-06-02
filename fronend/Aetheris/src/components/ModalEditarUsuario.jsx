import React, { useEffect, useState } from 'react';
import { getUsuario, editarUsuario } from '../api/usuarioApi'; // usa getUsuario
import './EditarUsuario.css';

const ModalEditarUsuario = ({ id, onClose, onEditado }) => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const usuario = await getUsuario(id); // aquí también
        if (usuario) {
          setNombre(usuario.nombre);
          setEdad(usuario.edad);
        } else {
          setMensaje("No se encontró el usuario");
        }
      } catch (error) {
        setMensaje("Error al cargar el usuario");
      }
    };
    if (id) cargar();
  }, [id]);

  // ... resto igual

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || isNaN(edad) || edad <= 0) {
      setMensaje("Datos inválidos.");
      return;
    }

    setCargando(true);
    try {
      await editarUsuario(id, { nombre, edad: parseInt(edad) });
      setMensaje("Usuario actualizado ✅");
      onEditado();
      onClose();
    } catch (err) {
      setMensaje("Error al actualizar ❌");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal-fondo">
      <div className="modal-contenedor">
        <button className="modal-cerrar" onClick={onClose}>✖</button>
        <h2>Editar Usuario</h2>
        <form onSubmit={manejarEnvio} className="modal-formulario">
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

          <label>Edad</label>
          <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />

          <button type="submit" disabled={cargando}>
            {cargando ? "Guardando..." : "Guardar Cambios"}
          </button>

          {mensaje && <p className="modal-mensaje">{mensaje}</p>}
        </form>

      </div>
    </div>
  );
};

export default ModalEditarUsuario;
