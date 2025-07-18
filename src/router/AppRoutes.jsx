// Filename: AppRoutes.jsx

import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';

// General Page
import Login from '../pages/LoginPage.jsx';
import Profile from '../pages/ProfilePage.jsx';
import ProfileForm from '../pages/ProfileForm.jsx';
import UbahPassword from '../pages/UbahPasswordPage.jsx';
import Kontak from '../pages/KontakPage.jsx';
import Informasi from '../pages/InformasiPage.jsx';
import NotFound from '../pages/NotFoundPage.jsx';

// Admin Page
import Admin from '../pages/admin/Dashboard-Admin.jsx';
import HakAkses from '../pages/admin/HakAksesPage.jsx';
import HakAksesGuru from '../pages/admin/HakAksesGuru.jsx';
import HakAksesFormGuru from '../pages/admin/HakAksesForm-Guru.jsx';
import HakAksesPiket from '../pages/admin/HakAksesPiket.jsx';
import HakAksesFormPiket from '../pages/admin/HakAksesForm-Piket.jsx';
import DataSiswa from '../pages/admin/DataSiswa.jsx';
import SiswaForm from '../pages/admin/SiswaForm.jsx';
import DataGuru from '../pages/admin/DataGuru.jsx';
import GuruForm from '../pages/admin/GuruForm.jsx';
import DataMapel from '../pages/admin/DataMapel.jsx';
import MapelForm from '../pages/admin/MapelForm.jsx';
import DataPresensi from '../pages/admin/DaftarKelas-Admin.jsx';
import DaftarGuruAdmin from '../pages/admin/DaftarGuru-Admin.jsx';
import DaftarPertemuanAdmin from '../pages/admin/DaftarPertemuan-Admin.jsx';
import DataJadwal from '../pages/admin/DataJadwal.jsx';
import JadwalForm from '../pages/admin/JadwalForm.jsx';

// Guru Page
import Guru from '../pages/guru/Dashboard-Guru.jsx';
import LihatPresensi from '../pages/guru/LihatPresensi.jsx';
import PresensiForm from '../pages/guru/PresensiForm.jsx';
import DaftarKelasGuru from '../pages/guru/DaftarKelas-Guru.jsx';
import DaftarPertemuan from '../pages/guru/DaftarPertemuan.jsx';
import CetakPresensi from '../pages/guru/CetakPresensi.jsx';
import OpsiCetakPresensi from '../pages/guru/OpsiCetakPresensi.jsx';

// Piket Page
import Piket from '../pages/piket/Dashboard-Piket.jsx';
import LihatPresensiMapel from '../pages/piket/LihatPresensiMapel.jsx';
import LihatPresensiPiket from '../pages/piket/LihatPresensiPiket.jsx';
import CariPresensi from '../pages/piket/CariPresensi.jsx';
import ScanPresensi from '../pages/piket/ScanPresensi.jsx';
import DaftarKelasPiket from '../pages/piket/DaftarKelas-Piket.jsx';
import DaftarGuru from '../pages/piket/DaftarGuru.jsx';


