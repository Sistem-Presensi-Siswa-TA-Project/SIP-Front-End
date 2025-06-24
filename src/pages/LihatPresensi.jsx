// Filename: LihatPresensi.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card } from '../components/Molekul.jsx';
import { SecondaryButton, InfoButton } from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';

function LihatPresensi() {
  const navigate = useNavigate();
  const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
  const [infoButtonHovering, setInfoButtonHovering] = useState(false);

  const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
  const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
  const hadirIcon = iconList.find((i) => i.label === 'Hadir Icon')?.src;
  const izinIcon = iconList.find((i) => i.label === 'Izin Icon')?.src;
  const sakitIcon = iconList.find((i) => i.label === 'Sakit Icon')?.src;
  const alpaIcon = iconList.find((i) => i.label === 'Alpa Icon')?.src;
  const presensiButtonBlack = iconList.find((i) => i.label === 'Presensi Button Black')?.src;

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
            onClick={() => navigate(-1)}
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
                ['Nama Guru', 'Sukiman Bin Sukijan'],
                ['Mata Pelajaran', 'Bahasa Indonesia'],
                ['Kelas', '7A'],
                ['Jumlah Siswa', '20 siswa'],
                ['Tahun Ajaran', '2024/2025'],
                ['Pertemuan ke-', '2'],
                ['Tanggal', '22 Juni 2025'],
              ].map(([label, value], index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className="d-flex flex-row gap-4"> 
                    <div className="custom-width-form-besar"> {label} </div>
                    <div style={{ width: '15px' }}> : </div>
                  </div>

                  <div 
                    style={{ 
                        wordBreak: 'break-word', 
                        overflowWrap: 'break-word', 
                    }}
                  > 
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
                  onMouseEnter={() => setInfoButtonHovering(true)}
                  onMouseLeave={() => setInfoButtonHovering(false)}
                  onClick={() => navigate('/presensi-form')}
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
                    <th className="border-right"> No. </th>
                    <th> NIS </th>
                    <th> Nama Siswa </th>
                    <th> Mata Pelajaran </th>
                    <th> Kelas </th>
                    <th> Keterangan </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(20)].map((_, i) => (
                    <tr key={i}>
                      <td className="border-right"> {i+1}. </td>
                      <td> 20242025 </td>
                      <td> Nama Siswa </td>
                      <td> Mata Pelajaran </td>
                      <td> Kelas </td>
                      <td>
                        <img
                          src={[
                            alpaIcon,
                            hadirIcon,
                            sakitIcon,
                            hadirIcon,
                            sakitIcon,
                            alpaIcon,
                            izinIcon,
                            izinIcon,
                            alpaIcon,
                            hadirIcon,
                            sakitIcon,
                            hadirIcon,
                            sakitIcon,
                            alpaIcon,
                            izinIcon,
                            izinIcon,
                            alpaIcon,
                            hadirIcon,
                            sakitIcon,
                            hadirIcon,
                          ][i]}
                          alt="status"
                          width="28"
                          height="28"
                          style={{
                            display: 'block',
                            margin: '0 auto',
                          }}
                        />
                      </td>
                    </tr>
                  ))}
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