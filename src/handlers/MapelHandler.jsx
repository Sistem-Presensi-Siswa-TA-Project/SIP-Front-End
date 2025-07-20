// Filename: MapelHandler.jsx

import axios from 'axios';

const API = 'https://backend.ajwan.xyz';

export async function getAllMapel() {
    try {
        const res = await axios.get(`${API}/api/mapel`);
        // Cek jika response format sesuai
        return res.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data mapel:", error);
        return [];
    }
}

export async function getMapelById(idMapel) {
    try {
        const res = await axios.get(`${API}/api/mapel/${idMapel}`);

        // Pastikan ambil data[0], bukan data
        if (Array.isArray(res.data.data)) {
            return res.data.data[0] || null;
        }

        return res.data.data || null;
    } catch (error) {
        console.error("Gagal mengambil data mapel:", error);
        return null;
    }
}

export async function createMapel(dataMapel) {
    const response = await axios.post(`${API}/api/mapel`, dataMapel);
    return response.data;
}

export async function updateMapel(idMapel, dataMapel) {
    const response = await axios.put(`${API}/api/mapel/${idMapel}`, dataMapel);
    return response.data;
}

export async function deleteMapelById(idMapel) {
    const response = await axios.delete(`${API}/api/mapel/${idMapel}`);
    return response.data;
}