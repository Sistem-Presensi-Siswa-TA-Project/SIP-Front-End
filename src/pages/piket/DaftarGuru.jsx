// Filename: DaftarGuru.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card } from '../../components/Molekul.jsx';
import { SecondaryButton, InfoButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { getJadwalByKelas } from '../../handlers/JadwalHandler.jsx';
import { getGuruByNomorInduk } from '../../handlers/GuruHandler.jsx'
import { getMapelById } from '../../handlers/MapelHandler.jsx';

function DaftarGuru() {
    // Navigasi
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
        ? '/admin' : (location.pathname.startsWith('/guru') 
        ? '/guru' : '/piket');
    const navigate = useNavigate();
    const { kelasId } = useParams();

    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const [jadwalKelas, setJadwalKelas] = useState([]);
    const [loading, setLoading] = useState(true);

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const presensiButtonBlack = iconList.find((i) => i.label === 'Presensi Button Black')?.src;

    // Fetch semua jadwal kelas ini (tanpa filter hari)
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // 1. Ambil semua jadwal kelas ini
                const dataJadwal = await getJadwalByKelas(kelasId) || [];

                // 2. Ambil nama guru & mapel untuk setiap jadwal
                const daftar = await Promise.all(dataJadwal.map(async (item) => {
                    let namaGuru = item.nomor_induk_guru;
                    let namaMapel = item.id_mapel;

                    // Fetch nama guru
                    try {
                        const guru = await getGuruByNomorInduk(item.nomor_induk_guru);
                        if (guru?.nama) namaGuru = guru.nama;
                    } catch { 
                        namaGuru = item.nomor_induk_guru;
                    }

                    // Fetch nama mapel
                    try {
                        const mapel = await getMapelById(item.id_mapel);
                        if (mapel?.nama) namaMapel = mapel.nama;
                    } catch { 
                        namaMapel = item.id_mapel;
                    }

                    // Hari, jika ingin ditampilkan
                    return {
                        namaGuru,
                        namaMapel,
                        hari: item.hari,
                        id_jadwal: item.id_jadwal,
                    };
                }));

                setJadwalKelas(daftar);
            } catch (err) {
                console.error(err);
                setJadwalKelas([]);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [kelasId]);

    return (
        <div>
            <Header> Daftar Guru </Header>

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
                        onClick={() => {
                            if (prefix === '/admin') {
                                navigate(`${prefix}/data/kelas`);
                            } else if (prefix === '/piket') {
                                navigate(`${prefix}/kelas`);
                            } else {
                                navigate(-1);
                            }
                        }}
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

                    {/* Daftar Guru & Mapel */}
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
                                    {loading ? (
                                        <tr> <td colSpan={3} className="text-center"> Memuat data... </td> </tr>
                                    ) : jadwalKelas.length === 0 ? (
                                        <tr> 
                                            <td colSpan={3} className="text-center" style={{ textAlign: "center", padding: 20, color: "#000" }}> 
                                                Tidak ada guru yang mengajar hari ini! 
                                            </td> 
                                        </tr>
                                    ) : (
                                        jadwalKelas.map((guru, i) => (
                                            <tr key={i}>
                                                <td style={{ padding: '14px 14px 14px 25px' }}>
                                                    <div className="d-flex align-items-start gap-3">
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

                                                        <div className="d-flex flex-column align-items-start">
                                                            <span style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '6px' }}>
                                                                {guru.namaGuru}
                                                            </span>

                                                            <span style={{ color: '#555', fontSize: '14px', textAlign: 'left' }}>
                                                                {guru.namaMapel}
                                                            </span>
                                                        </div>

                                                    </div>
                                                </td>

                                                <td className="d-flex justify-content-end align-items-center" style={{ textAlign: 'right', padding: '20px 20px 14px 14px' }}>
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
                                                        onClick={() => {
                                                            if (prefix === '/admin') {
                                                                navigate(`${prefix}/data/kelas/${kelasId.toUpperCase()}/pertemuan?id=${guru.id_jadwal}`);
                                                            } else if (prefix === '/piket') {
                                                                navigate(`${prefix}/kelas/${kelasId.toUpperCase()}/pertemuan?id=${guru.id_jadwal}`);
                                                            }
                                                        }}
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

export default DaftarGuru;