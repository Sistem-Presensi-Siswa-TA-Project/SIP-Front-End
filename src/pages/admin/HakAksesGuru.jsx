// Filename: HakAksesGuru.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card } from '../../components/Molekul.jsx';
import { SecondaryButton, SuccessButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';

function HakAksesGuru() {
    // State Hovering
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);

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

    const handleDelete = (index) => { //Sementara
        if (window.confirm('Yakin ingin menghapus data ini?')) {
            alert(`Data ke-${index + 1} dihapus!`);
            // Tambahkan proses hapus data di sini
        }
    };

    return (
        <div>
            <Header> Data Guru </Header>

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

                    {/* Presensi Content */}
                    <Card style={{ width: '100%', marginTop: '45px', padding: '30px' }}>
                        {/* Title */}
                        <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '22px' }}> 
                            DATA GURU
                        </h3>

                        {/* Tombol Tambah Data Guru */}
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
                                    `${prefix}/user/guru/form`
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
                                        <th style={{ padding: '16px' }}> Username </th>
                                        <th style={{ padding: '16px' }}> Nama Guru </th>
                                        <th style={{ padding: '16px' }}> Aksi </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {[...Array(20)].map((_, i) => (
                                        <tr key={i}>
                                            <td className="border-right" style={{ padding: '14px' }}> {i+1}. </td>
                                            <td style={{ padding: '14px' }}> 20242025 </td>
                                            <td style={{ padding: '14px', textAlign: 'left' }}> Nama Guru ABCDEFGH IJKLMNO </td>
                                            <td style={{ padding: '14px' }}>
                                                <div 
                                                    className="d-flex flex-row justify-content-center align-items-center"
                                                    style={{ gap: '4px' }}
                                                >
                                                    {/* Tombol Ubah Data */}
                                                    <button
                                                        type="button"
                                                        title="Ubah Data"
                                                        onClick={
                                                            // Fungsi edit, bisa dikirim ID data sebenarnya
                                                            () => navigate(`${prefix}/user/guru/form`, { state: { index: i } })
                                                        }
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
                                                        onClick={() => handleDelete(i)} // Fungsi delete, bisa dikirim ID data sebenarnya
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

export default HakAksesGuru;