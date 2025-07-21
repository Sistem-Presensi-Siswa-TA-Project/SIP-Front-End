// Filename: LihatPresensi-Piket.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card } from '../../components/Molekul.jsx';
import { SecondaryButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';

function LihatPresensiPiket() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result || [];
  const filter = location.state?.filter || {};

  const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);

  // Icon from iconList
  const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
  const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;

  // Fungsi ubah format tanggal
  function formatTanggalIndo(tanggal) {
    if (!tanggal) return '-';

    const bulan = [
      '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const [tahun, bln, tgl] = tanggal.split('-');
    if (!tahun || !bln || !tgl) return tanggal;
    return `${parseInt(tgl)} ${bulan[parseInt(bln)]} ${tahun}`;
  }

  return (
    <div>
      <Header> Presensi Piket </Header>

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
              Profil Pencarian
            </h3>

            <div style={{ marginBottom: 24 }}>
              {[
                { label: 'Nama Siswa', value: filter.siswa || '-' },
                { label: 'Kelas', value: filter.kelas || '-' },
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
                    <th style={{ padding: '16px' }}> Kelas </th>
                    <th style={{ padding: '16px 12px 16px 12px' }}> Waktu Masuk </th>
                    <th style={{ padding: '16px 12px 16px 12px' }}> Waktu Pulang </th>
                  </tr>
                </thead>

                <tbody>
                  {result.length === 0 ? (
                    <tr>
                      <td colSpan="6"> Data tidak ditemukan! </td>
                    </tr>
                  ) : (
                    result.map((row, i) => (
                      <tr key={row.id_presensi_piket || i}>
                        <td className="border-right" style={{ padding: '14px' }}> {i + 1} </td>
                        <td style={{ padding: '14px' }}> {row.nisn || '-'} </td>
                        <td style={{ padding: '14px', textAlign: 'left' }}> {row.nama_siswa} </td>
                        <td style={{ padding: '14px' }}> {row.kelas} </td>
                        <td style={{ padding: '14px 10px 14px 10px' }}> {row.waktu_masuk || '-'} </td>
                        <td style={{ padding: '14px 10px 14px 10px' }}> {row.waktu_pulang || '-'} </td>
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