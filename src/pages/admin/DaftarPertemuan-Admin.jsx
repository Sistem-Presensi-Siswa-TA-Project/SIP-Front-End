// Filename: DaftarPertemuan-Admin.jsx
import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card, CardPopUp } from '../../components/Molekul.jsx';
import { SecondaryButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { getPresensiMapelByIdJadwal, deletePresensiMapelByJadwalAndTanggal } from '../../handlers/PresensiHandler.jsx';

function DaftarPertemuanAdmin() {
    // State Hovering
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [daftarPertemuan, setDaftarPertemuan] = useState([]);
    const [showWarningPopup, setShowWarningPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [tanggalToDelete, setTanggalToDelete] = useState(null);


    const todayString = new Date().toISOString().slice(0, 10);
    
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
    const yellowWarningIcon = iconList.find(i => i.label === "Yellow Warning Icon")?.src;
    const deleteIcon = iconList.find((i) => i.label === 'Delete Icon')?.src;
    const redWarningIcon = iconList.find(i => i.label === "Red Warning Icon")?.src;

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
    React.useEffect(() => {
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

    const handleDelete = (index) => {
        setTanggalToDelete(daftarPertemuan[index]);
        setShowDeletePopup(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deletePresensiMapelByJadwalAndTanggal(idJadwal, tanggalToDelete);
            setShowDeletePopup(false);
            setTanggalToDelete(null);

            // Hapus dari daftar tanpa reload
            setDaftarPertemuan((prev) => prev.filter(tgl => tgl !== tanggalToDelete));

            // Refresh halaman:
            window.location.reload();
        } catch (err) {
            alert("Gagal menghapus data presensi: " + (err.message || "Unknown error"));
            setShowDeletePopup(false);
            setTanggalToDelete(null);
        }
    };

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
                                                    style={{ padding: '16px 57px 16px 16px' }}
                                                >
                                                    {/* Tombol Hapus Data */}
                                                    <button
                                                        type="button"
                                                        title="Hapus Data"
                                                        onClick={() => handleDelete(i)}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            padding: 0,
                                                            margin: 0,
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <img
                                                            src={deleteIcon}
                                                            alt="Hapus Data"
                                                            width="34"
                                                            height="34"
                                                            draggable={false}
                                                            style={{ display: 'block' }}
                                                        />
                                                    </button>
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

            {/* Popup konfirmasi hapus semua data jadwal */}
            <CardPopUp
                open={showDeletePopup}
                image={redWarningIcon}
                borderColor="#DB4437"
                buttons={[
                    {
                        label: "Kembali",
                        bgColor: "#FFFFFF",
                        textColor: "#DB4437",
                        borderColor: "#DB4437",
                        onClick: () => setShowDeletePopup(false),
                    },
                    {
                        label: "Hapus Presensi",
                        bgColor: "#DB4437",
                        textColor: "#FFFFFF",
                        borderColor: "#DB4437",
                        onClick: handleConfirmDelete,
                    }
                ]}
            >
                Apakah Anda yakin ingin menghapus data presensi pada tanggal <b>{tanggalToDelete && formatTanggalIndo(tanggalToDelete)}</b>?
            </CardPopUp>

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
                    Presensi telah dilakukan di hari ini <br /> ({formatTanggalIndo(todayString)})!
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

export default DaftarPertemuanAdmin;