// Filename: NotFoundPage.jsx

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PrimaryButton } from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';

function NotFoundPage() {
  // Navigasi Page
  const location = useLocation();
  const prefix = location.pathname.startsWith('/admin') 
    ? '/admin' : (location.pathname.startsWith('/guru') 
    ? '/guru' : '/piket');
  const navigate = useNavigate();

  // Icon from iconList
  const logo = iconList.find((i) => i.label === 'Logo')?.src;

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        height: '100vh',
        backgroundColor: '#FFF6F6',
        padding: '20px',
      }}
    >
      {/* Logo / Ilustrasi */}
      <img
        src={logo}
        alt="SMP Plus Babussalam"
        style={{
          width: '80px',
          height: '80px',
          marginBottom: '20px',
          animation: 'bounce 1.5s infinite',
        }}
      />

      {/* Judul */}
      <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#379777' }}>
        404
      </h1>
      <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>
        Not Found Page
      </h3>
      <p style={{ fontSize: '16px', color: '#555', marginBottom: '30px' }}>
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>

      {/* Tombol Kembali */}
      <PrimaryButton
        width="200px"
        height="45px"
        fontSize="16px"
        onClick={() => navigate(`${prefix}`)}
      >
        Kembali ke Beranda
      </PrimaryButton>
    </div>
  );
}

export default NotFoundPage;
