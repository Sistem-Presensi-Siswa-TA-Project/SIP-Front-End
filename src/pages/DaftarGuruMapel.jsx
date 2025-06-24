// Filename: Daftar-GuruMapel.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card } from '../components/Molekul.jsx';
import { SecondaryButton, InfoButton } from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';

function DaftarGuruMapel() {
    const navigate = useNavigate();
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const { kelasId } = useParams();

    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const presensiButtonBlack = iconList.find((i) => i.label === 'Presensi Button Black')?.src;

    // Dummy data guru
    const daftarGuru = Array(8).fill({
        nama: 'Nama Guru',
        mapel: 'Mata Pelajaran',
    });

    return (
        <div>
            <Header> Daftar Guru & Mapel </Header>

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
                        <h4 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '22px' }}> 
                            Kelas {kelasId?.toUpperCase()}
                        </h4>

                        {/* Wrapper Tabel */}
                        <div className="table-responsive" style={{ marginTop: '25px', borderRadius: '10px', border: '2px solid #D6D6D6' }}>
                            <Table className="custom-table">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'left', padding: '16px 16px 16px 50px', fontSize: '18px' }}> Daftar Guru </th>
                                        <th style={{ textAlign: 'right', padding: '16px 55px 16px 16px', fontSize: '18px' }}> Aksi </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {daftarGuru.map((guru, i) => (
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
                                                        <span style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '4px' }}> {guru.nama} </span>
                                                        <span style={{ color: '#666', fontSize: '14px', textAlign: 'left' }}> {guru.mapel} </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="d-flex justify-content-end align-items-center" style={{ textAlign: 'right', padding: '20px 20px 14px 14px' }}>
                                                {/* Tombol Presensi */}
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
                                                    onClick={() => navigate('/lihat-presensi')}
                                                    onMouseEnter={() => setHoveredId(i)}
                                                    onMouseLeave={() => setHoveredId(null)}
                                                >
                                                    <img
                                                        src={presensiButtonBlack}
                                                        alt="Presensi"
                                                        width="20"
                                                        height="20"
                                                    />
                                                    <span style={{ fontWeight: 'bold', fontSize: '13px' }}> Presensi </span>
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

export default DaftarGuruMapel;