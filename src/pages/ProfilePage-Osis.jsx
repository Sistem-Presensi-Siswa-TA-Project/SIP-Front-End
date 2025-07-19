// Filename: ProfilePage-Osis.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Card } from '../components/Molekul.jsx';
import { PrimaryButton, SecondaryButton } from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';
import { getSiswaByNISN } from '../handlers/SiswaHandler.jsx';
import { getPiketByKodePiket } from '../handlers/PiketHandler.jsx';

function ProfileOsis() {
    // Navigasi Page
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
    ? '/admin' : (location.pathname.startsWith('/guru') 
    ? '/guru' : '/piket');
    const navigate = useNavigate();
    
    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [primaryButtonHovering, setPrimaryButtonHovering] = useState(false);
    const [siswa, setSiswa] = useState(null);

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;

    // Mengambil data siswa ketika mount
    useEffect(() => {
        async function fetchSiswa() {
            const role = localStorage.getItem("role");
            const username = localStorage.getItem("username");

            if (!role || !username) return;

            try {
                let nomorInduk = username;

                // Jika role adalah piket, dapatkan nomor_induk dari data piket
                const dataPiket = await getPiketByKodePiket(username);

                if (dataPiket && dataPiket.nomor_induk) {
                    nomorInduk = dataPiket.nomor_induk;
                } else {
                    setSiswa(null);
                    return;
                }

                // Fetch data guru
                const dataSiswa = await getSiswaByNISN(nomorInduk);
                setSiswa(dataSiswa || null);
            } catch (err) {
                setSiswa(null);
                console.error('Gagal mengambil data guru', err);
            }
        }
        fetchSiswa();
    }, []);

    // Helper agar lebih aman, fallback ke "-" jika null/undefined
    function safe(val) { return val ?? "-"; }

    return (
        <div>
            <Header> Profile User </Header>

            <main className="d-flex justify-content-center flex-wrap" style={{ gap: '20px' }}>
                <div className="d-flex flex-column align-items-center w-100 mx-auto px-4" style={{ maxWidth: '1100px', paddingTop: '40px' }}>
                    <div className="d-flex flex-column align-items-start w-100 mx-auto">
                        {/* Button Back */}
                        <SecondaryButton
                            className="animate-button d-flex flex-row gap-2"
                            width="125px"
                            height="45px"
                            onClick={() => navigate(`${prefix}`)}
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
                                style={{ marginLeft: '4px' }}
                            />

                            <span style={{ fontSize: '18px', color: secondaryButtonHovering ? '#FFC107' : '#000', marginLeft: '2px' }}> 
                                Kembali 
                            </span>
                        </SecondaryButton>
                    
                        {/* Main Card */}
                        <div className="w-100 d-flex justify-content-center" style={{ marginTop: '30px' }}>
                            {/* Data Diri */}
                            <Card
                                className="d-flex flex-column align-items-center" height="calc(100% + 10px)"
                                style={{
                                    width: '100%',
                                    maxWidth: 550, // Card lebih “pas” dan tidak terlalu besar
                                    padding: '30px 40px 40px 40px',
                                    borderRadius: 22,
                                    boxShadow: '0 2px 18px rgba(0,0,0,0.08)',
                                    margin: '0 auto',
                                }}
                            >

                                <h3 style={{
                                        fontWeight: 'bold',
                                        marginBottom: '30px',
                                        alignSelf: 'flex-start'
                                    }}
                                >
                                    Data Diri 
                                </h3>

                                {/* Image Profile & Button */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px', width: '100%' }}>
                                    {/* Image Profil dan Button */}
                                    <div style={{ position: 'relative', width: '95px', height: '95px', margin: '0 auto' }}>
                                        <img
                                            src={iconList.find(i => i.label === 'Profile Default')?.src}
                                            alt="Profile"
                                            style={{
                                                width: '100px',
                                                height: '95px',
                                                objectFit: 'cover',
                                            }}
                                        />

                                        <img
                                            src={iconList.find(i => i.label === 'Add Profile')?.src}
                                            alt="Add"
                                            style={{
                                                position: 'absolute',
                                                top: '-8px',
                                                right: '-8px',
                                                width: '30px',
                                                height: '30px',
                                            }}
                                        />
                                    </div>

                                    {/* Button */}
                                    <div className="d-flex flex-row gap-4" style={{ marginTop: 30, justifyContent: 'center' }}>
                                        <PrimaryButton 
                                            width="145px" 
                                            height="40px"
                                            fontSize="14px"
                                            className="width-button-mobile"
                                            onMouseEnter={() => setPrimaryButtonHovering(true)}
                                            onMouseLeave={() => setPrimaryButtonHovering(false)}
                                            onClick={() => navigate(`${prefix}/ubah-password?id=${siswa.id_siswa}`)}
                                            style={{ 
                                                justifyContent: 'center', 
                                                alignItems: 'center',
                                                borderRadius: primaryButtonHovering ? '12px' : '10px',
                                                boxShadow: primaryButtonHovering ? '6px 6px 12px rgba(0, 0, 0, 0.5)' : '2px 2px 8px rgba(0, 0, 0, 0.5)',
                                                transition: 'box-shadow 0.2s ease-in-out',
                                            }}
                                        > 
                                            Ubah Password 
                                        </PrimaryButton>

                                        <PrimaryButton 
                                            width="145px"
                                            height="40px"
                                            fontSize="14px"
                                            className="width-button-mobile"
                                            onMouseEnter={() => setPrimaryButtonHovering(true)}
                                            onMouseLeave={() => setPrimaryButtonHovering(false)}
                                            onClick={() => navigate(`${prefix}/profile-form`)}
                                            style={{ 
                                                justifyContent: 'center', 
                                                alignItems: 'center',
                                                borderRadius: primaryButtonHovering ? '12px' : '10px',
                                                boxShadow: primaryButtonHovering ? '6px 6px 12px rgba(0, 0, 0, 0.5)' : '2px 2px 8px rgba(0, 0, 0, 0.5)',
                                                transition: 'box-shadow 0.2s ease-in-out',
                                            }}
                                        > 
                                            Ubah Data Diri 
                                        </PrimaryButton>
                                    </div>
                                </div>

                                {/* Grid Data */}
                                <div className="d-flex flex-column" style={{ fontSize: '16px', gap: '26px', alignSelf: 'stretch', marginTop: '10px' }}>
                                    {siswa ? (
                                        <React.Fragment>
                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-4">
                                                    <div className="custom-width-form-besar"> Nama Lengkap </div>
                                                    <div style={{ width: '15px' }}> : </div>
                                                </div>
                                                
                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                >
                                                    {safe(siswa?.nama)} 
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-4">
                                                    <div className="custom-width-form-besar"> Jenis Kelamin </div>
                                                    <div style={{ width: '15px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                >
                                                    {safe(siswa?.jenis_kelamin)} 
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-4">
                                                    <div className="custom-width-form-besar"> Kelas </div>
                                                    <div style={{ width: '15px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {safe(siswa?.kelas)} 
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-4">
                                                    <div className="custom-width-form-besar"> Tempat, Tanggal Lahir </div>
                                                    <div style={{ width: '15px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {`${safe(siswa?.tempat_lahir)}, ${safe(siswa?.tanggal_lahir)}`} 
                                                </div>
                                            </div>


                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-4">
                                                    <div className="custom-width-form-besar"> Nomor Handphone </div>
                                                    <div style={{ width: '15px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {safe(siswa?.nomor_hp)} 
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-4">
                                                    <div className="custom-width-form-besar"> Kelas Gabungan </div>
                                                    <div style={{ width: '15px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {safe(siswa?.kelas_gabungan)} 
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                        <div> Memuat data ... </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
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

export default ProfileOsis;