from flask import Blueprint, request, jsonify
from src.helpers.archivo_json import cargar_usuarios,guardar_usuarios

usuario_bp = Blueprint('usuario', __name__)

usuarioTemporal = cargar_usuarios()
id_contador = max([u['id'] for u in usuarioTemporal], default=0) + 1

# metodo para endpoint de post

@usuario_bp.route('/', methods=['POST'])
def post_usuario():

    global id_contador
    data = request.json

    newUsuario = {

        'id': id_contador,
        'nombre': data['nombre'],
        'edad': data['edad']        
    }

    usuarioTemporal.append(newUsuario)
    guardar_usuarios(usuarioTemporal)
    id_contador += 1

    return jsonify({"mensaje": "Usuario creado", "usuario": newUsuario}), 201

# metodo para el endpoint de get

@usuario_bp.route('/',methods=['GET'])
def get_usuario():

    return jsonify(usuarioTemporal)

# metodo para el endpoint de put

@usuario_bp.route('/',methods=['PUT'])
def put_usuario():

    data = request.json
    user_id = data.get('id')

    for usuario in usuarioTemporal:
        
        if usuario['id'] == user_id:
            usuario['nombre'] = data.get('nombre', usuario['nombre'])
            usuario['edad'] = data.get('edad', usuario['edad'])
        
            guardar_usuarios(usuarioTemporal)

            return jsonify({"mensaje": "usuario actualizado","usuario": usuario }), 200
    
    return jsonify ({"mensaje": "usuario no encontrado"}), 404



@usuario_bp.route('/', methods=['DELETE'])

def delete_usuario():
    
    data = request.json
    user_id = data.get('id')

    for i , usuario in enumerate(usuarioTemporal):

        if usuario['id'] == user_id:
            usuarioTemporal.pop(i)

            guardar_usuarios(usuarioTemporal)

            return jsonify({"mensaje":"usuario elimando correctamente"}), 200
            
    return jsonify({"mensaje":"usuario no encontrado"}), 404
