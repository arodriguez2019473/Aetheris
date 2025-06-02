import React, { useState, useEffect } from "react";
import { getUsuarios, editarUsuario } from "../api/usuarioApi";
import './EditarUsuario.css';
import { useParams, useNavigate } from "react-router-dom";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const usuario = await getUsuario(id);
        setNombre(usuario.nombre);
        setEdad(usuario.edad);
      } catch (error) {
        setMensaje("Error al cargar el usuario.");
      }
    };
    if (id) cargarUsuario();
  }, [id]);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || isNaN(edad) || edad <= 0) {
      setMensaje("Por favor, proporciona datos válidos.");
      return;
    }

    setCargando(true);
    try {
      await editarUsuario(id, { nombre, edad: parseInt(edad) });
      setMensaje("Usuario actualizado correctamente ✅");
      setTimeout(() => navigate("/List"), 1500);
    } catch (error) {
      setMensaje("Error al actualizar el usuario ❌");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="editar-contenedor">
        <button className="volver-simple" onClick={() => window.location.href = '/List'}>
            ← Volver a lista
        </button>
      <div className="editar-formulario">
        <h2>Editar Usuario</h2>
        <form onSubmit={manejarEnvio}>
          <input
            type="text"
            value={nombre}
            placeholder="Nombre"
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="number"
            value={edad}
            placeholder="Edad"
            onChange={(e) => setEdad(e.target.value)}
          />
          <button type="submit" disabled={cargando}>
            {cargando ? "Guardando..." : "Guardar Cambios"}
          </button>
        </form>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>

      <div className="editar-preview">
        <h3>Vista Previa</h3>
        <div className="carta-preview">
          <h4>{nombre || 'Nombre del usuario'}</h4>
          <p>Edad: {edad || '--'}</p>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuario;

