import React, { useState, useEffect } from 'react';
import { getFacturas } from '../../api/facturaApi';
import './ListaFacturas.css';
import { useNavigate } from 'react-router-dom';

const ListaFacturas = () => {
    const [facturas, setFacturas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacturas = async () => {
            const data = await getFacturas();
            setFacturas(data);
        };
        fetchFacturas();
    }, []);

    const handleFacturaClick = (id) => {
        navigate(`/factura/${id}`);
    };

    return (
        <div className="lista-facturas">
            <button className='elegant-bttn' onClick={() => navigate('/')}>
                ← Volver al Inicio
            </button>
            <h2>📄 Lista de Facturas</h2>

            <div className='boton-agregar'>
                <button className='elegant-bttn' onClick={() => navigate('/RegistroFacAgregar')}>
                    Agregar Nueva Factura
                </button>
            </div>
            <div className="factura-grid">
                {facturas.map(factura => (
                    <div key={factura.id} className="factura-card" onClick={() => handleFacturaClick(factura.id)}>
                        <h3>{factura.nombreFactura}</h3>
                        <p><strong>Tipo:</strong> {factura.tipoFactura}</p>
                        <p><strong>Fecha:</strong> {factura.fechaFactura}</p>
                        <p><strong>Total:</strong> Q{factura.totalFactura}</p>
                        <p><strong>Estado:</strong> {factura.estado}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaFacturas;
