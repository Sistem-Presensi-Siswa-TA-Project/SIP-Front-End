// Filename: AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/LoginPage.jsx';
import Test from '../pages/Test.jsx';
import Admin from '../pages/Dashboard-Admin.jsx';
import Guru from '../pages/Dashboard-Guru.jsx';
import Piket from '../pages/Dashboard-Piket.jsx';
import Profile from '../pages/ProfilePage.jsx';
import ProfileForm from '../pages/ProfileForm.jsx';
import LihatPresensi from '../pages/LihatPresensi.jsx';
import PresensiForm from '../pages/PresensiForm.jsx';
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
      <Route path = "/lihat-presensi" element = {<LihatPresensi />} />
      <Route path = "/presensi-form" element = {<PresensiForm />} />
      <Route path = "*" element = {<NotFound />} />
      <Route path = "/test" element = {<Test/>} />
    </Routes>
  );
};

export default AppRoutes;
