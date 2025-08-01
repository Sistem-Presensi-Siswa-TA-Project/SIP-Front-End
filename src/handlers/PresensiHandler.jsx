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

export async function deletePresensiMapelByJadwalAndTanggal(idJadwal, tanggal) {
    try {
        const res = await axios.delete(`${API}/api/presensi-mapel/jadwal/${idJadwal}/tanggal/${tanggal}`);
        // Return message response dari backend
        return res.data;
    } catch (error) {
        // Return error
        throw error.response?.data || { message: "Gagal menghapus data presensi!" };
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

export async function searchPresensiMapel({ tanggal, nama, mapel, kelas }) {
    try {
        const res = await axios.post(`${API}/api/presensi-mapel/search`, {
            tanggal,
            nama,
            mapel,
            kelas,
        });

        return res.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data presensi:", error);
        return [];
    }
}

// Presensi Piket ~~~
export async function createPresensiPiket(data) {
    // data: { nisn, tanggal_presensi, waktu, nama_siswa, kelas, nomor_induk_piket, jenis }
    try {
        const res = await axios.post(`${API}/api/presensi-piket`, data);
        return res.data; // { message, id_presensipiket? }
    } catch (error) {
        throw error.response?.data || { message: "Gagal simpan presensi piket!" };
    }
}

export async function searchPresensiPiket({ tanggal_presensi, nama_siswa, kelas }) {
    try {
        const res = await axios.post(`${API}/api/presensi-piket/search`, {
            tanggal_presensi,
            nama_siswa,
            kelas,
        });
        
        return res.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data presensi:", error);
        return [];
    }
}