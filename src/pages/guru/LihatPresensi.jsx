// Filename: LihatPresensi-Guru.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card } from '../../components/Molekul.jsx';
import { SecondaryButton, InfoButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { getPresensiMapelByJadwalTanggal } from '../../handlers/PresensiHandler.jsx';
import { getJadwalById } from '../../handlers/JadwalHandler.jsx';
import { getMapelById } from '../../handlers/MapelHandler.jsx';
import { getGuruByNomorInduk } from '../../handlers/GuruHandler.jsx';

function LihatPresensi() {
  // State Hovering
  const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
  const [infoButtonHovering, setInfoButtonHovering] = useState(false);
  const [dataPresensi, setDataPresensi] = useState([]);
  const [jadwal, setJadwal] = useState(null);
  const [namaGuru, setNamaGuru] = useState('');
  const [namaMapel, setNamaMapel] = useState('');

  // Navigasi Page
  const navigate = useNavigate();
  const { kelasId } = useParams();
  const location = useLocation();
  const prefix = location.pathname.startsWith('/admin') 
    ? '/admin' : (location.pathname.startsWith('/guru') 
    ? '/guru' : '/piket');
  const params = new URLSearchParams(location.search);
  const idJadwal = params.get('id');
  const tanggalPresensi = params.get('tgl');

  // Icon from iconList
  const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
  const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
  const hadirIcon = iconList.find((i) => i.label === 'Hadir Icon')?.src;
  const izinIcon = iconList.find((i) => i.label === 'Izin Icon')?.src;
  const sakitIcon = iconList.find((i) => i.label === 'Sakit Icon')?.src;
  const alpaIcon = iconList.find((i) => i.label === 'Alpa Icon')?.src;
  const presensiButtonBlack = iconList.find((i) => i.label === 'Presensi Button Black')?.src;

  // Ubah format tanggal agar sesuai
  function formatTanggalIndo(dateStr) {
    const bulanIndo = [
        "Januari","Februari","Maret","April","Mei","Juni",
        "Juli","Agustus","September","Oktober","November","Desember"
    ];

    const [year, month, day] = dateStr.split('-');
    return `${day} ${bulanIndo[parseInt(month)-1]} ${year}`;
  }

  // Fetch data profil presensi
  useEffect(() => {
    async function fetchProfilPresensi() {
      if (!idJadwal) return;
      try {
        // Ambil data jadwal
        const jadwalData = await getJadwalById(idJadwal);
        setJadwal(jadwalData);

        // Ambil nama guru
        if (jadwalData?.nomor_induk_guru) {
          const guruData = await getGuruByNomorInduk(jadwalData.nomor_induk_guru);
          setNamaGuru(guruData?.nama || '-');
        }

        // Ambil nama mapel
        if (jadwalData?.id_mapel) {
          const mapelData = await getMapelById(jadwalData.id_mapel);
          setNamaMapel(mapelData?.nama || '-');
        }
      } catch (err) {
        console.error(err);
        setJadwal(null);
        setNamaGuru('');
        setNamaMapel('');
      }
    }
    fetchProfilPresensi();
  }, [idJadwal]);

  // Fetch data presensi mapel
  useEffect(() => {
    async function fetchPresensi() {
      if (!idJadwal || !tanggalPresensi) return;

      try {
        const data = await getPresensiMapelByJadwalTanggal(idJadwal, tanggalPresensi);
        setDataPresensi(data || []);
      } catch (err) {
        setDataPresensi([]);
        console.error(err);
      }
    }
    fetchPresensi();
  }, [idJadwal, tanggalPresensi]);

  // Ubah keterangan jadi icon
  function getStatusIcon(status) {
  switch ((status || '').toUpperCase()) {
    case 'H':
      return hadirIcon;
    case 'I':
      return izinIcon;
    case 'S':
      return sakitIcon;
    case 'A':
      return alpaIcon;
    default:
      return '';
  }
}

  return (
    <div>
      <Header> Lihat Presensi </Header>

      <main
        className="d-flex justify-content-center flex-wrap"
        style={{ gap: '20px' }}
      >
        <div className="d-flex flex-column align-items-start w-100 px-4" style={{ maxWidth: '1100px', paddingTop: '40px', }}>
          {/* Button Back */}
          <SecondaryButton
            className="animate-button d-flex flex-row gap-2"
            width="125px"
            height="45px"
            onClick={() => navigate(`${prefix}/kelas/${kelasId}/pertemuan?id=${idJadwal}`)}
            onMouseEnter={() => setSecondaryButtonHovering(true)}
            onMouseLeave={() => setSecondaryButtonHovering(false)}
            style={{ 
              justifyContent: 'center', 
              alignItems: 'center',
              boxShadow: secondaryButtonHovering ? '6px 6px 12px rgba(0, 0, 0, 0.5)' : '2px 2px 8px rgba(0, 0, 0, 0.5)',
              transition: 'box-shadow 0.2s ease-in-out',
            }}
          >
            <img
              src={secondaryButtonHovering ? leftArrowYellow : leftArrowBlack}
              alt="Back"
              width="15"
              height="15"
              style={{ 
                marginLeft: '4px',
              }}
            />

            <span style={{ 
                fontSize: '18px', 
                color: secondaryButtonHovering ? '#FFC107' : '#000', 
                marginLeft: '2px' 
              }}
            > 
              Kembali 
            </span>

          </SecondaryButton>
          
          {/* Profile Presensi */}
          <Card
            style={{
              width: '100%',
              marginTop: '35px',
              padding: '30px',
            }}
          >
            <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '22px' }}>
              Profil Presensi
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '16px', color: '#1c1c1c' }}>
              {[
                ['Nama Guru', namaGuru || '-'],
                ['Mata Pelajaran', namaMapel || '-'],
                ['Kelas', kelasId?.toUpperCase() || '-'],
                ['Jumlah Siswa', dataPresensi.length + ' siswa'],
                ['Tahun Ajaran', jadwal?.tahun_ajaran || '-'],
                ['Tanggal Presensi', tanggalPresensi ? formatTanggalIndo(tanggalPresensi) : '-'],
              ].map(([label, value], index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className="d-flex flex-row gap-4"> 
                    <div className="custom-width-form-besar"> {label} </div>
                    <div style={{ width: '15px' }}> : </div>
                  </div>
                  
                  <div style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}> 
                    {value} 
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Presensi Content */}
          <Card style={{ width: '100%', marginTop: '45px', padding: '30px' }}>
            {/* Title */}
            <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '22px' }}> 
              Presensi Siswa 
            </h3>

            {/* Wrapper untuk Keterangan + Tombol Edit */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
              {/* Keterangan */}
              <div className="d-flex flex-wrap align-items-center gap-3">
                <div className="d-flex justify-content-center align-items-center gap-1">
                  <img src={hadirIcon} alt="Hadir" width="28" height="28" /> <strong> = Hadir </strong>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-1">
                  <img src={izinIcon} alt="Izin" width="28" height="28" /> <strong> = Izin </strong>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-1">
                  <img src={sakitIcon} alt="Sakit" width="28" height="28" /> <strong> = Sakit </strong>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-1">
                  <img src={alpaIcon} alt="Alpa" width="28" height="28" /> <strong> = Alpa </strong>
                </div>
              </div>

              {/* Tombol Edit Presensi */}
              <div className="d-flex justify-content-end">
                <InfoButton
                  height="37px"
                  width="100px"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: infoButtonHovering
                      ? '4px 4px 8px rgba(0, 0, 0, 0.5)'
                      : '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    transition: 'box-shadow 0.2s ease-in-out',
                  }}
                  onClick={() => navigate(
                    `${prefix}/kelas/${kelasId?.toUpperCase()}/pertemuan/lihat-presensi/presensi-form?id=${idJadwal}&tgl=${tanggalPresensi}`
                  )}
                  onMouseEnter={() => setInfoButtonHovering(true)}
                  onMouseLeave={() => setInfoButtonHovering(false)}
                >
                  <img src={presensiButtonBlack} alt="Presensi" width="20" height="20" />

                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}> Ubah </span>
                </InfoButton>
              </div>
            </div>

            {/* Tabel Presensi */}
            <div 
              className="table-responsive" 
              style={{ 
                marginTop: '25px', 
                borderRadius: '10px', 
                border: '2px solid #D6D6D6',
              }}
            >
              <Table className="custom-table">
                <thead>
                  <tr>
                    <th className="border-right" style={{ padding: '16px' }}> No. </th>
                    <th style={{ padding: '16px' }}> NISN </th>
                    <th style={{ padding: '16px' }}> Nama Siswa </th>
                    <th style={{ padding: '16px' }}> Mata Pelajaran </th>
                    <th style={{ padding: '16px' }}> Kelas </th>
                    <th style={{ padding: '16px' }}> Keterangan </th>
                  </tr>
                </thead>

                <tbody>
                  {dataPresensi.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center' }}>
                        Tidak ada data presensi.
                      </td>
                    </tr>
                  ) : (
                    dataPresensi.map((item, i) => (
                      <tr key={i}>
                        <td className="border-right" style={{ padding: '14px' }}> {i + 1}. </td>
                        <td style={{ padding: '14px' }}> {item.nisn || '-'} </td>
                        <td style={{ padding: '14px', textAlign: 'left' }}> {item.nama_siswa || '-'} </td>
                        <td style={{ padding: '14px' }}> {namaMapel || '-'} </td>
                        <td style={{ padding: '14px' }}> {item.kelas || '-'} </td>
                        <td style={{ padding: '14px' }}>
                          <img
                            src={getStatusIcon(item.keterangan)}
                            alt={item.keterangan}
                            width="28"
                            height="28"
                            style={{ display: 'block', margin: '0 auto' }}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </Card>
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

export default LihatPresensi;