// Filename: PiketHandler.jsx

const API = import.meta.env.VITE_API_URL;

export async function getAllPiket() {
    const response = await fetch(`${API}/api/piket`, {
        method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
        throw { code: 'GET_GURU_FAILED', message: data.message || 'Gagal mengambil data piket!' };
    }

    // Return: { message, data: [...] }
    return data.data || [];
}

export async function getPiketById(idPiket) {
    const response = await fetch(`${API}/api/piket/${idPiket}`, {
        method: 'GET',
    });
    const data = await response.json();

    if (!response.ok) {
        throw { code: 'GET_GURU_BY_ID_FAILED', message: data.message || 'Gagal mengambil data piket!' };
    }

    // data = { message, data: { ...guru } }
    return data.data || null;
}

export async function getPiketByKodePiket(kodePiket) {
    const response = await fetch(`${API}/api/piket/kode/${kodePiket}`, {
        method: 'GET',
    });
    const data = await response.json();

    if (!response.ok) {
        throw { code: 'GET_GURU_BY_ID_FAILED', message: data.message || 'Gagal mengambil data piket!' };
    }

    // data = { message, data: { ...guru } }
    return data.data || null;
}

export async function createPiket(piketData) {
    const response = await fetch(`${API}/api/piket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(piketData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        // Format error supaya konsisten
        throw { code: 'CREATE_PIKET_FAILED', message: data.message || 'Gagal menambah data piket' };
    }
    
    // return { message, id_piket, ... }
    return data;
}

export async function putPiketById(id_piket, piketData) {
    const response = await fetch(`${API}/api/piket/${id_piket}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(piketData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw { code: 'PUT_PIKET_FAILED', message: data.message || 'Gagal mengupdate data piket!' };
    }

    // return response (bisa berisi message, id_guru, dll)
    return data;
}

export async function deletePiketById(id_piket) {
    const response = await fetch(`${API}/api/piket/${id_piket}`, {
        method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
        throw { code: 'DELETE_PIKET_FAILED', message: data.message || 'Gagal menghapus data piket!' };
    }

    // data berupa message"
    return data;
}