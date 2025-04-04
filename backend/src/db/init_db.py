from .conexion import get_conexion

def crear_tabla_usuarios():
    conexion = get_conexion()
    cursor = conexion.cursor()

    cursor.execute('''
    
        CREATE TABLE IF NOT EXISTS usuarios (
        
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        edad INTEGER NOT NULL
        )

    ''')

    conexion.commit()
    conexion.close()