// Filename: SiswaHandler.jsx

import axios from 'axios';

export async function getAllSiswa() {
    try {
        const res = await axios.get('https://backend.ajwan.my.id/api/siswa');
        // Cek jika response format sesuai
        return res.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
        return [];
    }
}

export async function getSiswaById(id) {
    try {
        const res = await axios.get(`https://backend.ajwan.my.id/api/siswa/${id}`);
        return res.data.data;
    } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
        return null;
    }
}

export async function deleteSiswaById(id_siswa) {
    const response = await axios.delete(`https://backend.ajwan.my.id/api/siswa/${id_siswa}`);
    return response.data;
}

export async function createSiswa(data) {
  const response = await axios.post('https://backend.ajwan.my.id/api/siswa', data);
  return response.data;
}