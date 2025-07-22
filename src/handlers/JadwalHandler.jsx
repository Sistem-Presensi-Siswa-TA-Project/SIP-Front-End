// Filename: JadwalHandler.jsx

const API = import.meta.env.VITE_API_URL;

export async function getAllJadwal() {
    const response = await fetch(`${API}/api/jadwal`, {
        method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
        throw { code: 'GET_JADWAL_FAILED', message: data.message || 'Gagal mengambil data jadwal' };
    }

    // Return: { message, data: [...] }
    return data.data || [];
}

export async function getJadwalById(idJadwal) {
    const response = await fetch(`${API}/api/jadwal/${idJadwal}`, {
        method: 'GET',
    });
    const data = await response.json();

    if (!response.ok) {
        throw { code: 'GET_JADWAL_BY_ID_FAILED', message: data.message || 'Gagal mengambil data jadwal' };
    }

    // data = { message, data: { ...jadwal } }
    return data.data || null;
}

export async function getJadwalByNomorInduk(nomorInduk) {
    const response = await fetch(`${API}/api/jadwal/guru/${nomorInduk}`, {
        method: 'GET',
    });
    const data = await response.json();
    
    if (!response.ok) {
        return null;
    }

    // Return detail jadwal, contoh: { nama: "...", ... }
    return data.data || null;
}

export async function getJadwalByHaridanGuru(hari, guru) {
    const response = await fetch(`${API}/api/jadwal/hari/${hari}/guru/${guru}`, {
        method: 'GET',
    });
    const data = await response.json();
    
    if (!response.ok) {
        return null;
    }

    // Return detail jadwal
    return data.data || null;
}

export async function getJadwalByKelas(kelas) {
    const response = await fetch(`${API}/api/jadwal/kelas/${kelas}`, {
        method: 'GET',
    });
    const data = await response.json();
    
    if (!response.ok) {
        return null;
    }

    // Return detail jadwal
    return data.data || null;
}

export async function createJadwal(jadwalData) {
    // jadwalData = { nomor_induk, nama, mata_pelajaran, ... }
    const response = await fetch(`${API}/api/jadwal`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jadwalData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        // Format error supaya konsisten
        throw { code: 'CREATE_JADWAL_FAILED', message: data.message || 'Gagal menambah data jadwal!' };
    }
    
    // return { message, id_jadwal, ... }
    return data;
}

export async function putJadwalById(id_jadwal, jadwalData) {
    const response = await fetch(`${API}/api/jadwal/${id_jadwal}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jadwalData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw { code: 'PUT_JADWAL_FAILED', message: data.message || 'Gagal mengupdate data jadwal!' };
    }

    // return response (bisa berisi message, id_jadwal, dll)
    return data;
}

export async function deleteAllJadwal() {
    const response = await fetch(`${API}/api/jadwal`, {
        method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
        throw { code: 'DELETE_ALL_JADWAL_FAILED', message: data.message || 'Gagal menghapus semua jadwal!' };
    }

    // data: { message, affectedRows }
    return data;
}

export async function deleteJadwalById(id_jadwal) {
    const response = await fetch(`${API}/api/jadwal/${id_jadwal}`, {
        method: 'DELETE',
    });
    const data = await response.json();

    if (!response.ok) {
        throw { code: 'DELETE_JADWAL_FAILED', message: data.message || 'Gagal menghapus data jadwal!' };
    }

    // data berupa message"
    return data;
}