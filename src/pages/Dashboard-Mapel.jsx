// Filename: Dashboard-Mapel.jsx
import React, { useState } from 'react';
import { Header, Sidebar, Card } from '../components/Molekul.jsx';
import { LightButton } from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';

function DashboardMapel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mengambil icon dari iconData.js
  const menuIconBlack = iconList.find((i) => i.label === 'Menu Icon Black')?.src;
  const menuIconWhite = iconList.find((i) => i.label === 'Menu Icon White')?.src;

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Header />

      <main
        className="d-flex justify-content-center flex-wrap"
        style={{ gap: '20px' }}
      >
        {/* Sidebar Overlay for Mobile and Tablet */}
        {sidebarOpen && (
          <div className="sidebar-overlay d-lg-none" onClick={handleToggleSidebar}>
            <div onClick={(e) => e.stopPropagation()}>
              <Sidebar onClose={handleToggleSidebar} />
            </div>
          </div>
        )}

        {/* Sidebar for Desktop only */}
        {!sidebarOpen && (
          <div className="d-none d-lg-block" style={{ flexShrink: 0 }}>
            <Sidebar onClose={handleToggleSidebar} />
          </div>
        )}

        {/* Kolom Tengah */}
        <div
          className="d-flex flex-column align-items-center"
          style={{ flex: 6, gap: '20px', paddingTop: '35px', width: '100%' }}
        >
          {/* Kolom Atas */}
          <Card width="100%" height="auto" style={{ maxWidth: '900px' }}>
            <div className="d-flex justify-content-between align-items-center w-100">
              <div>
                <strong>Nama Guru</strong>
                <br />
                <small>NIP</small>
              </div>

              {/* Toggle Sidebar Button */}
              <LightButton
                variant="light"
                height="55px"
                width="55px"
                style={
                  { 
                    top: '100px',
                    right: 0,
                    marginLeft: 'auto',
                    marginRight: '3px',
                  }
                }
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleToggleSidebar}
              >

                <img
                  src={isHovering ? menuIconWhite : menuIconBlack}
                  alt="Menu"
                  width="50"
                  height="50"
                />
                
              </LightButton>
            </div>
          </Card>

          {/* Kolom Bawah */}
          <div className="d-flex flex-column flex-lg-row custom-container gap-5" style={{ marginTop: '20px', width: '900px' }}>
            {/* Kolom Kiri Bawah Tengah */}
            <Card className="w-100 mx-auto" style={{ width: '900px', height: '500px' }}>
                <p> [Daftar Mata Pelajaran] </p>
            </Card>

            {/* Kolom Kanan Bawah tengah */}
            <div className="custom-container d-flex flex-column align-items-end" style={{ gap: '50px', width: '500px' }}>
              <Card className="w-100 card-kecil" style={{ height: '220px' }}>
                <p><strong>Kamis, 15 Mei 2025</strong></p>
                <h1 style={{ fontSize: '48px', marginTop: '12px' }}>07:30</h1>
              </Card>

              <Card className="w-100 card-kecil" style={{ height: '220px' }}>
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
}

export default DashboardMapel;