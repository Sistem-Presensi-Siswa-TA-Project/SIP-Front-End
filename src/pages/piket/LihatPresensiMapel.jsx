// Filename: LihatPresensi-Piket.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card } from '../../components/Molekul.jsx';
import { SecondaryButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';

function LihatPresensiPiket() {
  // Navigasi
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result || [];
  const filter = location.state?.filter || {};

  // State
  const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);

  // Icon from iconList
  const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
  const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
  const hadirIcon = iconList.find((i) => i.label === 'Hadir Icon')?.src;
  const izinIcon = iconList.find((i) => i.label === 'Izin Icon')?.src;
  const sakitIcon = iconList.find((i) => i.label === 'Sakit Icon')?.src;
  const alpaIcon = iconList.find((i) => i.label === 'Alpa Icon')?.src;

  function formatTanggalIndo(tanggal) {
    if (!tanggal) return '-';
    const bulan = [
      '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    // Ubah jadi format "YYYY-MM-DD"
    const [tahun, bln, tgl] = tanggal.split('-');
    if (!tahun || !bln || !tgl) return tanggal;
    return `${parseInt(tgl)} ${bulan[parseInt(bln)]} ${tahun}`;
  }

  return (
    <div>
      <Header> Presensi Mapel </Header>

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
            onClick={() => navigate('/piket/cari-presensi')}
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

            <span 
              style={{ 
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
              marginBottom: '30px',
            }}
          >
            <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '22px' }}>
              Profil Pencarian
            </h3>

            <div style={{ marginBottom: 24 }}>
              {[
                { label: 'Nama Siswa', value: filter.siswa || '-' },
                { label: 'Kelas', value: filter.kelas || '-' },
                { label: 'Mata Pelajaran', value: filter.mapel || '-' },
                { label: 'Tanggal Presensi', value: formatTanggalIndo(filter.tanggal) }
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '16px',
                    fontSize: 16,
                  }}
                >
                  <div style={{ width: 140 }}> {item.label} </div>
                  <div style={{ marginLeft: '25px', textAlign: 'center' }}> : </div>
                  <div style={{ marginLeft: '10px', flex: 1, wordBreak: 'break-word' }}> {item.value} </div>
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
                    <th style={{ padding: '16px' }}> Nomor Induk </th>
                    <th style={{ padding: '16px' }}> Nama Siswa </th>
                    <th style={{ padding: '16px' }}> Mata Pelajaran </th>
                    <th style={{ padding: '16px' }}> Kelas </th>
                    <th style={{ padding: '16px' }}> Keterangan </th>
                  </tr>
                </thead>

                <tbody>
                  {result.length === 0 ? (
                    <tr>
                      <td colSpan="6"> Data tidak ditemukan! </td>
                    </tr>
                  ) : (
                    result.map((row, i) => (
                      <tr key={row.id_presensi_mapel || i}>
                        <td className="border-right" style={{ padding: '12px' }}> {i + 1} </td>
                        <td style={{ padding: '12px' }}> {row.nisn || '-'} </td>
                        <td style={{ padding: '12px', textAlign: 'left' }}> {row.nama_siswa} </td>
                        <td style={{ padding: '12px' }}> {row.nama_mapel} </td>
                        <td style={{ padding: '12px' }}> {row.kelas} </td>
                        <td style={{ padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          {row.keterangan === 'H' && <img src={hadirIcon} alt="Hadir" width={28} />}
                          {row.keterangan === 'I' && <img src={izinIcon} alt="Izin" width={28} />}
                          {row.keterangan === 'S' && <img src={sakitIcon} alt="Sakit" width={28} />}
                          {row.keterangan === 'A' && <img src={alpaIcon} alt="Alpa" width={28} />}
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

export default LihatPresensiPiket;