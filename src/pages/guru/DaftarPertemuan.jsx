// Filename: DaftarPertemuan.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card, CardPopUp } from '../../components/Molekul.jsx';
import { SecondaryButton, InfoButton, SuccessButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { getPresensiMapelByIdJadwal } from '../../handlers/PresensiHandler.jsx';

function DaftarPertemuan() {
    // State Hovering
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);
    const [daftarPertemuan, setDaftarPertemuan] = useState([]);
    const [showWarningPopup, setShowWarningPopup] = useState(false);
    
    // Navigasi Page
    const navigate = useNavigate();
    const { kelasId } = useParams();
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
    ? '/admin' : (location.pathname.startsWith('/guru') 
    ? '/guru' : '/piket');
    const params = new URLSearchParams(location.search);
    const idJadwal = params.get('id');

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const presensiButtonBlack = iconList.find((i) => i.label === 'Presensi Button Black')?.src;
    const addWhite = iconList.find((i) => i.label === 'Add White')?.src;
    const addGreen = iconList.find((i) => i.label === 'Add Green')?.src;
    const yellowWarningIcon = iconList.find(i => i.label === "Yellow Warning Icon")?.src;

    // Ambil tanggal lokal sesuai zona waktu device user (misal WIB, bukan UTC)
    function getTodayLocalString() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const todayString = getTodayLocalString();

    // Ubah format tanggal agar sesuai
    function formatTanggalIndo(dateStr) {
        const bulanIndo = [
            "Januari","Februari","Maret","April","Mei","Juni",
            "Juli","Agustus","September","Oktober","November","Desember"
        ];

        const [year, month, day] = dateStr.split('-');
        return `${day} ${bulanIndo[parseInt(month)-1]} ${year}`;
    }

    // Fetch data presensi mapel
    useEffect(() => {
        async function fetchTanggalPresensi() {
            if (!idJadwal) return;

            try {
                const data = await getPresensiMapelByIdJadwal(idJadwal);

                // 1. Mengambil semua tanggal (ISO String)
                let tanggalList = data.map(item => item.tanggal_presensi);

                // 2. Filter hanya tanggal (tanpa jam)
                tanggalList = tanggalList.map(tgl => tgl.split('T')[0]);

                // 3. Ambil yang unik (no duplikat)
                const uniqueTanggal = [...new Set(tanggalList)];

                // 4. Urutkan ascending (asc)
                uniqueTanggal.sort();

                setDaftarPertemuan(uniqueTanggal);
            } catch (err) {
                setDaftarPertemuan([]);
                console.error(err);
            }
        }
        fetchTanggalPresensi();
    }, [idJadwal]);

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
                        onClick={() => {
                            if (prefix === '/admin') {
                                navigate(`${prefix}/data/kelas/${kelasId}`);
                            } else if (prefix === '/piket') {
                                navigate(`${prefix}/kelas/${kelasId}`);
                            } else if (prefix === '/guru') {
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

                    {/* Daftar Guru/Mapel */}
                    <Card style={{ width: '100%', marginTop: '45px', padding: '30px' }}>
                        {/* Title */}
                        <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '20px' }}> 
                            Daftar Pertemuan Kelas {kelasId?.toUpperCase()}
                        </h3>

                        {/* Tombol Tambah Presensi */}
                        <div className="d-flex justify-content-end" style={{ marginRight: '5px' }}>
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
                                onClick={() => {
                                    // Cek apakah sudah ada presensi untuk tanggal hari ini
                                    if (daftarPertemuan.includes(todayString)) {
                                        setShowWarningPopup(true);
                                    } else {
                                        navigate(
                                            `${prefix}/kelas/${kelasId?.toUpperCase()}/pertemuan/lihat-presensi/presensi-form?id=${idJadwal}`
                                        );
                                    }
                                }}
                            >
                                <img 
                                    src={successButtonHovering ? addGreen : addWhite} 
                                    alt="Presensi" 
                                    width="20" 
                                    height="20" 
                                />

                                Tambah Presensi
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
                                    {daftarPertemuan.length === 0 ? (
                                        <tr>
                                            <td colSpan={2} style={{ textAlign: "center", padding: 20, color: "#000" }}>
                                                Tidak ada pertemuan ditemukan!
                                            </td>
                                        </tr>
                                    ) : (
                                        daftarPertemuan.map((tanggal, i) => (
                                            <tr key={i}>
                                                <td style={{ padding: '14px 14px 14px 25px' }}>
                                                    <div className="d-flex align-items-start gap-3">
                                                        {/* Bullet Hijau */}
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
                                                        {/* Pertemuan */}
                                                        <div className="d-flex flex-column">
                                                            <span style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '4px' }}> Pertemuan ke-{i+1} </span>
                                                            <span style={{ color: '#666', fontSize: '15px', textAlign: 'left' }}>
                                                                {formatTanggalIndo(tanggal)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td
                                                    className="d-flex justify-content-end align-items-center"
                                                    style={{ textAlign: 'right', padding: '20px 20px 14px 14px' }}
                                                >
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
                                                            `${prefix}/kelas/${kelasId?.toUpperCase()}/pertemuan/lihat-presensi?id=${idJadwal}&tgl=${tanggal}`
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
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Card>
                </div>
            </main>

            {/* Popup konfirmasi simpan data user */}
            <CardPopUp
                open={showWarningPopup}
                image={yellowWarningIcon}
                borderColor="#FFC107"
                buttons={[
                    {
                        label: "Kembali",
                        bgColor: "#FFC107",
                        textColor: "#FFFFFF",
                        borderColor: "#FFFFFF",
                        onClick: () => setShowWarningPopup(false),
                    }
                ]}
            >
                <React.Fragment>
                    Presensi telah dilakukan di hari ini! <br /> ({formatTanggalIndo(todayString)})
                </React.Fragment>
            </CardPopUp>

            <footer>
                <small style={{ fontSize: '14px', color: '#808080' }}>
                    Copyright &copy; {new Date().getFullYear()} SMP Plus Babussalam. All Rights Reserved.
                </small>
            </footer>
        </div>
    );
}

export default DaftarPertemuan;