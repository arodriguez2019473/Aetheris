import sqlite3
import os

def get_conexion():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    ruta_db = os.path.join(base_dir, 'usuarios.db')
    
    return sqlite3.connect(ruta_db)

def registro_datos():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    ruta_db = os.path.join(base_dir, 'registro.db')

    return sqlite3.connect(ruta_db)