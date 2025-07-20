// Filename: SiswaHandler.jsx

import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export async function getAllSiswa() {
    try {
        const res = await axios.get(`${API}/api/siswa`);
        // Cek jika response format sesuai
        return res.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
        return [];
    }
}

export async function getSiswaById(idSiswa) {
    try {
        const res = await axios.get(`${API}/api/siswa/${idSiswa}`);

        // Pastikan ambil data[0], bukan data
        if (Array.isArray(res.data.data)) {
            return res.data.data[0] || null;
        }

        return res.data.data || null;
    } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
        return null;
    }
}

export async function getSiswaByNISN(nisn) {
    try {
        const res = await axios.get(`${API}/api/siswa/nisn/${nisn}`);

        // Pastikan ambil data[0], bukan data
        if (Array.isArray(res.data.data)) {
            return res.data.data[0] || null;
        }

        return res.data.data || null;
    } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
        return null;
    }
}

export async function getSiswaByKelas(namaKelas) {
    try {
        const res = await axios.get(`${API}/api/siswa/kelas/${namaKelas}`);

        // Cek jika response adalah array
        if (Array.isArray(res.data.data)) {
            return res.data.data; // return array of siswa
        }

        // Jika tidak array, kembalikan array kosong
        return [];
    } catch (error) {
        console.error("Gagal mengambil data siswa by kelas:", error);
        return [];
    }
}

export async function createSiswa(data) {
    const response = await axios.post(`${API}/api/siswa`, data);
    return response.data;
}

export async function updateSiswaById(idSiswa, data) {
    const response = await axios.put(`${API}/api/siswa/${idSiswa}`, data);
    return response.data;
}

export async function deleteSiswaById(idSiswa) {
    const response = await axios.delete(`${API}/api/siswa/${idSiswa}`);
    return response.data;
}