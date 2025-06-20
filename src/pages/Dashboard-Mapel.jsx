// Filename: Dashboard-Mapel.jsx
import React from 'react';
import { Header, Sidebar, Card } from '../components/Molekul.jsx'; // ← sesuaikan path

const DashboardMapel = () => {
  return (
    <div>
      <Header />

      <main
        className="d-flex"
        style={{
          gap: '24px',
        }}
      >
        {/* Sidebar */}
        <div className="position-absolute">
          <Sidebar />
        </div>

        {/* Kolom Tengah */}
        <div
          className="d-flex flex-column"
          style={{
            flex: 6,
            gap: '20px',
            paddingTop: '40px',
            paddingLeft: '30px',
          }}
        > 
          {/* Kolom Atas */}
          <Card width="900px" height="100px">
            <strong>Nama Guru</strong>
            <br />
            <small>NIP</small>
          </Card>

          {/* Kolom Bawah */}
          <div 
            className="d-flex flex-row" 
            style={{
              flex: 6,
              gap: '50px',
              paddingTop: '20px',
            }}
          >
            {/* Kolom Kiri Bawah Tengah */}
            <Card width="580px" height="550px">
              <p> [Daftar Mata Pelajaran] </p>
            </Card>

            {/* Kolom Kanan Bawah tengah */}
            <div
              className="d-flex flex-column"
              style={{
                flex: 3,
                gap: '40px',
              }}
            >
              <Card width="270px" height="220px">
                <p><strong>Kamis, 15 Mei 2025</strong></p>
                <h1 style={{ fontSize: '48px', marginTop: '12px' }}>07:30</h1>
              </Card>

              <Card width="270px" height="220px">
                <strong>Informasi</strong>
                <p style={{ fontSize: '13px', marginTop: '10px' }}>
                  Pastikan untuk memeriksa jadwal pelajaran secara berkala.<br />
                  Jika ada perubahan, akan diinformasikan melalui email.<br />
                  Untuk pertanyaan lebih lanjut, silakan hubungi sekolah.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardMapel;