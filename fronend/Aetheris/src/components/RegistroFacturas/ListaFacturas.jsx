import React, { useState, useEffect } from "react";
import { getFacturas } from "../../api/facturaApi";
import "./ListaFacturas.css";
import { useNavigate } from "react-router-dom";

const ListaFacturas = () => {
  const [facturas, setFacturas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const data = await getFacturas(); // ← ya viene en camelCase
        setFacturas(data);
      } catch (err) {
        console.error(err);
        alert("Error al obtener facturas");
      }
    };
    fetchFacturas();
  }, []);

  const handleFacturaClick = (id) => navigate(`/factura/${id}`);

  return (
    <div className="lista-facturas">
      <button className="elegant-bttn" onClick={() => navigate("/")}>
        ← Volver al Inicio
      </button>

      <h2>📄 Lista de Facturas</h2>

      <div className="boton-agregar">
        <button
          className="elegant-bttn"
          onClick={() => navigate("/RegistroFacAgregar")}
        >
          Agregar Nueva Factura
        </button>
      </div>

      <div className="factura-grid">
        {facturas.map((factura) => (
          <div
            key={factura.id}
            className="factura-card"
            onClick={() => handleFacturaClick(factura.id)}
          >
            <h3>{factura.nombre_factura}</h3>
            <p>
              <strong>Tipo:</strong> {factura.tipo_factura}
            </p>
            <p>
              <strong>Fecha:</strong> {factura.fecha_factura}
            </p>
            <p>
              <strong>Total:</strong> Q{factura.total_factura}
            </p>
            <p>
              <strong>Estado:</strong> {factura.estado}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaFacturas;
