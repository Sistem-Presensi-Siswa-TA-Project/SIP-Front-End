// Filename: PresensiPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card } from '../components/Molekul.jsx';
import { DangerButton, SecondaryButton, SuccessButton } from '../components/Button.jsx';
import { handlePresensiChange } from '../handlers/PresensiHandler.jsx';
import { iconList } from '../data/iconData.js';

function PresensiForm() {
    const navigate = useNavigate();
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [dangerButtonHovering, setDangerButtonHovering] = useState(false);

    const [presensiData, setPresensiData] = useState(
        // default semua "hadir"
        Array(20).fill('hadir')
    );

    const handleReset = () => {
        // default semua "hadir"
        setPresensiData(Array(20).fill('hadir')); 
    };

    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const hadirIcon = iconList.find((i) => i.label === 'Hadir Icon')?.src;
    const izinIcon = iconList.find((i) => i.label === 'Izin Icon')?.src;
    const sakitIcon = iconList.find((i) => i.label === 'Sakit Icon')?.src;
    const alpaIcon = iconList.find((i) => i.label === 'Alpa Icon')?.src;

    return (
        <div>
        <Header> Form Presensi </Header>

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
                    ['Nama Guru', 'Mr. Sukiman Bin Sukijan'],
                    ['Mata Pelajaran', 'Bahasa Indonesia'],
                    ['Kelas', '7A'],
                    ['Jumlah Siswa', '20 siswa'],
                    ['Tahun Ajaran', '2024/2025'],
                    ['Pertemuan ke-', '2'],
                    ['Tanggal', '22 Juni 2025'],
                ].map(([label, value], index) => (
                    <div key={index} style={{ display: 'flex' }}>
                    <div style={{ width: '180px', fontWeight: 'bold' }}> {label} </div>
                    <div style={{ width: '12px' }}> : </div>
                    <div style={{ flex: 1 }}> {value} </div>
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
                <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                    <div className="d-flex align-items-center gap-1">
                        <img src={hadirIcon} alt="Hadir" width="28" height="28" /> <strong> = Hadir </strong>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        <img src={izinIcon} alt="Izin" width="28" height="28" /> <strong> = Izin </strong>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        <img src={sakitIcon} alt="Sakit" width="28" height="28" /> <strong> = Sakit </strong>
                    </div>
                    <div className="d-flex align-items-center gap-1">
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
                    <Table className="custom-table border-vertikal">
                        <thead style={{ backgroundColor: '#D6E7F9', textAlign: 'center' }}>
                            <tr>
                                <th style={{ minWidth: '30px', padding: '16px' }}> No. </th>
                                <th style={{ minWidth: '130px', padding: '16px' }}> NIS </th>
                                <th style={{ minWidth: '250px', padding: '16px' }}> Nama Siswa </th>
                                <th style={{ width: '70px', padding: '16px' }}> Hadir </th>
                                <th style={{ width: '70px', padding: '16px' }}> Izin </th>
                                <th style={{ width: '70px', padding: '16px' }}> Sakit </th>
                                <th style={{ width: '70px', padding: '16px' }}> Alpa </th>
                            </tr>
                        </thead>

                        <tbody>
                            {[...Array(20)].map((_, i) => (
                                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#F3F3F3' : '#FFF' }}>
                                    <td className="text-center" style={{ verticalAlign: 'middle', padding: '14px' }}> {i+1}. </td>
                                    <td className="text-center" style={{ verticalAlign: 'middle', padding: '14px' }}> 210102039 </td>
                                    <td className="text-left" style={{ verticalAlign: 'middle', padding: '14px' }}> Nama Siswa </td>
                                    {['hadir', 'izin', 'sakit', 'alpa'].map((status, idx) => (
                                        <td
                                            key={idx}
                                            className={`text-center`}
                                            style={{ width: '70px', padding: '10px 6px', verticalAlign: 'middle' }}
                                        >
                                            <input
                                                className={`custom-radio ${status}`}
                                                type="radio"
                                                name={`presensi-${i}`}
                                                id={`presensi-${i}-${status}`}
                                                value={status}
                                                checked={presensiData[i] === status}
                                                onChange={() => handlePresensiChange(i, status, presensiData, setPresensiData)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                
                {/* Wrap Button Simpan & Reset */}
                <div className="d-flex flex-row justify-content-end gap-4">
                    {/* Tombol Reset */}
                    <div className="d-flex justify-content-end mt-4">
                        <DangerButton
                            className="d-flex align-items-center justify-content-center"
                            width="120px"
                            height="45px"
                            style={{
                                padding: '8px 28px',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                borderRadius: '6px',
                                boxShadow: dangerButtonHovering
                                    ? '4px 4px 8px rgba(0, 0, 0, 0.5)'
                                    : '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                transition: 'box-shadow 0.2s ease-in-out',
                            }}
                            onMouseEnter={() => setDangerButtonHovering(true)}
                            onMouseLeave={() => setDangerButtonHovering(false)}
                            onClick={handleReset}
                        >
                            RESET
                        </DangerButton>
                    </div>

                    {/* Tombol Simpan */}
                    <div className="d-flex justify-content-end mt-4">
                        <SuccessButton
                            className="d-flex align-items-center justify-content-center"
                            width="120px"
                            height="45px"
                            style={{
                                padding: '8px 28px',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                borderRadius: '6px',
                                boxShadow: successButtonHovering
                                    ? '4px 4px 8px rgba(0, 0, 0, 0.5)'
                                    : '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                transition: 'box-shadow 0.2s ease-in-out',
                            }}
                            onMouseEnter={() => setSuccessButtonHovering(true)}
                            onMouseLeave={() => setSuccessButtonHovering(false)}
                        >
                            SIMPAN
                        </SuccessButton>
                    </div>
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

export default PresensiForm;