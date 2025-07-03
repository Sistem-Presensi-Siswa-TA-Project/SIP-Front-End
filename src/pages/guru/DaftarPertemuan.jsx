// Filename: DaftarPertemuan.jsx
import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card } from '../../components/Molekul.jsx';
import { SecondaryButton, InfoButton, SuccessButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';

function DaftarPertemuan() {
    // State Hovering
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    
    // Navigasi Page
    const navigate = useNavigate();
    const { kelasId } = useParams();
    const location = useLocation();
    const prefix = location.pathname.startsWith('/piket') ? '/piket' : '/guru';

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const presensiButtonBlack = iconList.find((i) => i.label === 'Presensi Button Black')?.src;

    // Dummy data pertemuan
    const daftarPertemuan = Array(10).fill({
        label: 'Pertemuan ke-',
        tanggal: 'Tanggal Pertemuan',
    });

    return (
        <div>
            <Header> Daftar Pertemuan </Header>

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

                    {/* Daftar Guru/Mapel */}
                    <Card style={{ width: '100%', marginTop: '45px', padding: '30px' }}>
                        {/* Title */}
                        <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '20px' }}> 
                            Daftar Pertemuan Kelas {kelasId?.toUpperCase()}
                        </h3>

                        {/* Tombol Simpan */}
                        <div className="d-flex justify-content-start justify-content-md-end" style={{ marginRight: '5px' }}>
                            <SuccessButton
                                className="d-flex align-items-center justify-content-center"
                                width="200px"
                                height="43px"
                                style={{
                                    padding: '20px',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    boxShadow: successButtonHovering
                                        ? '4px 4px 8px rgba(0, 0, 0, 0.5)'
                                        : '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                    transition: 'box-shadow 0.2s ease-in-out',
                                }}
                                onMouseEnter={() => setSuccessButtonHovering(true)}
                                onMouseLeave={() => setSuccessButtonHovering(false)}
                            >
                                + Tambah Presensi
                            </SuccessButton>
                        </div>

                        {/* Wrapper Tabel */}
                        <div className="table-responsive" style={{ marginTop: '20px', borderRadius: '10px', border: '2px solid #D6D6D6' }}>
                            <Table className="custom-table">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'left', padding: '16px 16px 16px 50px', fontSize: '18px' }}> Daftar Pertemuan </th>
                                        <th style={{ textAlign: 'right', padding: '16px 55px 16px 16px', fontSize: '18px' }}> Aksi </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {daftarPertemuan.map((pertemuan, i) => (
                                        <tr key={i}>
                                            <td style={{ padding: '14px 14px 14px 25px' }}>
                                                <div className="d-flex align-items-start gap-3">
                                                    {/* Bulatan Hijau */}
                                                    <div
                                                        className="my-auto"
                                                        style={{
                                                            width: '10px',
                                                            height: '10px',
                                                            borderRadius: '50%',
                                                            backgroundColor: '#379777',
                                                            marginTop: '4px',
                                                        }}
                                                    />

                                                    {/* Nama Guru dan Mapel */}
                                                    <div className="d-flex flex-column">
                                                        <span style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '4px' }}> {pertemuan.label}{i+1} </span>
                                                        <span style={{ color: '#666', fontSize: '14px', textAlign: 'left' }}> {pertemuan.tanggal} </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td 
                                                className="d-flex justify-content-end align-items-center" 
                                                style={{ textAlign: 'right', padding: '20px 20px 14px 14px' }}
                                            >
                                                {/* Tombol Lihat */}
                                                <InfoButton
                                                    height="35px"
                                                    width="105px"
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '6px',
                                                        boxShadow: hoveredId === i ? 'inset 2px 2px 10px rgba(0, 0, 0, 0.45)' : 'none',
                                                        transition: 'box-shadow 0.2s ease-in-out',
                                                    }}
                                                    onClick={() => navigate(
                                                        `${prefix}/kelas/${kelasId?.toUpperCase()}/pertemuan/lihat-presensi`
                                                    )}
                                                    onMouseEnter={() => setHoveredId(i)}
                                                    onMouseLeave={() => setHoveredId(null)}
                                                >
                                                    <img
                                                        src={presensiButtonBlack}
                                                        alt="Presensi"
                                                        width="20"
                                                        height="20"
                                                    />
                                                    <span style={{ fontWeight: 'bold', fontSize: '13px' }}> 
                                                        Lihat 
                                                    </span>
                                                </InfoButton>
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

export default DaftarPertemuan;