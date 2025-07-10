// Filename: AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';

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

      {/* Admin Route */}
      <Route path = "/admin" element = {<Admin />} />
      <Route path = "/admin/profile" element = {<Profile />} />
      <Route path = "/admin/profile-form" element = {<ProfileForm />} />
      <Route path = "/admin/ubah-password" element = {<UbahPassword />} />
      <Route path = "/admin/kontak" element = {<Kontak />} />
      <Route path = "/admin/informasi" element = {<Informasi />} />

      <Route path = "/admin/user" element = {<HakAkses />} />
      <Route path = "/admin/user/guru" element = {<HakAksesGuru />} />
      <Route path = "/admin/user/guru/form" element = {<HakAksesFormGuru />} />
      <Route path = "/admin/user/piket" element = {<HakAksesPiket />} />
      <Route path = "/admin/user/piket/form" element = {<HakAksesFormPiket />} />

      <Route path = "/admin/data/siswa" element = {<DataSiswa />} />
      <Route path = "/admin/data/siswa/form" element = {<SiswaForm />} />
      
      <Route path = "/admin/data/guru" element = {<DataGuru />} />
      <Route path = "/admin/data/guru/form" element = {<GuruForm />} />

      <Route path = "/admin/data/mapel" element = {<DataMapel />} />
      <Route path = "/admin/data/mapel/form" element = {<MapelForm />} />
      
      <Route path = "/admin/data/kelas" element = {<DataPresensi />} />
      <Route path = "/admin/data/kelas/:kelasId" element = {<DaftarGuruAdmin />} />
      <Route path = "/admin/data/kelas/:kelasId/pertemuan" element = {<DaftarPertemuanAdmin />} />
      
      <Route path = "/admin/data/jadwal" element = {<DataJadwal />} />
      <Route path = "/admin/data/jadwal/form" element = {<JadwalForm />} />

      {/* Guru Route */}
      <Route path = "/guru" element = {<Guru />} />
      <Route path = "/guru/profile" element = {<Profile />} />
      <Route path = "/guru/profile-form" element = {<ProfileForm />} />
      <Route path = "/guru/ubah-password" element = {<UbahPassword />} />
      <Route path = "/guru/kontak" element = {<Kontak />} />
      <Route path = "/guru/informasi" element = {<Informasi />} />

      <Route path = "/guru/kelas" element = {<DaftarKelasGuru />} />
      <Route path = "/guru/kelas/:kelasId/pertemuan" element = {<DaftarPertemuan />} />
      <Route path = "/guru/kelas/:kelasId/pertemuan/lihat-presensi" element = {<LihatPresensi />} />
      <Route path = "/guru/kelas/:kelasId/pertemuan/lihat-presensi/presensi-form" element = {<PresensiForm />} />

      <Route path = "/guru/cetak-presensi" element = {<CetakPresensi />} />
      <Route path = "/guru/cetak-presensi/kelas/:kelasId" element = {<OpsiCetakPresensi />} />

      {/* Piket Route */}
      <Route path = "/piket" element = {<Piket />} />
      <Route path = "/piket/profile" element = {<Profile />} />
      <Route path = "/piket/profile-form" element = {<ProfileForm />} />
      <Route path = "/piket/ubah-password" element = {<UbahPassword />} />
      <Route path = "/piket/kontak" element = {<Kontak />} />
      <Route path = "/piket/informasi" element = {<Informasi />} />
      
      <Route path = "/piket/scan-presensi" element = {<ScanPresensi />} />

      <Route path = "/piket/kelas" element = {<DaftarKelasPiket />} />
      <Route path = "/piket/kelas/:kelasId" element = {<DaftarGuru />} />
      <Route path = "/piket/kelas/:kelasId/pertemuan" element = {<DaftarPertemuan />} />
      <Route path = "/piket/kelas/:kelasId/pertemuan/lihat-presensi" element = {<LihatPresensi />} />
      <Route path = "/piket/kelas/:kelasId/pertemuan/lihat-presensi/presensi-form" element = {<PresensiForm />} />

      <Route path = "/piket/cari-presensi" element = {<CariPresensi />} />
      <Route path = "/piket/cari-presensi/presensi-mapel" element = {<LihatPresensiMapel />} />
      <Route path = "/piket/cari-presensi/presensi-piket" element = {<LihatPresensiPiket />} />
    </Routes>
  );
};

export default AppRoutes;
