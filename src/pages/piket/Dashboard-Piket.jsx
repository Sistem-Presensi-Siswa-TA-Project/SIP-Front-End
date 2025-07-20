// Filename: Dashboard-Piket.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Sidebar, Card, CardPopUp } from '../../components/Molekul.jsx';
import { LightButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { getPiketByKodePiket } from '../../handlers/PiketHandler.jsx';
import { getGuruByNomorInduk } from '../../handlers/GuruHandler.jsx';
import { getSiswaByNISN } from '../../handlers/SiswaHandler.jsx';

function DashboardPiket() {
  // Navigasi
  const navigate = useNavigate();

  // State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [petugasPiket, setPetugasPiket] = useState({
    nama: 'Nama User',
    nomor_induk: 'Nomor Induk User'
  });
  const [showPopup, setShowPopup] = useState(false);
  const [statusPiket, setStatusPiket] = useState('');

  // Mengambil icon dari iconData.js
  const menuIconBlack = iconList.find((i) => i.label === 'Menu Icon Black')?.src;
  const menuIconWhite = iconList.find((i) => i.label === 'Menu Icon White')?.src;
  const userIcon = iconList.find((i) => i.label === 'User Icon')?.src;
  const emailIcon = iconList.find((i) => i.label === 'Email Icon')?.src;
  const phoneIcon = iconList.find((i) => i.label === 'Phone Icon')?.src;
  const presensiMapel = iconList.find((i) => i.label === 'Presensi Mapel')?.src;
  const scanPresensi = iconList.find((i) => i.label === 'Scan Presensi')?.src;
  const menuOpenBlack = iconList.find((i) => i.label === 'Menu Open Black')?.src;
  const menuOpenWhite = iconList.find((i) => i.label === 'Menu Open White')?.src;
  const arrowRightBlack = iconList.find((i) => i.label === 'Arrow Right Black')?.src;
  const yellowWarning = iconList.find(i => i.label === "Yellow Warning Icon")?.src;

  // Proses fetch data
  useEffect(() => {
    async function fetchPetugasPiket() {
      try {
        // 1. Ambil kode piket dari localStorage
        const kodePiket = localStorage.getItem('username');
        if (!kodePiket) return;

        // 2. Ambil data piket untuk dapatkan nomor_induk
        const dataPiket = await getPiketByKodePiket(kodePiket);
        const nomorInduk = dataPiket?.nomor_induk;
        setStatusPiket(dataPiket?.status || '')
        if (!nomorInduk) return;

        // 3. Cari nama lewat tabel guru
        const dataGuru = await getGuruByNomorInduk(nomorInduk);
        if (dataGuru && dataGuru.nama) {
          setPetugasPiket({ nama: dataGuru.nama, nomor_induk: nomorInduk });
          return;
        }

        // 4. Jika bukan di tabel guru, coba cari di tabel siswa
        const dataSiswa = await getSiswaByNISN(nomorInduk);
        if (dataSiswa && dataSiswa.nama) {
          setPetugasPiket({ nama: dataSiswa.nama, nomor_induk: nomorInduk });
          return;
        }

        // 5. Jika tidak ditemukan, pakai default
        setPetugasPiket({ nama: 'Nama User', nomor_induk: nomorInduk });
      } catch (err) {
        console.error(err);
        setStatusPiket('');
        setPetugasPiket({ nama: 'Nama User', nomor_induk: 'Nomor Induk User' });
      }
    }
    fetchPetugasPiket();
  }, []);

  // Handler toggle button buat sidebar
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
          <>
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
                    { label: 'Beranda', icon: 'Dashboard Icon' },
                    { label: 'Profil', icon: 'Profile Icon' },
                    { label: 'Cari Presensi', icon: 'Cari Presensi Icon' },
                    { label: 'Lainnya', icon: 'Lainnya Icon Black', hasDropdown: true },
                  ],
                  dropdownItems: [
                    { label: 'Kontak', icon: 'Kontak Icon' },
                    { label: 'Informasi', icon: 'Informasi Icon' },
                    { label: 'Logout', icon: 'Logout Icon' },
                  ]
                }}

                pathMap={{
                  Beranda: '/piket',
                  Profil: statusPiket === 'OSIS' ? '/piket/profile/osis' : '/piket/profile',
                  'Cari Presensi': '/piket/cari-presensi',
                  Kontak: '/piket/kontak',
                  Informasi: '/piket/informasi',
                }}
              />
            </div>
          </>
        )}

        {/* Sidebar for Desktop only */}
        {sidebarOpen && (
          <div className="d-none d-lg-block" style={{ flexShrink: 0 }}>
            <Sidebar
              onClose={handleToggleSidebar}

              sidebarCustomMenu={{
                sidebarMenu: [
                  { label: 'Minimize', icon: 'Back Icon Black' },
                  { label: 'Beranda', icon: 'Dashboard Icon' },
                  { label: 'Profil', icon: 'Profile Icon' },
                  { label: 'Cari Presensi', icon: 'Cari Presensi Icon' },
                  { label: 'Lainnya', icon: 'Lainnya Icon Black', hasDropdown: true },
                ],
                dropdownItems: [
                  { label: 'Kontak', icon: 'Kontak Icon' },
                  { label: 'Informasi', icon: 'Informasi Icon' },
                  { label: 'Logout', icon: 'Logout Icon' },
                ]
              }}

              pathMap={{
                Beranda: '/piket',
                Profil: statusPiket === 'OSIS' ? '/piket/profile/osis' : '/piket/profile',
                'Cari Presensi': '/piket/cari-presensi',
                Kontak: '/piket/kontak',
                Informasi: '/piket/informasi',
              }}
            />
          </div>
        )}

        {/* Kolom Tengah */}
        <div
          className="d-flex flex-column align-items-center"
          style={{ flex: 6, gap: '20px', paddingTop: '35px', width: '100%' }}
        >
          {/* Kolom Atas (Identitas User) */}
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
                <strong style={{ fontSize: '18px', marginBottom: '3px'}}> {petugasPiket.nama || "-"} </strong>
                <small style={{ fontSize: '15px'}}> Petugas Piket </small>
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

          {/* Kolom Tengah */}
          <div className="d-flex flex-column flex-lg-row custom-container gap-5" style={{ marginTop: '20px', width: '900px' }}>
            {/* Kolom Kiri Bawah Tengah (Waktu & Tanggal) */}
            <Card className="w-100 mx-auto" style={{ width: '600px', height: '390px', display: 'flex', flexDirection: 'column' }}>
              {/* Bagian Atas: Tanggal */}
              <div>
                <p style={{ margin: '20px 0 15px 20px', fontSize: '22px' }}>
                  <strong>
                    {
                      new Date().toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    }
                  </strong>
                </p>
                <hr style={{ margin: '0 0 0 0', height: '4px' }} />
              </div>

              {/* Bagian Tengah: Jam */}
              <div 
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <h1 className="custom-clock" style={{ fontSize: '93px', margin: 0, color: '#000' }}>
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

            {/* Kolom Kanan Bawah tengah */}
            <div className="custom-container d-flex flex-column align-items-center justify-content-center" style={{ gap: '50px', width: '700px' }}>
              {/* Scan Presensi */}
              <Card 
                className="w-100 card-kecil" 
                style={{ height: '160px', position: 'relative' }} 
                onClick={() => navigate('/piket/scan-presensi')}
              >
                <div style={
                    {
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }
                  }
                >
                  <img 
                    src={scanPresensi} 
                    alt="scan presensi" 
                    width="80px" 
                    height="80px"
                    style={{ marginRight: '15px' }}
                    draggable={false} 
                  />
                  <span style={{ fontSize: '25px', fontWeight: 'bold', color: "#000" }}> Scan Presensi </span>
                </div>

                {/* Ikon panah kanan */}
                <img
                  src={arrowRightBlack}
                  alt="arrow"
                  width="35"
                  height="35"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '20px'
                  }}
                  draggable={false}
                />
              </Card>

              {/* Presensi Mata Pelajaran */}
              <Card 
                className="w-100 card-kecil" 
                style={{ height: '180px', position: 'relative' }}
                onClick={() => {
                  if (statusPiket === 'OSIS') {
                    setShowPopup(true);
                  } else {
                    navigate('/piket/kelas');
                  }
                }}
              >
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingBottom: '15px',
                  alignItems: 'center'
                }}>
                  <img 
                    src={presensiMapel} 
                    alt="presensi mapel" 
                    width="80px" 
                    height="80px"
                    style={{ marginRight: '15px' }}
                    draggable={false}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4px' }}>
                    <span style={{ fontSize: '25px', fontWeight: 'bold', color: "#000" }}> Presensi </span>
                    <span style={{ fontSize: '25px', fontWeight: 'bold', color: "#000" }}> Mata Pelajaran </span>
                  </div>
                </div>

                {/* Ikon panah kanan */}
                <img
                  src={arrowRightBlack}
                  alt="arrow"
                  width="35"
                  height="35"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '20px'
                  }}
                  draggable={false}
                />
              </Card>
            </div>
          </div>

          {/* Kolom Bawah (Pengumuman) */}
          <Card width="100%" height="auto" style={{ maxWidth: '900px', marginTop: '20px' }}>
            <p style={{ margin: '20px 0 15px 30px', fontSize: '22px' }}> 
              <strong> 
                Pengumuman
              </strong> 
            </p>

            <hr style={{ margin: '0 0 20px 0' }}/> 

            <div 
              className="paragraf-flex-container"
              style={{ 
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: '0 60px 35px 30px', 
                fontSize: '15px', 
                gap: '80px',
              }}
            >
              {/* Informasi Pengumuman */}
              <p style={{ flex: 1, textAlign: 'justify', marginBottom: 1 }}>
                Pastikan untuk memeriksa jadwal pelajaran secara berkala. 
                Jika ada perubahan, akan diinformasikan melalui email. 
                Pertanyaan lebih lanjut, silakan hubungi kontak yang tersedia.
              </p>

              {/* Kontak Sekolah */}
              <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  gap: '10px',
                  background: 'none',
                }}
              >
                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img 
                    src={emailIcon} 
                    alt="email" 
                    width="20px" 
                    height="20px" 
                    style={{ marginRight: '6px' }} 
                  />
                  <span> smpplusbabussalamdago@gmail.com </span>
                </div>

                {/* Telepon */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img 
                    src={phoneIcon} 
                    alt="phone" 
                    width="20px" 
                    height="20px" 
                    style={{ marginRight: '6px' }} 
                  />
                  
                  <span> +62-858-6082-9640 </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <CardPopUp
        open={showPopup}
        image={yellowWarning}
        borderColor="#FFC107"
        buttons={[
          {
            label: "Kembali ke Beranda",
            bgColor: "#FFC107",
            textColor: "#FFFFFF",
            borderColor: "#FFFFFF",
            onClick: () => setShowPopup(false),
          }
        ]}
      >
        PERHATIAN: Siswa OSIS tidak dapat melakukan presensi mata pelajaran!!
      </CardPopUp>

      <footer>
        <small style={{ fontSize: '14px', color: '#808080' }}>
          Copyright &copy; {new Date().getFullYear()} SMP Plus Babussalam. All Rights Reserved.
        </small>
      </footer>
    </div>
  );
}

export default DashboardPiket;