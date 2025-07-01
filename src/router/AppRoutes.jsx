// Filename: AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/LoginPage.jsx';
import Admin from '../pages/admin/Dashboard-Admin.jsx';
import Guru from '../pages/guru/Dashboard-Guru.jsx';
import Piket from '../pages/piket/Dashboard-Piket.jsx';
import Profile from '../pages/ProfilePage.jsx';
import ProfileForm from '../pages/ProfileForm.jsx';
import UbahPassword from '../pages/UbahPasswordPage.jsx';
import LihatPresensiGuru from '../pages/guru/LihatPresensi-Guru.jsx';
import LihatPresensiMapel from '../pages/piket/LihatPresensiMapel.jsx';
import LihatPresensiPiket from '../pages/piket/LihatPresensiPiket.jsx';
import CariPresensi from '../pages/piket/CariPresensi.jsx';
import PresensiForm from '../pages/guru/PresensiForm.jsx';
import DaftarKelasPiket from '../pages/piket/DaftarKelas-Piket.jsx';
import DaftarKelasGuru from '../pages/guru/DaftarKelas-Guru.jsx';
import DaftarGuru from '../pages/piket/DaftarGuru.jsx';
import DaftarPertemuan from '../pages/guru/DaftarPertemuan.jsx';
import Kontak from '../pages/KontakPage.jsx';
import Informasi from '../pages/InformasiPage.jsx';
import NotFound from '../pages/NotFoundPage.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path = "/" element = {<Login />} />
      <Route path = "/admin" element = {<Admin />} />
      <Route path = "/guru" element = {<Guru />} />
      <Route path = "/piket" element = {<Piket />} />
      <Route path = "/profile" element = {<Profile />} />
      <Route path = "/profile-form" element = {<ProfileForm />} />
      <Route path = "/ubah-password" element = {<UbahPassword />} />
      <Route path = "/guru/lihat-presensi" element = {<LihatPresensiGuru />} />
      <Route path = "/mapel/lihat-presensi" element = {<LihatPresensiMapel />} />
      <Route path = "/piket/lihat-presensi" element = {<LihatPresensiPiket />} />
      <Route path = "/cari-presensi" element = {<CariPresensi />} />
      <Route path = "/presensi-form" element = {<PresensiForm />} />
      <Route path = "/piket/daftar-kelas" element = {<DaftarKelasPiket />} />
      <Route path = "/guru/daftar-kelas" element = {<DaftarKelasGuru />} />
      <Route path = "/kelas/:kelasId" element = {<DaftarGuru />} />
      <Route path = "/pertemuan" element = {<DaftarPertemuan />} />
      <Route path = "/kontak" element = {<Kontak />} />
      <Route path = "/informasi" element = {<Informasi />} />
      <Route path = "*" element = {<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
