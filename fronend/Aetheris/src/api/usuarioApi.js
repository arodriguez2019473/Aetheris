const BASE_URL = 'http://localhost:5000/usuario';

export async function getUsuarios() {
  try {
    const response = await fetch(BASE_URL);
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
  const res = await fetch(`${BASE_URL}/`, {
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

export async function actualizarUsuario(id, usuario) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
  });

  if (!res.ok) {
    throw new Error('Error al actualizar usuario');
  }

  return await res.json();
}

export async function eliminarUsuario(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    throw new Error('Error al eliminar usuario');
  }

  return await res.json();
} 