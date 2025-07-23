// Filename: Dashboard-Guru.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Sidebar, Card } from '../../components/Molekul.jsx';
import { LightButton, InfoButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { getJadwalByHaridanGuru } from '../../handlers/JadwalHandler.jsx';
import { getGuruByNomorInduk } from '../../handlers/GuruHandler.jsx';
import { getMapelById } from '../../handlers/MapelHandler.jsx';

function DashboardGuru() {
  // State Hovering
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [jadwalHariIni, setJadwalHariIni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guru, setGuru] = useState({ nama: "", nomor_induk: "" });

  // Navigasi Page
  const location = useLocation();
  const prefix = location.pathname.startsWith('/admin') 
  ? '/admin' : (location.pathname.startsWith('/guru') 
  ? '/guru' : '/piket');
  const navigate = useNavigate();

  // Mengambil icon dari iconData.js
  const menuIconBlack = iconList.find((i) => i.label === 'Menu Icon Black')?.src;
  const menuIconWhite = iconList.find((i) => i.label === 'Menu Icon White')?.src;
  const userIcon = iconList.find((i) => i.label === 'User Icon')?.src;
  const emailIcon = iconList.find((i) => i.label === 'Email Icon')?.src;
  const phoneIcon = iconList.find((i) => i.label === 'Phone Icon')?.src;
  const presensiButtonBlack = iconList.find((i) => i.label === 'Presensi Button Black')?.src;
  const menuOpenBlack = iconList.find((i) => i.label === 'Menu Open Black')?.src;
  const menuOpenWhite = iconList.find((i) => i.label === 'Menu Open White')?.src;
  const attendanceIcon = iconList.find((i) => i.label === 'Attendance Icon')?.src;

  // Mengambil nama hari ini (up-to-date)
  const hariIni = new Date().toLocaleDateString('id-ID', { weekday: 'long' });

  // Mengambil nomor induk guru
  const nomorIndukGuru = localStorage.getItem("username");

  // Mengambil data guru
  React.useEffect(() => {
    let isMounted = true;

    async function fetchGuru() {
      if (!nomorIndukGuru) return;
      try {
        const dataGuru = await getGuruByNomorInduk(nomorIndukGuru);
        if (isMounted && dataGuru) {
          setGuru({
            nama: dataGuru.nama || "",
            nomor_induk: dataGuru.nomor_induk || nomorIndukGuru
          });
        }
      } catch (err) {
        console.error('ERROR: ', err);
        setGuru({
          nama: "Nama User",
          nomor_induk: nomorIndukGuru
        });
      }
    }

    fetchGuru();
    return () => { isMounted = false; };
  }, [nomorIndukGuru]);

  // Mengambil data dari JadwalHandler.jsx
  React.useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);

      // 1. Ambil jadwal hari ini untuk guru ini
      const jadwal = await getJadwalByHaridanGuru(hariIni, nomorIndukGuru) || [];

      // 2. Untuk setiap jadwal, ambil nama mapel dari id_mapel
      const jadwalLengkap = await Promise.all(
        jadwal.map(async (item) => {
          let namaMapel = item.id_mapel;

          try {
            const mapel = await getMapelById(item.id_mapel);
            namaMapel = mapel?.nama || item.id_mapel;
          } catch {
            namaMapel = item.id_mapel;
          }

          return { ...item, namaMapel };
        })
      );

      if (isMounted) setJadwalHariIni(jadwalLengkap);
      setLoading(false);
    }

    if (nomorIndukGuru) fetchData();
    return () => { isMounted = false; };
  }, [hariIni, nomorIndukGuru]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Set waktu up-to-date
  React.useEffect(() => {
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
          <React.Fragment>
            {/* Overlay yang menutupi seluruh layar, tidak bisa di klik */}
            <div className="sidebar-overlay d-lg-none"/>

            {/* Sidebar tetap bisa di klik */}
            <div
              className="d-lg-none"
              style={{ position: 'fixed', left: 0, zIndex: 1000 }}
            >
              <Sidebar
                onClose={handleToggleSidebar}

                sidebarCustomMenu={{
                  sidebarMenu: [
                    { label: 'Minimize', icon: 'Back Icon Black' },
                    { label: 'Profil', icon: 'Profile Icon' },
                    { label: 'Lihat Presensi', icon: 'Presensi Icon' },
                    { label: 'Cetak Presensi', icon: 'Cetak Icon' },
                    { label: 'Lainnya', icon: 'Lainnya Icon Black', hasDropdown: true },
                  ],
                  dropdownItems: [
                    { label: 'Kontak', icon: 'Kontak Icon' },
                    { label: 'Informasi', icon: 'Informasi Icon' },
                    { label: 'Logout', icon: 'Logout Icon' },
                  ]
                }}

                pathMap={{
                  Profil: '/guru/profile',
                  'Lihat Presensi': '/guru/kelas',
                  'Cetak Presensi': '/guru/kelas',
                  Kontak: '/guru/kontak',
                  Informasi: '/guru/informasi',
                }}
              />
            </div>
          </React.Fragment>
        )}

        {/* Sidebar for Desktop only */}
        {sidebarOpen && (
          <div className="d-none d-lg-block" style={{ flexShrink: 0 }}>
            <Sidebar 
              onClose={handleToggleSidebar}

              sidebarCustomMenu={{
                sidebarMenu: [
                  { label: 'Minimize', icon: 'Back Icon Black' },
                  { label: 'Profil', icon: 'Profile Icon' },
                  { label: 'Lihat Presensi', icon: 'Presensi Icon' },
                  { label: 'Cetak Presensi', icon: 'Cetak Icon' },
                  { label: 'Lainnya', icon: 'Lainnya Icon Black', hasDropdown: true },
                ],
                dropdownItems: [
                  { label: 'Kontak', icon: 'Kontak Icon' },
                  { label: 'Informasi', icon: 'Informasi Icon' },
                  { label: 'Logout', icon: 'Logout Icon' },
                ]
              }}
              
              pathMap={{
                Profil: '/guru/profile',
                'Lihat Presensi': '/guru/kelas',
                'Cetak Presensi': '/guru/cetak-presensi',
                Kontak: '/guru/kontak',
                Informasi: '/guru/informasi',
              }}
            />
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
                  draggable={false}
                />
              </div>

              {/* Identitas User */}
              <div className="d-flex flex-column">
                <strong style={{ fontSize: '18px', marginBottom: '3px'}}> {guru.nama || "-"} </strong>
                <small style={{ fontSize: '15px'}}> Guru </small>
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
                  src={
                    sidebarOpen
                      ? (isHovering ? menuOpenWhite : menuOpenBlack)
                      : (isHovering ? menuIconWhite : menuIconBlack)
                  }
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
            <Card className="w-100 mx-auto d-flex justify-content-center align-items-center" style={{ width: '900px', height: '540px', padding: '16px' }}>
                <div
                  className="w-100 mx-auto d-flex flex-column align-items-center" 
                  style={
                    { 
                      backgroundColor: '#A3A3A3', 
                      width: '515px', 
                      height: '510px', 
                      borderRadius: '25px',
                      boxShadow: 'inset 0 0 16px rgba(0, 0, 0, 0.45)',
                      overflowY: 'auto',
                      padding: '20px',
                      gap: '20px',
                      scrollbarWidth: 'none',           // Untuk Firefox
                      msOverflowStyle: 'none',          // Untuk IE/Edge lama
                    }
                  }
                > 
                  {/* Highlight Jadwal */}
                  {loading ? (
                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}> 
                      Memuat jadwal.... 
                    </div>
                  ) : (
                    <>
                      {jadwalHariIni.length > 0 ? (
                        jadwalHariIni.map((item) => (
                          <Card
                            key={item.id_jadwal}
                            className="d-flex align-items-center justify-content-between"
                            style={{
                              width: '470px',
                              height: '115px',
                              padding: '16px',
                              borderRadius: '20px',
                              display: 'flex',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                            }}
                          >

                            {/* Icon placeholder */}
                            <div
                              style={{
                                width: '60px',
                                height: '60px',
                                backgroundColor: '#fff',
                                borderRadius: '16px',
                                marginLeft: '5px',
                                marginRight: '15px',
                                flexShrink: 0,
                                boxShadow: 'inset 2px 2px 10px rgba(0,0,0,0.45)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                              }}
                            >
                              <img
                                src={attendanceIcon}
                                alt="Attendance"
                                width="40"
                                height="40"
                                style={{ objectFit: "contain" }}
                                draggable={false}
                              />
                            </div>

                            {/* Text Info */}
                            <div style={{ flexGrow: 1 }}>
                              <strong style={{ display: 'block', marginBottom: '4px' }}> {item.namaMapel} </strong>
                              <span style={{ display: 'block', marginBottom: '4px' }}> {item.waktu} </span>
                              <span style={{ display: 'block' }}> Kelas {item.kelas} </span>
                            </div>

                            {/* Tombol Presensi */}
                            <InfoButton
                              variant="info"
                              height="35px"
                              width="105px"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                boxShadow: hoveredId === item.id_jadwal ? 'inset 2px 2px 10px rgba(0, 0, 0, 0.45)' : 'none',
                                transition: 'box-shadow 0.2s ease-in-out',
                              }}
                              onMouseEnter={() => setHoveredId(item.id_jadwal)}
                              onMouseLeave={() => setHoveredId(null)}
                              onClick={() => navigate(`${prefix}/kelas/${item.kelas}/pertemuan?id=${item.id_jadwal}`)}
                            >
                              <img src={presensiButtonBlack} alt="Presensi" width="20" height="20" />
                              <span style={{ fontWeight: 'bold', fontSize: '13px' }}> Presensi </span>
                            </InfoButton>
                          </Card>
                        ))
                      ) : (
                        <div
                          style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <p style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                            ~~ Tidak ada jadwal hari ini ~~
                          </p>
                        </div>
                      )}
                    </>
                  )}      
                </div>
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
              <Card className="w-100 card-kecil">
                <p style={{ margin: '20px 0 15px 20px' }}> 
                  <strong> 
                    Pengumuman
                  </strong> 
                </p>

                <hr style={{ margin: '0 0 24px 0' }}/> 

                <div 
                  className="paragraf-flex-container" 
                  style={{ 
                    display: 'flex',
                    flexDirection: 'column',
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

                    <span> smpplusbabussalamdago@gmail.com </span>
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

                    <span> +62-858-6082-9640 </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <small style={{ fontSize: '14px', color: '#808080' }}>
          Copyright &copy; {new Date().getFullYear()} SMP Plus Babussalam. All Rights Reserved.
        </small>
      </footer>
    </div>
  );
}

export default DashboardGuru;