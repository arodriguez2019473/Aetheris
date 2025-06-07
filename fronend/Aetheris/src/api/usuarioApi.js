const BASE_URL = 'http://localhost:5000/usuario';

async function request(endpoint = '', options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!res.ok) throw new Error(`Error en la petición: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error('API usuario error:', error);
    // Retorna [] para listas, null para objetos, según el endpoint
    if (options.method === 'GET' && !endpoint) return [];
    if (options.method === 'GET') return null;
    throw error;
  }
}

export function getUsuarios() {
  return request();
}

export function getUsuario(id) {
  return request(`/${id}`);
}

export function crearUsuario(usuario) {
  return request('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });
}

export function editarUsuario(id, usuario) {
  return request(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });
}

export function eliminarUsuario(id) {
  return request(`/${id}`, { method: 'DELETE' });
}
