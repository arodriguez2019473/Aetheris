from flask import Blueprint, request, jsonify
# from src.helpers.archivo_json import cargar_usuarios,guardar_usuarios
from src.db.conexion import get_conexion

usuario_bp = Blueprint('usuario', __name__)

# metodo para endpoint de post

@usuario_bp.route('/', methods=['POST'])
def post_usuario():

    data = request.json
    
    nombre = data.get('nombre')
    edad = data.get('edad')

    if not nombre or not edad:
        return jsonify({"mensaje":"falta de datos"}), 400

    conexion = get_conexion()
    cursor = conexion.cursor()

    cursor.execute("""
        INSERT INTO usuarios (nombre, edad)
        VALUES (?, ?)
    """, (nombre, edad))
    
    conexion.commit()
    user_id = cursor.lastrowid
    cursor.close()
    conexion.close()

    return jsonify({"mensaje":"El usuario a sido creado","usuario":{"id":user_id, "nombre":nombre, "edad":edad}}), 201

# metodo para el endpoint de get

@usuario_bp.route('/', methods=['GET'])
def get_usuario():
    from src.db.conexion import get_conexion
    conexion = get_conexion()
    cursor = conexion.cursor()

    cursor.execute("SELECT id, nombre, edad FROM usuarios")
    usuarios = cursor.fetchall()

    lista_usuarios = []
    for u in usuarios:
        lista_usuarios.append({
            'id': u[0],
            'nombre': u[1],
            'edad': u[2]
        })

    conexion.close()

    return jsonify(lista_usuarios)

# metodo para el endpoint de get por id
@usuario_bp.route('/<int:id>', methods=['GET'])
def get_usuario_por_id(id):
    
    conexion = get_conexion()
    cursor = conexion.cursor()

    cursor.execute("SELECT id, nombre, edad FROM usuarios WHERE id = ?", (id,))
    usuario = cursor.fetchone()

    if not usuario:
        return jsonify({"mensaje":"usuario no encontrado"}), 404

    usuario_dict = {
        'id': usuario[0],
        'nombre': usuario[1],
        'edad': usuario[2]
    }

    cursor.close()
    conexion.close()

    return jsonify(usuario_dict)

# metodo para el endpoint de put

@usuario_bp.route('/<int:id>',methods=['PUT'])
def put_usuario(id):

    data = request.json

    nombre = data.get('nombre')
    edad = data.get('edad')

    if not nombre or not edad:
        return jsonify({"mensaje":"falta de datos"}), 400

    conexion = get_conexion()
    cursor = conexion.cursor()

    cursor.execute("""
    
    UPDATE usuarios
    SET nombre = ?, edad = ?
    WHERE id = ?
    """, (nombre, edad, id))

    conexion.commit()
    
    filas_afectadas = cursor.rowcount
    cursor.close()
    conexion.close()

    if filas_afectadas == 0:
        return jsonify({"mensaje":"usuario no encontrado (osea weon sepa quien buscas)"}), 404
    
    return jsonify({"mensaje":"Usuario actualizado correctamente :)"}), 200

# este es el metodo para endpoint para eliminar o delete

@usuario_bp.route('/<int:id>', methods=['DELETE'])

def delete_usuario(id):
    
    conexion = get_conexion()
    cursor = conexion.cursor()

    cursor.execute("DELETE FROM usuarios WHERE id = ?", (id,))

    conexion.commit()
    filas_afectadas = cursor.rowcount
    cursor.close()
    conexion.close()

    if filas_afectadas == 0:

        return jsonify({"mensaje": "el weon no encontrado"}), 404

    return jsonify({"mensaje": "che me eliminaste ;*("}),202