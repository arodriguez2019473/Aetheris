import React from "react";
import Modal from "react-modal";
import "./ModalRegistroFacturas.css";
import { useNavigate } from "react-router-dom";
import { eliminarFactura,getFacturas } from "../../api/facturaApi";

const ModalRegistroFacturas = ({ isOpen, onRequestClose, factura, setFacturas }) => {
  const navigate = useNavigate();

  const handleEliminar = async () => {
    if (window.confirm(`¿Eliminar la factura ${factura.nombreFactura}?`)) {
      await eliminarFactura(factura.idFactura);
      const updatedFacturas = await getFacturas();
      setFacturas(updatedFacturas);
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-factura"
      overlayClassName="overlay"
    >
      <h2>Detalles de la Factura</h2>
      <p><strong>Nombre:</strong> {factura.nombreFactura}</p>
      <p><strong>Fecha:</strong> {factura.fechaFactura}</p>
      <p><strong>Tipo:</strong> {factura.tipoFactura}</p>
      <p><strong>Total:</strong> Q{factura.totalFactura}</p>
      <p><strong>Estado:</strong> {factura.estado}</p>
      <p><strong>Vendedor:</strong> {factura.vendedor}</p>
      <p><strong>Cantidad Producto:</strong> {factura.cantidadProducto}</p>
      <p><strong>Precio Producto:</strong> Q{factura.precioProducto}</p>
      <p><strong>ID Factura:</strong> {factura.idFactura}</p>
      <p><strong>Dirección:</strong> {factura.direccionFactura}</p>

      <div className="botones-modal">
        <button className="elegant-bttn" onClick={() => navigate(`/editar/${factura.idFactura}`)}>
          Editar
        </button>
        <button className="eliminar-bttn" onClick={handleEliminar}>
          Eliminar
        </button>
        <button className="elegant-bttn" onClick={onRequestClose}>
          Cerrar
        </button>
      </div>
    </Modal>
  );
}
export default ModalRegistroFacturas;