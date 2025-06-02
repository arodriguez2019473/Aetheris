import React, { useState } from 'react';
import { crearUsuario } from '../api/usuarioApi';
import './AgregarUsuario.css';

const AgregarUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);

    const manejarEnvio = async (e) => {
        e.preventDefault();

        if (!nombre.trim() || isNaN(edad) || edad <= 0) {
            setMensaje("Por favor, ingresa un nombre válido y una edad mayor a 0");
            return;
        }

        try {
            setCargando(true);
            await crearUsuario({ nombre, edad: parseInt(edad) });
            setMensaje("Usuario agregado correctamente 🎉");
            setNombre('');
            setEdad('');
        } catch (error) {
            setMensaje("Error al agregar el usuario 😢");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="contenedor-agregar-usuario">
            <div className="vista-previa">
                <div className="carta-previa">
                    <h3>{nombre || 'Nombre del usuario'}</h3>
                    <p>Edad: {edad || '--'}</p>
                    {cargando && <div className="cargando-texto">Creando usuario...</div>}
                </div>
            </div>

            <div className="formulario-derecha">
                <button className="volver-simple" onClick={() => window.location.href = '/List'}>
                    ← Volver a lista
                </button>

                <h2>Agregar Usuario</h2>
                <form onSubmit={manejarEnvio} className="formulario-estilizado">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Edad"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                    />
                    <button type="submit" disabled={cargando}>
                        {cargando ? "Agregando..." : "Agregar"}
                    </button>
                </form>
                {mensaje && <p className="mensaje">{mensaje}</p>}
            </div>
        </div>
    );
};

export default AgregarUsuario;
