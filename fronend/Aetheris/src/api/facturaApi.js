const BASE_URL = 'http://localhost:5000/registroFacturas';

export async function getFacturas() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Error al obtener facturas');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en getFacturas:', error);
        return [];
    }
}

export async function getFactura(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Error al obtener factura con ID ${id}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en getFactura:', error);
        return null;
    }
}

export async function crearFactura(factura) {
    const response = await fetch(`${BASE_URL}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(factura)
    });
    if (!response.ok) {
        throw new Error('Error al crear factura');
    }
    return await response.json();
}    

export async function editarFactura(id, factura) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(factura)
        });
        if (!response.ok) {
            throw new Error(`Error al editar factura con ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error en editarFactura:', error);
        throw error;
    }
}

export async function eliminarFactura(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar factura con ID ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error en eliminarFactura:', error);
        throw error;
    }
}


