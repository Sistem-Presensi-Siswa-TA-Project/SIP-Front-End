// Filename: PresensiHandler.jsx

import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

// Presensi Mata Pelajaran ~~~
export const handlePresensiChange = (index, value, prevPresensiData, setPresensiData) => {
  const updated = [...prevPresensiData];
  updated[index] = value;
  setPresensiData(updated);
};

export async function getPresensiMapelByIdJadwal(idJadwal) {
    try {
        const res = await axios.get(`${API}/api/presensi-mapel/jadwal/${idJadwal}`);
        // Cek jika response format sesuai
        return res.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data presensi:", error);
        return [];
    }
}

export async function getPresensiMapelByJadwalTanggal(idJadwal, tanggal) {
    try {
        const res = await axios.get(`${API}/api/presensi-mapel/jadwal/${idJadwal}/tanggal/${tanggal}`);
        // Cek jika response format sesuai
        return res.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data presensi:", error);
        return [];
    }
}

export async function createPresensiMapel(dataPresensi) {
    // dataPresensi: array of objects (batch)
    return axios.post(`${API}/api/presensi-mapel`, dataPresensi)
        .then(res => res.data)
        .catch(err => { throw err.response?.data || err; });
}

export async function updatePresensiMapel(dataPresensi) {
    return axios.put(`${API}/api/presensi-mapel/update`, dataPresensi)
        .then(res => res.data)
        .catch(err => { throw err.response?.data || err; });
}