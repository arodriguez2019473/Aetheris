from flask import Blueprint, request, jsonify
from src.db.conexion import registro_datos

registro_bp = Blueprint('registro', __name__)

def get_db_cursor():
    conexion = registro_datos()
    cursor = conexion.cursor()
    return conexion, cursor

@registro_bp.route('/', methods=['POST'])
def registrar_datos():
    data = request.json

    # Campos obligatorios
    campos_obligatorios = ['nombreFactura', 'fechaFactura', 'tipoFactura', 'totalFactura', 'envio', 'metodoPago', 'estado']
    faltantes = [campo for campo in campos_obligatorios if not data.get(campo)]

    if faltantes:
        return jsonify({"mensaje": f"Faltan datos obligatorios: {', '.join(faltantes)}"}), 400

    # Campos requeridos
    nombreFactura = data.get('nombreFactura')
    fechaFactura = data.get('fechaFactura')
    totalFactura = data.get('totalFactura')
    tipoFactura = data.get('tipoFactura')
    envio = data.get('envio')
    metodoPago = data.get('metodoPago')
    estado = data.get('estado')

    # Campos opcionales
    vendedor = data.get('vendedor') or None
    cantidadProducto = data.get('cantidadProducto') or None
    precioProducto = data.get('precioProducto') or None
    idFactura = data.get('idFactura') or None
    direccionFactura = data.get('direccionFactura') or None

    try:
        conexion, cursor = get_db_cursor()

        cursor.execute("""
            INSERT INTO registro_datos (
                nombreFactura, fechaFactura, totalFactura, tipoFactura,
                vendedor, cantidadProducto, precioProducto, idFactura,
                envio, direccionfactura, metodoPago, estado
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            nombreFactura, fechaFactura, totalFactura, tipoFactura,
            vendedor, cantidadProducto, precioProducto, idFactura,
            envio, direccionFactura, metodoPago, estado
        ))

        conexion.commit()
        registro_id = cursor.lastrowid

        return jsonify({
            "mensaje": "El registro ha sido creado",
            "registro": {
                "id": registro_id,
                "nombreFactura": nombreFactura,
                "fechaFactura": fechaFactura,
                "totalFactura": totalFactura,
                "tipoFactura": tipoFactura,
                "vendedor": vendedor,
                "cantidadProducto": cantidadProducto,
                "precioProducto": precioProducto,
                "idFactura": idFactura,
                "envio": envio,
                "direccionFactura": direccionFactura,
                "metodoPago": metodoPago,
                "estado": estado
            }
        }), 201

    except Exception as e:
        return jsonify({"mensaje": "Error al registrar los datos", "error": str(e)}), 500

    finally:
        cursor.close()
        conexion.close()

@registro_bp.route('/', methods=['GET'])
def listar_facturas():
    try:
        conexion, cursor = get_db_cursor()
        cursor.execute("SELECT * FROM registro_datos")
        facturas = [dict(zip([col[0] for col in cursor.description], row)) for row in cursor.fetchall()]
        return jsonify(facturas), 200
    except Exception as e:
        return jsonify({"mensaje": "Error al obtener facturas", "error": str(e)}), 500
    finally:
        cursor.close()
        conexion.close()

@registro_bp.route('/<int:factura_id>', methods=['GET'])
def obtener_factura(factura_id):
    try:
        conexion, cursor = get_db_cursor()
        cursor.execute("SELECT * FROM registro_datos WHERE id = ?", (factura_id,))
        row = cursor.fetchone()
        if not row:
            return jsonify({"mensaje": "Factura no encontrada"}), 404

        factura = dict(zip([col[0] for col in cursor.description], row))
        return jsonify(factura), 200
    except Exception as e:
        return jsonify({"mensaje": "Error al obtener factura", "error": str(e)}), 500
    finally:
        cursor.close()
        conexion.close()

@registro_bp.route('/<int:factura_id>', methods=['PUT'])
def actualizar_factura(factura_id):
    data = request.json
    campos_actualizables = [
        'nombreFactura', 'fechaFactura', 'totalFactura', 'tipoFactura',
        'vendedor', 'cantidadProducto', 'precioProducto', 'idFactura',
        'envio', 'direccionFactura', 'metodoPago', 'estado'
    ]

    set_clause = ', '.join([f"{campo} = ?" for campo in campos_actualizables if campo in data])
    valores = [data[campo] for campo in campos_actualizables if campo in data]

    if not valores:
        return jsonify({"mensaje": "No se enviaron datos para actualizar"}), 400

    try:
        conexion, cursor = get_db_cursor()
        cursor.execute(f"UPDATE registro_datos SET {set_clause} WHERE id = ?", (*valores, factura_id))
        conexion.commit()

        if cursor.rowcount == 0:
            return jsonify({"mensaje": "Factura no encontrada"}), 404

        return jsonify({"mensaje": "Factura actualizada correctamente"}), 200
    except Exception as e:
        return jsonify({"mensaje": "Error al actualizar factura", "error": str(e)}), 500
    finally:
        cursor.close()
        conexion.close()

@registro_bp.route('/<int:factura_id>', methods=['DELETE'])
def eliminar_factura(factura_id):
    try:
        conexion, cursor = get_db_cursor()
        cursor.execute("DELETE FROM registro_datos WHERE id = ?", (factura_id,))
        conexion.commit()

        if cursor.rowcount == 0:
            return jsonify({"mensaje": "Factura no encontrada"}), 404

        return jsonify({"mensaje": "Factura eliminada correctamente"}), 200
    except Exception as e:
        return jsonify({"mensaje": "Error al eliminar factura", "error": str(e)}), 500
    finally:
        cursor.close()
        conexion.close()
