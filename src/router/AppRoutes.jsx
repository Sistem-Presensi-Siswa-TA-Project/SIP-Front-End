// Filename: AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/LoginPage.jsx';
import Test from '../pages/Test.jsx';
import Admin from '../pages/Dashboard-Admin.jsx';
import Guru from '../pages/Dashboard-Guru.jsx';
import Piket from '../pages/Dashboard-Piket.jsx';
import Profile from '../pages/ProfilePage.jsx';
import ProfileForm from '../pages/ProfileForm.jsx';
import Password from '../pages/PasswordPage.jsx';
import LihatPresensi from '../pages/LihatPresensi.jsx';
import PresensiForm from '../pages/PresensiForm.jsx';
import DaftarKelas from '../pages/DaftarKelas.jsx';
import DaftarGuru from '../pages/DaftarGuru.jsx';
import DaftarPertemuan from '../pages/DaftarPertemuan.jsx';
import Kontak from '../pages/KontakPage.jsx';
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
      <Route path = "/ubah-password" element = {<Password />} />
      <Route path = "/lihat-presensi" element = {<LihatPresensi />} />
      <Route path = "/presensi-form" element = {<PresensiForm />} />
      <Route path = "/daftar-kelas" element = {<DaftarKelas />} />
      <Route path = "/kelas/:kelasId" element = {<DaftarGuru />} />
      <Route path = "/pertemuan" element = {<DaftarPertemuan />} />
      <Route path = "/kontak" element = {<Kontak />} />
      <Route path = "*" element = {<NotFound />} />
      <Route path = "/test" element = {<Test/>} />
    </Routes>
  );
};

export default AppRoutes;
