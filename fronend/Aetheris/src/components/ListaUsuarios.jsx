import React, { use, useEffect, useState } from 'react';
import { getUsuarios,eliminarUsuario} from '../api/usuarioApi';
import './ListaUsuario.css';

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        
        async function cargarUsuarios() {
            const datos = await getUsuarios();
            setUsuarios(datos);
        }

        cargarUsuarios();
    }, []);

    return (
        <div className="contenedor-usuarios">

            <h2>Lista de Usuarios</h2>
            <button className='elegant-bttn' onClick={()=> window.location.href = '/agregar'}>
                Agregar Usuario
            </button>


            <div className="grid-usuarios">
            
                {usuarios.map((u, index) => (
            
                    <div className="tarjeta-usuario" key={u.id}>
                    
                        <h3>{u.nombre}</h3>
                        <p><strong>ID:</strong> {index + 1}</p>
                        <p><strong>Edad:</strong> {u.edad} años</p>

                        <button className='eliminar-bttn' onClick={async () => {
                            if (window.confirm(`¿Estás seguro de eliminar al usuario ${u.nombre}?`)) {
                                await eliminarUsuario(u.id);
                                setUsuarios(usuarios.filter(usuario => usuario.id !== u.id));
                            }
                        }}>
                            Eliminar Usuario
                        </button>
                        
                        <button className='editar-bttn'>Editar</button>
                        {/* <button className='elegant-bttn' onClick={() => window.location.href = `/agregar?id=${u.id}`}>
                            Editar Usuario
                        </button> */}
                    
                    </div>
                ))}
            
            </div>
        </div>
    );
};

export default ListaUsuarios;
