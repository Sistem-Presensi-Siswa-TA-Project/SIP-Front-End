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

// Guru Page
import Guru from '../pages/guru/Dashboard-Guru.jsx';
import LihatPresensi from '../pages/guru/LihatPresensi.jsx';
import PresensiForm from '../pages/guru/PresensiForm.jsx';
import DaftarKelasGuru from '../pages/guru/DaftarKelas-Guru.jsx';
import DaftarPertemuan from '../pages/guru/DaftarPertemuan.jsx';

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
