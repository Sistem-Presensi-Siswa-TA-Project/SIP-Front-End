// Filename: HakAksesPiket.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card, CardPopUp } from '../../components/Molekul.jsx';
import { SecondaryButton, SuccessButton, DangerButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { getAllPiket, deletePiketById, deleteAllPiket } from '../../handlers/PiketHandler.jsx';
import { getGuruByNomorInduk } from '../../handlers/GuruHandler.jsx';
import { getSiswaByNISN } from '../../handlers/SiswaHandler.jsx';
import { deleteUserByUsername, deleteAllUserPiket } from '../../handlers/UserHandler.jsx';

function HakAksesPiket() {
    // State Hovering
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [dangerButtonHovering, setDangerButtonHovering] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [idPiketToDelete, setIdPiketToDelete] = useState(null);
    const [showDeleteAllPopup, setShowDeleteAllPopup] = useState(false);
    const [piketList, setPiketList] = useState([]);
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

    // Mengambil data dari PiketHandler.jsx
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await getAllPiket();

                // Map nama petugas dari guru/siswa
                const withNama = await Promise.all(
                    (data || []).map(async (piket) => {
                        let nama = "-";
                        // Cek guru dulu
                        const guru = await getGuruByNomorInduk(piket.nomor_induk);

                        if (guru && guru.nama) {
                            nama = guru.nama;
                        } else {
                            // Jika tidak ada di guru, cek siswa
                            const siswa = await getSiswaByNISN(piket.nomor_induk);

                            if (siswa && siswa.nama) {
                                nama = siswa.nama;
                            }
                        }
                        return { ...piket, nama };
                    })
                );

                setPiketList(withNama);
            } catch (e) {
                setPiketList([]);
                alert('Gagal mengambil data piket: ' +
                    (e?.response?.data?.message || e?.message || JSON.stringify(e))
                );
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    // Menjalankan fungsi hapus semua user dengan role piket
    const handleDeleteAll = () => {
        setShowDeleteAllPopup(true);
    };

    const handleConfirmDeleteAll = async () => {
        setShowDeleteAllPopup(false);

        try {
            await deleteAllUserPiket(); // Menghapus semua user dengan role piket
            await deleteAllPiket(); // Menghapus semua data di tabel Piket
            setPiketList([]);

            // Refresh halaman:
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Gagal menghapus semua user dengan role piket! Coba lagi.');
        }
    };

    // Handler untuk menampilkan popup delete
    const handleDelete = (id_piket) => {
        setIdPiketToDelete(id_piket);
        setShowDeletePopup(true);
    };

    // Handler hapus data guru (dipakai di onClick popup)
    const handleConfirmDelete = async () => {
        setShowDeletePopup(false);

        try {
            // 1. Mengambil username dari piket yang mau dihapus
            const piketToDelete = piketList.find(p => p.id_piket === idPiketToDelete);
            const username = piketToDelete?.kode_piket;

            // 2. Hapus data piket
            await deletePiketById(idPiketToDelete);

            // 3. Hapus user berdasarkan username
            if (username) {
                await deleteUserByUsername(username);
            }

            // 4. Refresh data piket
            setPiketList(prev => prev.filter(item => item.id_piket !== idPiketToDelete));
            setIdPiketToDelete(null);

            // Refresh page
            window.location.reload();
        } catch (error) {
            setIdPiketToDelete(null);
            alert('Gagal menghapus data piket atau user:', error);
        }
    };

    return (
        <div>
            <Header> Data Akses Piket </Header>

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
                        onClick={() => navigate(`/admin/user`)}
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
                            DATA AKSES PETUGAS PIKET
                        </h3>

                        {/* Tombol Data Hak Akses Guru */}
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
                                onClick={() => navigate(
                                    `${prefix}/user/piket/form`
                                )}
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
                            marginTop: '16px', 
                            borderRadius: '10px', 
                            border: '2px solid #D6D6D6',
                            }}
                        >
                            <Table className="custom-table">
                                <thead>
                                    <tr>
                                        <th className="border-right" style={{ padding: '16px' }}> No. </th>
                                        <th style={{ padding: '16px' }}> Username </th>
                                        <th style={{ padding: '16px' }}> Nomor Induk </th>
                                        <th style={{ padding: '16px' }}> Nama Petugas Piket </th>
                                        <th style={{ padding: '16px' }}> Status </th>
                                        <th style={{ padding: '16px' }}> Aksi </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={8} style={{ textAlign: 'center' }}> Memuat data piket.... </td>
                                        </tr>
                                    ) : piketList.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} style={{ textAlign: 'center' }}> Tidak ada data piket! </td>
                                        </tr>
                                    ) : (
                                        piketList.map((piket, i) => (
                                            <tr key={piket.id_piket || i}>
                                                <td className="border-right" style={{ padding: '14px' }}> {i+1}. </td>
                                                <td style={{ padding: '14px' }}> {piket.kode_piket || '-'} </td>
                                                <td style={{ padding: '14px' }}> {piket.nomor_induk || '-'} </td>
                                                <td style={{ padding: '14px', textAlign: 'left' }}> {piket.nama || '-'} </td>
                                                <td style={{ padding: '14px' }}> {piket.status || '-'} </td>
                                                <td style={{ padding: '14px' }}>
                                                    <div 
                                                        className="d-flex flex-row justify-content-center align-items-center"
                                                        style={{ gap: '4px' }}
                                                    >
                                                        {/* Tombol Ubah Data */}
                                                        <button
                                                            type="button"
                                                            title="Ubah Data"
                                                            onClick={() => navigate(`${prefix}/user/piket/form?id=${piket.id_piket}`)}
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
                                                            onClick={() => handleDelete(piket.id_piket)} // Fungsi delete, bisa dikirim ID data sebenarnya
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

            {/* Popup konfirmasi hapus semua user dengan role piket */}
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
                        label: "Hapus Semua Mapel",
                        bgColor: "#DB4437",
                        textColor: "#FFFFFF",
                        borderColor: "#DB4437",
                        onClick: handleConfirmDeleteAll,
                    }
                ]}
            >
                Apakah Anda yakin ingin menghapus semua user piket?
            </CardPopUp>

            {/* Popup konfirmasi hapus data guru*/}
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
                            const piketToDelete = piketList.find(p => p.id_piket === idPiketToDelete);

                            return (
                                <> Apakah Anda yakin ingin menghapus data "<b>{piketToDelete?.nama || 'piket ini'}</b>"? </>
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

export default HakAksesPiket;