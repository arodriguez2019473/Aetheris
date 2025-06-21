const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const BASE = `${API}/registroFacturas`;

const sanitize = (obj) =>
    Object.fromEntries(
        Object.entries(obj).map(([k, v]) => {
            if (v === "") return [k, null];
            if (["total_factura", "precio_producto"].includes(k)) return [k, Number(v)];
            if (k === "cantidad_producto") return [k, v !== null ? parseInt(v, 10) : null];
            return [k, v];
        })
    );

export async function getFacturas() {
    try {
        const response = await fetch(BASE);
        if (!response.ok) throw new Error('Error al obtener facturas');
        return await response.json();
    } catch (error) {
        console.error('Error en getFacturas:', error);
        return [];
    }
}

export async function getFactura(id) {
    try {
        const response = await fetch(`${BASE}/${id}`);
        if (!response.ok) throw new Error(`Error al obtener factura con ID ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error en getFactura:', error);
        return null;
    }
}

export async function crearFactura(data) {
    const clean = sanitize(data);
    const res = await fetch(`${BASE}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clean),
    });
    if (!res.ok) {
        const msg = (await res.json().catch(() => ({}))).mensaje || "Error al crear factura";
        throw new Error(msg);
    }
    return res.json();
}

export async function editarFactura(id, data) {
    const clean = sanitize(data);
    try {
        const response = await fetch(`${BASE}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clean)
        });
        if (!response.ok) throw new Error(`Error al editar factura con ID ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error en editarFactura:', error);
        throw error;
    }
}

export async function eliminarFactura(id) {
    try {
        const response = await fetch(`${BASE}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Error al eliminar factura con ID ${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error en eliminarFactura:', error);
        throw error;
    }
}
