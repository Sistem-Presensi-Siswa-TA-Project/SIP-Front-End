// Filename: DataMapel.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card, CardPopUp } from '../../components/Molekul.jsx';
import { SecondaryButton, SuccessButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { getAllMapel, deleteMapelById } from '../../handlers/MapelHandler.jsx'

function DataMapel() {
    // State Hovering
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [idMapelToDelete, setIdMapelToDelete] = useState(null);
    const [mapelList, setMapelList] = useState([]);
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

    // Ambil data mapel saat mount
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await getAllMapel();
            setMapelList(data);
            setLoading(false);
        }

        fetchData();
    }, []);

    // Handler untuk menampilkan popup delete
    const handleDelete = (id_mapel) => {
        setIdMapelToDelete(id_mapel);
        setShowDeletePopup(true);
    };

    // Handler hapus data mapel (dipakai di onClick popup)
    const handleConfirmDelete = async () => {
        setShowDeletePopup(false);
        try {
            await deleteMapelById(idMapelToDelete);
            setMapelList(prev => prev.filter(item => item.id_mapel !== idMapelToDelete));
            setIdMapelToDelete(null);
            alert('Data mapel berhasil dihapus!');
            
            // Refresh halaman:
            window.location.reload();
        } catch (error) {
            setIdMapelToDelete(null);
            alert("Gagal menghapus data mapel.", error);
        }
    };

    return (
        <div>
            <Header> Data Mata Pelajaran </Header>

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
                            DATA MATA PELAJARAN
                        </h3>

                        {/* Tombol Tambah Data Mapel */}
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
                                    `${prefix}/data/mapel/form`
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
                                        <th style={{ padding: '16px' }}> Kode </th>
                                        <th style={{ padding: '16px' }}> Mata Pelajaran </th>
                                        <th style={{ padding: '16px' }}> Deskripsi </th>
                                        <th style={{ padding: '16px' }}> Aksi </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} style={{ textAlign: 'center' }}> Memuat data mapel.... </td>
                                        </tr>
                                    ) : mapelList.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} style={{ textAlign: 'center' }}> Tidak ada data mapel ditemukan! </td>
                                        </tr>
                                    ) : (
                                        mapelList.map((mapel, i) => (
                                            <tr key={mapel.id_mapel || i}>
                                                <td className="border-right" style={{ padding: '14px' }}> {i + 1}. </td>
                                                <td style={{ padding: '14px' }}> {mapel.id_mapel || '-'} </td>
                                                <td style={{ padding: '14px', textAlign: 'left' }}> {mapel.nama || '-'} </td>
                                                <td style={{ padding: '14px', textAlign: 'left' }}> {mapel.deskripsi || '-'} </td>
                                                <td style={{ padding: '14px' }}>
                                                    <div className="d-flex flex-row justify-content-center align-items-center" style={{ gap: '4px' }}>
                                                        {/* Tombol Ubah Data */}
                                                        <button
                                                            type="button"
                                                            title="Ubah Data"
                                                            onClick={() => navigate(`${prefix}/data/mapel/form?id=${mapel.id_mapel}`)}
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
                                                            onClick={() => handleDelete(mapel.id_mapel)}
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

            {/* Popup konfirmasi hapus data mapel */}
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
                            const mapelToDelete = mapelList.find(m => m.id_mapel === idMapelToDelete);

                            return (
                                <> Apakah Anda yakin ingin menghapus data "<b>{mapelToDelete?.nama || 'mapel ini'}</b>"? </>
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

export default DataMapel;