function AppRoutes() {
  return (
    <Routes>
      {/* General Route */}
      <Route path = "/" element = {<Login />} />
      <Route path = "*" element = {<NotFound />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRole="admin"> <Admin /> </ProtectedRoute>} />
      <Route path="/admin/profile" element={<ProtectedRoute allowedRole="admin"> <Profile /> </ProtectedRoute>} />
      <Route path="/admin/profile-form" element={<ProtectedRoute allowedRole="admin"> <ProfileForm /> </ProtectedRoute>} />
      <Route path="/admin/ubah-password" element={<ProtectedRoute allowedRole="admin"> <UbahPassword /> </ProtectedRoute>} />
      <Route path="/admin/kontak" element={<ProtectedRoute allowedRole="admin"> <Kontak /> </ProtectedRoute>} />
      <Route path="/admin/informasi" element={<ProtectedRoute allowedRole="admin"> <Informasi /> </ProtectedRoute>} />

      <Route path="/admin/user" element={<ProtectedRoute allowedRole="admin"> <HakAkses /> </ProtectedRoute>} />
      <Route path="/admin/user/guru" element={<ProtectedRoute allowedRole="admin"> <HakAksesGuru /> </ProtectedRoute>} />
      <Route path="/admin/user/guru/form" element={<ProtectedRoute allowedRole="admin"> <HakAksesFormGuru /> </ProtectedRoute>} />
      <Route path="/admin/user/piket" element={<ProtectedRoute allowedRole="admin"> <HakAksesPiket /> </ProtectedRoute>} />
      <Route path="/admin/user/piket/form" element={<ProtectedRoute allowedRole="admin"> <HakAksesFormPiket /> </ProtectedRoute>} />

      <Route path="/admin/data/siswa" element={<ProtectedRoute allowedRole="admin"> <DataSiswa /> </ProtectedRoute>} />
      <Route path="/admin/data/siswa/form" element={<ProtectedRoute allowedRole="admin"> <SiswaForm /> </ProtectedRoute>} />

      <Route path="/admin/data/guru" element={<ProtectedRoute allowedRole="admin"> <DataGuru /> </ProtectedRoute>} />
      <Route path="/admin/data/guru/form" element={<ProtectedRoute allowedRole="admin"> <GuruForm /> </ProtectedRoute>} />

      <Route path="/admin/data/mapel" element={<ProtectedRoute allowedRole="admin"> <DataMapel /> </ProtectedRoute>} />
      <Route path="/admin/data/mapel/form" element={<ProtectedRoute allowedRole="admin"> <MapelForm /> </ProtectedRoute>} />

      <Route path="/admin/data/kelas" element={<ProtectedRoute allowedRole="admin"> <DataPresensi /> </ProtectedRoute>} />
      <Route path="/admin/data/kelas/:kelasId" element={<ProtectedRoute allowedRole="admin"> <DaftarGuruAdmin /> </ProtectedRoute>} />
      <Route path="/admin/data/kelas/:kelasId/pertemuan" element={<ProtectedRoute allowedRole="admin"> <DaftarPertemuanAdmin /> </ProtectedRoute>} />

      <Route path="/admin/data/jadwal" element={<ProtectedRoute allowedRole="admin"> <DataJadwal /> </ProtectedRoute>} />
      <Route path="/admin/data/jadwal/form" element={<ProtectedRoute allowedRole="admin"> <JadwalForm /> </ProtectedRoute>} />

      {/* Guru Routes */}
      <Route path="/guru" element={<ProtectedRoute allowedRole="guru"> <Guru /> </ProtectedRoute>} />
      <Route path="/guru/profile" element={<ProtectedRoute allowedRole="guru"> <Profile /> </ProtectedRoute>} />
      <Route path="/guru/profile-form" element={<ProtectedRoute allowedRole="guru"> <ProfileForm /> </ProtectedRoute>} />
      <Route path="/guru/ubah-password" element={<ProtectedRoute allowedRole="guru"> <UbahPassword /> </ProtectedRoute>} />
      <Route path="/guru/kontak" element={<ProtectedRoute allowedRole="guru"> <Kontak /> </ProtectedRoute>} />
      <Route path="/guru/informasi" element={<ProtectedRoute allowedRole="guru"> <Informasi /> </ProtectedRoute>} />

      <Route path="/guru/kelas" element={<ProtectedRoute allowedRole="guru"> <DaftarKelasGuru /> </ProtectedRoute>} />
      <Route path="/guru/kelas/:kelasId/pertemuan" element={<ProtectedRoute allowedRole="guru"> <DaftarPertemuan /> </ProtectedRoute>} />
      <Route path="/guru/kelas/:kelasId/pertemuan/lihat-presensi" element={<ProtectedRoute allowedRole="guru"> <LihatPresensi /> </ProtectedRoute>} />
      <Route path="/guru/kelas/:kelasId/pertemuan/lihat-presensi/presensi-form" element={<ProtectedRoute allowedRole="guru"> <PresensiForm /> </ProtectedRoute>} />

      <Route path="/guru/cetak-presensi" element={<ProtectedRoute allowedRole="guru"> <CetakPresensi /> </ProtectedRoute>} />
      <Route path="/guru/cetak-presensi/cetak" element={<ProtectedRoute allowedRole="guru"> <OpsiCetakPresensi /> </ProtectedRoute>} />

      {/* Piket Routes */}
      <Route path="/piket" element={<ProtectedRoute allowedRole="piket"> <Piket /> </ProtectedRoute>} />
      <Route path="/piket/profile" element={<ProtectedRoute allowedRole="piket"> <Profile /> </ProtectedRoute>} />
      <Route path="/piket/profile-form" element={<ProtectedRoute allowedRole="piket"> <ProfileForm /> </ProtectedRoute>} />
      <Route path="/piket/ubah-password" element={<ProtectedRoute allowedRole="piket"> <UbahPassword /> </ProtectedRoute>} />
      <Route path="/piket/kontak" element={<ProtectedRoute allowedRole="piket"> <Kontak /> </ProtectedRoute>} />
      <Route path="/piket/informasi" element={<ProtectedRoute allowedRole="piket"> <Informasi /> </ProtectedRoute>} />

      <Route path="/piket/scan-presensi" element={<ProtectedRoute allowedRole="piket"> <ScanPresensi /> </ProtectedRoute>} />

      <Route path="/piket/kelas" element={<ProtectedRoute allowedRole="piket"> <DaftarKelasPiket /> </ProtectedRoute>} />
      <Route path="/piket/kelas/:kelasId" element={<ProtectedRoute allowedRole="piket"> <DaftarGuru /> </ProtectedRoute>} />
      <Route path="/piket/kelas/:kelasId/pertemuan" element={<ProtectedRoute allowedRole="piket"> <DaftarPertemuan /> </ProtectedRoute>} />
      <Route path="/piket/kelas/:kelasId/pertemuan/lihat-presensi" element={<ProtectedRoute allowedRole="piket"> <LihatPresensi /> </ProtectedRoute>} />
      <Route path="/piket/kelas/:kelasId/pertemuan/lihat-presensi/presensi-form" element={<ProtectedRoute allowedRole="piket"> <PresensiForm /> </ProtectedRoute>} />
      
      <Route path="/piket/cari-presensi" element={<ProtectedRoute allowedRole="piket"> <CariPresensi /> </ProtectedRoute>} />
      <Route path="/piket/cari-presensi/presensi-mapel" element={<ProtectedRoute allowedRole="piket"> <LihatPresensiMapel /> </ProtectedRoute>} />
      <Route path="/piket/cari-presensi/presensi-piket" element={<ProtectedRoute allowedRole="piket"> <LihatPresensiPiket /> </ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
