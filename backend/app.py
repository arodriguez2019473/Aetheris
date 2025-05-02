from flask import Flask
from src.usuario.user import usuario_bp 
from src.db.init_db import crear_tabla_usuarios
from src.auth.auth import auth_bp
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

app.register_blueprint(usuario_bp, url_prefix='/usuario')
app.register_blueprint(auth_bp)

if __name__ == '__main__':

    crear_tabla_usuarios()
    app.run(host='0.0.0.0', debug=True, port=5000)