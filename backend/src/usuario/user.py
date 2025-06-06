from flask import Blueprint, request, jsonify
from src.db.conexion import get_conexion

usuario_bp = Blueprint('usuario', __name__)

def get_db_cursor():
    conexion = get_conexion()
    cursor = conexion.cursor()
    return conexion, cursor

@usuario_bp.route('/', methods=['POST'])
def post_usuario():
    data = request.json
    nombre = data.get('nombre')
    edad = data.get('edad')

    if not nombre or not edad:
        return jsonify({"mensaje": "falta de datos"}), 400

    conexion, cursor = get_db_cursor()
    cursor.execute(
        "INSERT INTO usuarios (nombre, edad) VALUES (?, ?)",
        (nombre, edad)
    )
    conexion.commit()
    user_id = cursor.lastrowid
    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "El usuario a sido creado",
        "usuario": {"id": user_id, "nombre": nombre, "edad": edad}
    }), 201

@usuario_bp.route('/', methods=['GET'])
def get_usuario():
    conexion, cursor = get_db_cursor()
    cursor.execute("SELECT id, nombre, edad FROM usuarios")
    usuarios = cursor.fetchall()
    lista_usuarios = [
        {'id': u[0], 'nombre': u[1], 'edad': u[2]} for u in usuarios
    ]
    cursor.close()
    conexion.close()
    return jsonify(lista_usuarios)

@usuario_bp.route('/<int:id>', methods=['GET'])
def get_usuario_por_id(id):
    conexion, cursor = get_db_cursor()
    cursor.execute("SELECT id, nombre, edad FROM usuarios WHERE id = ?", (id,))
    usuario = cursor.fetchone()
    cursor.close()
    conexion.close()

    if not usuario:
        return jsonify({"mensaje": "usuario no encontrado"}), 404

    usuario_dict = {'id': usuario[0], 'nombre': usuario[1], 'edad': usuario[2]}
    return jsonify(usuario_dict)

@usuario_bp.route('/<int:id>', methods=['PUT'])
def put_usuario(id):
    data = request.json
    nombre = data.get('nombre')
    edad = data.get('edad')

    if not nombre or not edad:
        return jsonify({"mensaje": "falta de datos"}), 400

    conexion, cursor = get_db_cursor()
    cursor.execute(
        "UPDATE usuarios SET nombre = ?, edad = ? WHERE id = ?",
        (nombre, edad, id)
    )
    conexion.commit()
    filas_afectadas = cursor.rowcount
    cursor.close()
    conexion.close()

    if filas_afectadas == 0:
        return jsonify({"mensaje": "usuario no encontrado"}), 404

    return jsonify({"mensaje": "Usuario actualizado correctamente"}), 200

@usuario_bp.route('/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    conexion, cursor = get_db_cursor()
    cursor.execute("DELETE FROM usuarios WHERE id = ?", (id,))
    conexion.commit()
    filas_afectadas = cursor.rowcount
    cursor.close()
    conexion.close()

    if filas_afectadas == 0:
        return jsonify({"mensaje": "usuario no encontrado"}), 404

    return jsonify({"mensaje": "Usuario eliminado correctamente"}), 202
