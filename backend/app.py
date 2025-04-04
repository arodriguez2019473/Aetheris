from flask import Flask
from src.usuario.user import usuario_bp 
from src.db.init_db import crear_tabla_usuarios

app = Flask(__name__)

app.register_blueprint(usuario_bp, url_prefix='/usuario')

if __name__ == '__main__':

    crear_tabla_usuarios()
    app.run(host='0.0.0.0', debug=True, port=5000)
