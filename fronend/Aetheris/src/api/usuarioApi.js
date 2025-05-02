export async function getUsuarios() {
    try {

      const response = await fetch('http://localhost:5000/usuario');
      if (!response.ok) {

        throw new Error('Error al obtener usuarios');
      }

      const data = await response.json();
      return data;
    
    } catch (error) {
    
        console.error('Error en getUsuarios:', error);
      return [];
    }
  }

  export async function crearUsuario(usuario) {
    const res = await fetch('http://localhost:5000/usuario/', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    });
  
    if (!res.ok) {
      throw new Error('Error al crear usuario');
    }
  
    return await res.json(); 
  }
  
