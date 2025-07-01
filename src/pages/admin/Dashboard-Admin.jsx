// Filename: Dashboard-Mapel.jsx
import React, { useState, useEffect } from 'react';
import { Header, Sidebar, Card } from '../../components/Molekul.jsx';
import { LightButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';

function DashboardAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mengambil icon dari iconData.js
  const menuIconBlack = iconList.find((i) => i.label === 'Menu Icon Black')?.src;
  const menuIconWhite = iconList.find((i) => i.label === 'Menu Icon White')?.src;
  const userIcon = iconList.find((i) => i.label === 'User Icon')?.src;
  const emailIcon = iconList.find((i) => i.label === 'Email Icon')?.src;
  const phoneIcon = iconList.find((i) => i.label === 'Phone Icon')?.src;

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Set waktu up-to-date
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Header> Beranda </Header>

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
          <Card width="100%" height="auto" style={{ maxWidth: '900px', padding: '16px' }}>
            <div className="d-flex justify-content-between align-items-center w-100">
              {/* Icon User */}
              <div>
                <img
                  src={userIcon}
                  alt="User"
                  width="50"
                  height="50"
                  style={{ marginLeft: '10px', marginRight: '18px' }}
                />
              </div>

              {/* Identitas User */}
              <div>
                <strong> Nama User </strong>
                <br />
                <small> Nomor Induk User (NIP/NIS/NISN) </small>
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
                    boxShadow: isHovering ? 'inset 4px 4px 12px rgba(0, 0, 0, 0.5)' : 'none',
                    transition: 'box-shadow 0.1s ease-in-out',
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
            <Card className="w-100 mx-auto" style={{ width: '900px', height: '540px', padding: '16px' }}>
              
            </Card>

            {/* Kolom Kanan Bawah tengah */}
            <div className="custom-container d-flex flex-column align-items-end" style={{ gap: '50px', width: '500px' }}>
              {/* Waktu & Tanggal */}
              <Card className="w-100 card-kecil" style={{ height: '220px' }}>
                <p style={{ margin: '20px 0 15px 20px' }}> 
                  <strong> 
                    {
                      new Date().toLocaleDateString('id-ID', {
                        weekday: 'long',   // Hari
                        year: 'numeric',   // Tahun
                        month: 'long',     // Bulan
                        day: 'numeric',    // Tanggal 
                      })
                    } 
                  </strong> 
                </p>

                <hr style={{ margin: '0 0 28px 0' }}/>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <h1 style={{ fontSize: '56px', marginTop: '12px' }}>
                    {
                      currentTime.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                      })
                    }
                  </h1>
                </div>
              </Card>

              {/* Pengumuman */}
              <Card className="w-100 card-kecil" style={{ height: '270px' }}>
                <p style={{ margin: '20px 0 15px 20px' }}> 
                  <strong> 
                    Pengumuman
                  </strong> 
                </p>

                <hr style={{ margin: '0 0 24px 0' }}/> 

                <div 
                  className="d-flex flex-column" 
                  style={{ 
                    textAlign: 'justify', 
                    margin: '0 20px 0 20px', 
                    fontSize: '12px' 
                  }}
                >
                  {/* Informasi Pengumuman */}
                  <p>
                    Pastikan untuk memeriksa jadwal pelajaran secara berkala. 
                    Jika ada perubahan, akan diinformasikan melalui email. 
                    Untuk pertanyaan lebih lanjut, silahkan hubungi sekolah
                  </p>

                  {/* Email Sekolah */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={emailIcon} 
                      alt="email" 
                      width="20px" 
                      height="20px"
                      style={
                        {
                          marginRight: '5px'
                        }
                      } 
                    />

                    <span> smpplus@babussalam.ac.id </span>
                  </div>
                  
                  <br />

                  {/* Kontak Sekolah */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={phoneIcon} 
                      alt="phone" 
                      width="20px" 
                      height="20px"
                      style={
                        {
                          marginRight: '5px'
                        }
                      } 
                    />

                    <span> +62-812-4567-8910 </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardAdmin;