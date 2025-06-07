import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearFactura } from '../../api/facturaApi';
import './AgregarRegistroFacturas.css';

const AgregarRegistroFacturas = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombreFactura: '',
        fechaFactura: '',
        tipoFactura: '',
        totalFactura: '',
        envio: '',
        metodoPago: '',
        estado: '',
        vendedor: '',
        cantidadProducto: '',
        precioProducto: '',
        idFactura: '',
        direccionFactura: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await crearFactura(formData);
            alert('Factura creada correctamente');
            navigate('/registroFacturas');
        } catch (error) {
            console.error(error);
            alert('Error al crear la factura');
        }
    };

    return (
        <div className="form-container">
            <div>
                <button className='elegant-bttn' onClick={() => navigate('/registroFacturas')}>
                    ← Volver al Registro de Factura
                </button>
            </div>
            <h2>📝 Agregar Nueva Factura</h2>   
            <form onSubmit={handleSubmit} className="form-factura">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" name="nombreFactura" value={formData.nombreFactura} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Fecha:</label>
                    <input type="date" name="fechaFactura" value={formData.fechaFactura} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Tipo:</label>
                    <input type="text" name="tipoFactura" value={formData.tipoFactura} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Total:</label>
                    <input type="number" name="totalFactura" value={formData.totalFactura} onChange={handleChange} required />
                </div>

                <div className="seleccion-group">
                    <label>Envío:</label>
                
                    <select name="envio" value={formData.envio} onChange={handleChange} required>
                        <option value=""></option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                
                </div>

                <div className="seleccion-group">
                    <label>Método de Pago:</label>
                   
                    <select name="metodoPago" value={formData.metodoPago} onChange={handleChange} required>        
                        <option value=""></option>
                        <option value="tarjeta">Tarjeta de Crédito</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="transferencia">Transferencia Bancaria</option>
                        <option value="paypal">PayPal</option>
                        <option value="otro">Otro</option>
                    </select>

                </div>

                <div className="seleccion-group">
                    <label>Estado:</label>
                    <select name="estado" value={formData.estado} onChange={handleChange} required>
                        <option value=""></option>
                        <option value="pendiente">Pendiente</option>
                        <option value="pagada">Pagada</option>
                        <option value="cancelada">Cancelada</option>
                        <option value="enviado">Enviado</option>
                        <option value="entregada">Entregada</option>
                    </select>
                </div>

                {/* Opcionales */}
                <div className="form-group">
                    <label>Vendedor:</label>
                    <input type="text" name="vendedor" value={formData.vendedor} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Cantidad Producto:</label>
                    <input type="number" name="cantidadProducto" value={formData.cantidadProducto} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Precio Producto:</label>
                    <input type="number" name="precioProducto" value={formData.precioProducto} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>ID Factura:</label>
                    <input type="text" name="idFactura" value={formData.idFactura} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Dirección:</label>
                    <input type="text" name="direccionFactura" value={formData.direccionFactura} onChange={handleChange} />
                </div>

                <button type="submit" className="btn-submit">Guardar Factura</button>
            </form>
        </div>
    );
};

export default AgregarRegistroFacturas;
