// Filename: GuruHandler.jsx

const API = import.meta.env.VITE_API_URL;

export async function getAllGuru() {
    const response = await fetch(`${API}/api/guru`, {
        method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
        throw { code: 'GET_GURU_FAILED', message: data.message || 'Gagal mengambil data guru' };
    }

    // Return: { message, data: [...] }
    return data.data || [];
}

export async function getGuruById(idGuru) {
    const response = await fetch(`${API}/api/guru/${idGuru}`, {
        method: 'GET',
    });
    const data = await response.json();

    if (!response.ok) {
        throw { code: 'GET_GURU_BY_ID_FAILED', message: data.message || 'Gagal mengambil data guru' };
    }

    // data = { message, data: { ...guru } }
    // Kembalikan hanya object guru-nya
    return data.data || null;
}

export async function getGuruByNomorInduk(nomorInduk) {
    const response = await fetch(`${API}/api/guru/nomor-induk/${nomorInduk}`);
    const data = await response.json();
    
    if (!response.ok) {
        return null;
    }

    // Return detail guru, contoh: { nama: "...", ... }
    return data.data || null;
}

export async function createGuru(guruData) {
    // guruData = { nomor_induk, nama, mata_pelajaran, ... }
    const response = await fetch(`${API}/api/guru`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(guruData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        // Format error supaya konsisten
        throw { code: 'CREATE_GURU_FAILED', message: data.message || 'Gagal menambah data guru!' };
    }
    
    // return { message, id_guru, ... }
    return data;
}

export async function putGuruById(id_guru, guruData) {
    const response = await fetch(`${API}/api/guru/${id_guru}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(guruData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw { code: 'PUT_GURU_FAILED', message: data.message || 'Gagal mengupdate data guru!' };
    }

    // return response (bisa berisi message, id_guru, dll)
    return data;
}

export async function deleteAllGuru() {
    const response = await fetch(`${API}/api/guru`, {
        method: 'DELETE',
    });
    const data = await response.json();

    if (!response.ok) {
        throw { code: 'DELETE_GURU_FAILED', message: data.message || 'Gagal menghapus semua data guru!' };
    }

    // data berupa message"
    return data;
}

export async function deleteGuruById(id_guru) {
    const response = await fetch(`${API}/api/guru/${id_guru}`, {
        method: 'DELETE',
    });
    const data = await response.json();

    if (!response.ok) {
        throw { code: 'DELETE_GURU_FAILED', message: data.message || 'Gagal menghapus data guru!' };
    }

    // data berupa message"
    return data;
}