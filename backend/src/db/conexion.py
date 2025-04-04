import sqlite3

def get_conexion():

    conexion = sqlite3.connect('src/db/usuarios.db')
    conexion.row_factory = sqlite3.Row
    
    return conexion