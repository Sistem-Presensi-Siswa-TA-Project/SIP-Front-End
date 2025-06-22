// Filename: AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/LoginPage.jsx';
import Test from '../pages/Test.jsx';
import Admin from '../pages/Dashboard-Admin.jsx';
import Mapel from '../pages/Dashboard-Mapel.jsx';
import Piket from '../pages/Dashboard-Piket.jsx';
import Presensi from '../pages/PresensiPage.jsx';
import PresensiForm from '../pages/PresensiForm.jsx';
// import NotFound from '../pages/NotFound.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path = "/" element = {<Login />} />
      <Route path = "/admin" element = {<Admin />} />
      <Route path = "/mapel" element = {<Mapel />} />
      <Route path = "/piket" element = {<Piket />} />
      <Route path = "/presensi" element = {<Presensi />} />
      <Route path = "/presensi-form" element = {<PresensiForm />} />
      {/* <Route path = "/notfound" element = {<NotFound />} /> */}
      <Route path = "/test" element = {<Test/>} />
    </Routes>
  );
};

export default AppRoutes;
