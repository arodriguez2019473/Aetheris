from flask import Blueprint, request, jsonify
from src.db.conexion import registro_datos

registro_bp = Blueprint('registro', __name__,) 

@registro_bp.route('/registro', methods=['POST'])
def registrar_datos():

    data = request.json
    nombreFactura = data.get('nombreFactura')
    fechaFactura = data.get('fechaFactura')
    totalFactura = data.get('totalFactura')
    idCliente = data.get('idCliente')
    idVendedor = data.get('idVendedor')
    idProducto = data.get('idProducto')
    cantidadProducto = data.get('cantidadProducto')
    precioProducto = data.get('precioProducto')
    idFactura = data.get('idFactura')
    idPago = data.get('idPago')
    idEnvio = data.get('idEnvio')
    idDireccion = data.get('idDireccion')
    idMetodoPago = data.get('idMetodoPago')
    idMetodoEnvio = data.get('idMetodoEnvio')
    idDireccionEnvio = data.get('idDireccionEnvio')

    if not all([nombreFactura, fechaFactura, totalFactura, idCliente, idVendedor, idProducto,
                cantidadProducto, precioProducto, idFactura, idPago, idEnvio, 
                idDireccion, idMetodoPago, idMetodoEnvio, idDireccionEnvio]):
        return jsonify({"mensaje": "Falta de datos"}), 400

    conexion = registro_datos()
    cursor = conexion.cursor()

    
