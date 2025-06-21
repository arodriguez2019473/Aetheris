import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearFactura } from '../../api/facturaApi';
import './AgregarRegistroFacturas.css';

const AgregarRegistroFacturas = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    nombre_factura: '',
    fecha_factura: '',
    tipo_factura: '',
    total_factura: '',
    envio: '',
    metodo_pago: '',
    estado: '',
    vendedor: '',
    cantidad_producto: '',
    precio_producto: '',
    id_factura: '',
    direccion_factura: ''
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
                    <input type="text" name="nombre_factura" value={formData.nombre_factura} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Fecha:</label>
                    <input type="date" name="fecha_factura" value={formData.fecha_factura} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Tipo:</label>
                    <input type="text" name="tipo_factura" value={formData.tipo_factura} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Total:</label>
                    <input type="number" name="total_factura" value={formData.total_factura} onChange={handleChange} required />
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
                   
                    <select name="metodo_pago" value={formData.metodo_pago} onChange={handleChange} required>        
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
                    <input type="number" name="cantidad_producto" value={formData.cantidad_producto} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Precio Producto:</label>
                    <input type="number" name="precio_producto" value={formData.precio_producto} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>ID Factura:</label>
                    <input type="text" name="id_factura" value={formData.id_factura} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Dirección:</label>
                    <input type="text" name="direccion_factura" value={formData.direccion_factura} onChange={handleChange} />
                </div>

                <button type="submit" className="btn-submit">Guardar Factura</button>
            </form>
        </div>
    );
};

export default AgregarRegistroFacturas;
