// Filename: DataJadwal.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card, CardPopUp } from '../../components/Molekul.jsx';
import { SecondaryButton, SuccessButton, DangerButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { getAllJadwal, deleteJadwalById, deleteAllJadwal } from '../../handlers/JadwalHandler.jsx';

function DataJadwal() {
    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [dangerButtonHovering, setDangerButtonHovering] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showDeleteAllPopup, setShowDeleteAllPopup] = useState(false);
    const [idJadwalToDelete, setIdJadwalToDelete] = useState(null);
    const [jadwalList, setJadwalList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Navigasi Page
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
        ? '/admin' : (location.pathname.startsWith('/guru') 
        ? '/guru' : '/piket');
    const navigate = useNavigate();

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const addWhite = iconList.find((i) => i.label === 'Add White')?.src;
    const addGreen = iconList.find((i) => i.label === 'Add Green')?.src;
    const pencilIcon = iconList.find((i) => i.label === 'Pencil Icon')?.src;
    const deleteIcon = iconList.find((i) => i.label === 'Delete Icon')?.src;
    const redWarningIcon = iconList.find(i => i.label === "Red Warning Icon")?.src;

    // Mengambil data dari JadwalHandler.jsx
    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);

            try {
                const data = await getAllJadwal();
                setJadwalList(data);
            } catch (e) {
                setJadwalList([]);
                alert("Gagal mengambil data jadwal.", e);
            }
            
            setLoading(false);
        }
        fetchData();
    }, []);

    // Menjalankan fungsi hapus semua data jadwal
    const handleDeleteAll = () => {
        setShowDeleteAllPopup(true);
    };

    const handleConfirmDeleteAll = async () => {
        setShowDeleteAllPopup(false);
        try {
            await deleteAllJadwal();
            setJadwalList([]);

            // Refresh halaman:
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Gagal menghapus semua data jadwal! Coba lagi.');
        }
    };

    // Handler untuk menampilkan popup delete
    const handleDelete = (id_guru) => {
        setIdJadwalToDelete(id_guru);
        setShowDeletePopup(true);
    };

    // Handler hapus data guru (dipakai di onClick popup)
    const handleConfirmDelete = async () => {
        setShowDeletePopup(false);
        try {
            await deleteJadwalById(idJadwalToDelete);
            setJadwalList(prev => prev.filter(item => item.id_guru !== idJadwalToDelete));
            setIdJadwalToDelete(null);
    
            // Refresh halaman:
            window.location.reload();
        } catch (error) {
            setIdJadwalToDelete(null);
            console.error("Gagal menghapus data jadwal.", error);
            alert('Gagal menghapus data! Coba lagi.');
        }
    };

    return (
        <div>
            <Header> Data Jadwal </Header>

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
                        onClick={() => navigate(`/admin`)}
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

                    {/* Presensi Content */}
                    <Card style={{ width: '100%', marginTop: '45px', padding: '30px' }}>
                        {/* Title */}
                        <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '22px' }}> 
                            DATA JADWAL PELAJARAN
                        </h3>

                        {/* Wrap Button Simpan & Hapus (Sejajar Rata Kanan) */}
                        <div className="d-flex flex-row justify-content-end align-items-center gap-4" style={{ marginBottom: '5px' }}>
                            {/* Button Hapus Semua Data */}
                            <DangerButton
                                className="d-flex align-items-center justify-content-center"
                                width="200px"
                                height="42px"
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
                                onClick={handleDeleteAll}
                            >
                                Hapus Semua Data
                            </DangerButton>

                            {/* Button Tambah Data */}
                            <SuccessButton
                                className="d-flex align-items-center justify-content-center"
                                height="43px"
                                width="180px"
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
                                onClick={() => navigate(`${prefix}/data/jadwal/form`)}
                                onMouseEnter={() => setSuccessButtonHovering(true)}
                                onMouseLeave={() => setSuccessButtonHovering(false)}
                            >
                                <img
                                    src={successButtonHovering ? addGreen : addWhite}
                                    alt="Presensi"
                                    width="20"
                                    height="20"
                                />
                                Tambah Data
                            </SuccessButton>
                        </div>

                        {/* Tabel Data */}
                        <div 
                            className="table-responsive" 
                            style={{ 
                            marginTop: '18px', 
                            borderRadius: '10px', 
                            border: '2px solid #D6D6D6',
                            }}
                        >
                            <Table className="custom-table">
                                <thead>
                                    <tr>
                                        <th className="border-right" style={{ padding: '16px' }}> No. </th>
                                        <th style={{ padding: '16px' }}> Kode Mapel </th>
                                        <th style={{ padding: '16px' }}> Nomor Induk Guru </th>
                                        <th style={{ padding: '16px' }}> Hari </th>
                                        <th style={{ padding: '16px' }}> Waktu </th>
                                        <th style={{ padding: '16px' }}> Kelas </th>
                                        <th style={{ padding: '16px' }}> Aksi </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={8} style={{ textAlign: 'center' }}> Memuat Data Jadwal.... </td>
                                        </tr>
                                    ) : jadwalList.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} style={{ textAlign: 'center' }}> Tidak ada data jadwal yang ditemukan! </td>
                                        </tr>
                                    ) : (
                                        jadwalList.map((jadwal, i) => (
                                            <tr key={jadwal.id_jadwal}>
                                                <td className="border-right" style={{ padding: '14px' }}> {i + 1}. </td>
                                                <td style={{ padding: '14px' }}> {jadwal.id_mapel || '-'} </td>
                                                <td style={{ padding: '14px', textAlign: 'left' }}> {jadwal.nomor_induk_guru || '-'} </td>
                                                <td style={{ padding: '14px' }}> {jadwal.hari || '-'} </td>
                                                <td style={{ padding: '14px' }}> {jadwal.waktu || '-'} </td>
                                                <td style={{ padding: '14px' }}> {jadwal.kelas || '-'} </td>
                                                <td style={{ padding: '14px' }}>
                                                    <div className="d-flex flex-row justify-content-center align-items-center" style={{ gap: '4px' }}>
                                                        {/* Tombol Ubah Data */}
                                                        <button
                                                            type="button"
                                                            title="Ubah Data"
                                                            onClick={() => navigate(`/admin/data/jadwal/form?id=${jadwal.id_jadwal}`)}
                                                            style={{
                                                                background: 'transparent',
                                                                border: 'none',
                                                                padding: 0,
                                                                margin: 0,
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <img
                                                                src={pencilIcon}
                                                                alt="Ubah Data"
                                                                width="28"
                                                                height="28"
                                                                draggable={false}
                                                                style={{ display: 'block' }}
                                                            />
                                                        </button>

                                                        {/* Tombol Hapus Data */}
                                                        <button
                                                            type="button"
                                                            title="Hapus Data"
                                                            onClick={() => handleDelete(jadwal.id_jadwal)}
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
                                                                width="28"
                                                                height="28"
                                                                draggable={false}
                                                                style={{ display: 'block' }}
                                                            />
                                                        </button>
                                                    </div>
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
                open={showDeleteAllPopup}
                image={redWarningIcon}
                borderColor="#DB4437"
                buttons={[
                    {
                        label: "Kembali",
                        bgColor: "#FFFFFF",
                        textColor: "#DB4437",
                        borderColor: "#DB4437",
                        onClick: () => setShowDeleteAllPopup(false),
                    },
                    {
                        label: "Hapus Semua Jadwal",
                        bgColor: "#DB4437",
                        textColor: "#FFFFFF",
                        borderColor: "#DB4437",
                        onClick: handleConfirmDeleteAll,
                    }
                ]}
            >
                Apakah Anda yakin ingin menghapus semua data jadwal?
            </CardPopUp>

            {/* Popup konfirmasi hapus data jadwal */}
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
                        label: "Hapus Data",
                        bgColor: "#DB4437",
                        textColor: "#FFFFFF",
                        borderColor: "#DB4437",
                        onClick: handleConfirmDelete,
                    }
                ]}
            >
                {
                    (() => {
                            const jadwalToDelete = jadwalList.find(j => j.id_jadwal === idJadwalToDelete);

                            return (
                                <> Apakah Anda yakin ingin menghapus data "<b>{jadwalToDelete?.id_jadwal  || 'jadwal ini'}</b>"? </>
                            );
                        }
                    )()
                }
            </CardPopUp>

            <footer>
                <small style={{ fontSize: '14px', color: '#808080' }}>
                Copyright &copy; {new Date().getFullYear()} SMP Plus Babussalam. All Rights Reserved.
                </small>
            </footer>
        </div>
    );
}

export default DataJadwal;