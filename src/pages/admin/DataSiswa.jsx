// Filename: DataSiswa.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card, CardPopUp } from '../../components/Molekul.jsx';
import { SecondaryButton, SuccessButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { getAllSiswa, deleteSiswaById } from '../../handlers/SiswaHandler.jsx'

function DataSiswa() {
    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [idSiswaToDelete, setIdSiswaToDelete] = useState(null);
    const [siswaList, setSiswaList] = useState([]);
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

    // Ambil data siswa saat mount
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await getAllSiswa();
            setSiswaList(data);
            setLoading(false);
        }

        fetchData();
    }, []);

    // Handler untuk menampilkan popup delete
    const handleDelete = (id_siswa) => {
        setIdSiswaToDelete(id_siswa);
        setShowDeletePopup(true);
    };

    // Handler hapus data siswa (dipakai di onClick popup)
    const handleConfirmDelete = async () => {
        setShowDeletePopup(false);
        try {
            await deleteSiswaById(idSiswaToDelete);
            setSiswaList(prev => prev.filter(item => item.id_siswa !== idSiswaToDelete));
            setIdSiswaToDelete(null);
            alert('Data siswa berhasil dihapus!');
            
            // Refresh halaman:
            // window.location.reload();
        } catch (error) {
            setIdSiswaToDelete(null);
            alert("Gagal menghapus data siswa.", error);
        }
    };

    return (
        <div>
            <Header> Data Siswa </Header>

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
                        onClick={() => navigate('/admin')}
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
                            DATA SISWA
                        </h3>

                        {/* Tombol Tambah Data Siswa */}
                        <div className="d-flex justify-content-end" style={{ marginRight: '5px' }}>
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
                                    `${prefix}/data/siswa/form`
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
                            marginTop: '23px', 
                            borderRadius: '10px', 
                            border: '2px solid #D6D6D6',
                            }}
                        >
                            <Table className="custom-table">
                                <thead>
                                    <tr>
                                        <th className="border-right" style={{ padding: '16px' }}> No. </th>
                                        <th style={{ padding: '16px' }}> Nomor Induk </th>
                                        <th style={{ padding: '16px' }}> Nama Siswa </th>
                                        <th style={{ padding: '16px' }}> Kelas </th>
                                        <th style={{ padding: '16px' }}> Kelas Gabungan </th>
                                        <th style={{ padding: '16px' }}> Aksi </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={8} style={{ textAlign: 'center' }}> Memuat Data.... </td>
                                        </tr>
                                    ) : siswaList.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} style={{ textAlign: 'center' }}> Tidak ada data yang ditemukan </td>
                                        </tr>
                                    ) : (
                                        siswaList.map((siswa, i) => (
                                            <tr key={siswa.id_siswa}>
                                                <td className="border-right" style={{ padding: '14px' }}> {i+1}. </td>
                                                <td style={{ padding: '14px' }}>{siswa.nisn || '-'}</td>
                                                <td style={{ padding: '14px', textAlign: 'left' }}>{siswa.nama || '-'}</td>
                                                <td style={{ padding: '14px' }}>{siswa.kelas || '-'}</td>
                                                <td style={{ padding: '14px' }}>{siswa.kelas_gabungan || '-'}</td>
                                                <td style={{ padding: '14px' }}>
                                                    <div 
                                                        className="d-flex flex-row justify-content-center align-items-center"
                                                        style={{ gap: '4px' }}
                                                    >
                                                        {/* Tombol Ubah Data */}
                                                        <button
                                                            type="button"
                                                            title="Ubah Data"
                                                            onClick={() => navigate(`/admin/data/siswa/form?id=${siswa.id_siswa}`)}
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
                                                            onClick={() => handleDelete(siswa.id_siswa)}
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

            {/* Popup konfirmasi hapus data siswa */}
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
                            const siswaToDelete = siswaList.find(s => s.id_siswa === idSiswaToDelete);

                            return (
                                <React.Fragment> Apakah Anda yakin ingin menghapus data "<b>{siswaToDelete?.nama || 'siswa ini'}</b>"? </React.Fragment>
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

export default DataSiswa;