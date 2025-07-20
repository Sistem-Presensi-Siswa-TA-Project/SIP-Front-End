// Filename: ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Card } from '../components/Molekul.jsx';
import { PrimaryButton, SecondaryButton } from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';
import { getGuruByNomorInduk } from '../handlers/GuruHandler.jsx';
import { getPiketByKodePiket } from '../handlers/PiketHandler.jsx';
import { getUserByUsername } from '../handlers/UserHandler.jsx';

function Profile() {
    // Navigasi Page
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
    ? '/admin' : (location.pathname.startsWith('/guru') 
    ? '/guru' : '/piket');
    const navigate = useNavigate();
    
    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [primaryButtonHovering, setPrimaryButtonHovering] = useState(false);
    const [guru, setGuru] = useState(null);
    const [idUser, setIdUser] = useState("");

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;

    // Mengubah format tanggal lahir
    function formatTanggalIndo(dateString) {
        if (!dateString) return "-";

        // Handle jika dalam bentuk string ISO (2003-05-18T17:00:00.000Z)
        let date = dateString;

        if (typeof dateString === "string" && dateString.includes("T")) {
            date = new Date(dateString);
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            // Jika hanya YYYY-MM-DD
            date = new Date(dateString + "T00:00:00");
        } else {
            // Fallback
            date = new Date(dateString);
        }

        if (isNaN(date.getTime())) return "-";

        const bulan = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];

        const tgl = date.getDate();
        const bln = bulan[date.getMonth()];
        const thn = date.getFullYear();

        return `${tgl} ${bln} ${thn}`;
    }

    // Mengambil data user ketika mount
    useEffect(() => {
        async function fetchUser() {
            const role = localStorage.getItem("role");
            const username = localStorage.getItem("username");
            
            if (!role || !username) return;

            try {
                let nomorInduk = username;
                let userId = "";

                // Mengambil ID user dari tabel User
                const dataUser = await getUserByUsername(username)

                if (dataUser && dataUser.id_user) {
                    userId = dataUser.id_user;
                    setIdUser(userId);
                } else {
                    setIdUser("");
                    return;
                }

                // Jika role adalah piket, dapatkan nomor_induk dari data piket
                if (role === "piket") {
                    // Mengambil nomor induk petugas piket
                    const dataPiket = await getPiketByKodePiket(username);

                    if (dataPiket && dataPiket.nomor_induk) {
                        nomorInduk = dataPiket.nomor_induk;
                    } else {
                        setGuru(null);
                        setIdUser("");
                        return;
                    }

                    // Fetch data user
                    const dataGuru = await getGuruByNomorInduk(nomorInduk);
                    setGuru(dataGuru || null);
                } else {
                    // Fetch data user
                    const dataGuru = await getGuruByNomorInduk(nomorInduk);

                    if (dataGuru && dataGuru.id_guru) {
                        userId = dataGuru.id_guru;
                    } else {
                        setGuru(null);
                        return;
                    }
                    
                    setGuru(dataGuru || null);
                }
            } catch (err) {
                setGuru(null);
                console.error('Gagal mengambil data guru', err);
            }
        }
        fetchUser();
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
                        <div className="d-flex flex-column flex-lg-row custom-container" style={{ marginTop: '30px', gap: '30px' }}>
                            {/* Data Diri */}
                            <Card className="w-100 d-flex justify-content-center align-items-start" height="calc(100% + 10px)" style={{ padding: '30px' }}>
                                <div className="w-100 d-flex flex-column">

                                    <h3 style={{ fontWeight: 'bold', marginBottom: '30px' }}> Data Diri </h3>

                                    {/* Image Profile & Button */}
                                    <div className="d-flex flex-column flex-sm-row gap-5 justify-content-start align-items-center" style={{ marginBottom: '40px' }}>
                                        {/* Image Profile */}
                                        <div style={{ position: 'relative', width: '95px', height: '95px' }}>
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
                                        <div className="d-flex flex-row gap-4">
                                            <PrimaryButton 
                                                width="145px" 
                                                height="40px"
                                                fontSize="14px"
                                                className="width-button-mobile"
                                                onMouseEnter={() => setPrimaryButtonHovering(true)}
                                                onMouseLeave={() => setPrimaryButtonHovering(false)}
                                                onClick={() => navigate(`${prefix}/ubah-password?id=${idUser}`)}
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
                                                onClick={() => navigate(`${prefix}/profile-form?id=${guru.id_guru}`)}
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
                                    <div className="d-flex flex-column" style={{ fontSize: '16px', gap: '26px' }}>
                                        {guru ? (
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
                                                        {safe(guru?.nama)} 
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
                                                        {safe(guru?.jenis_kelamin)} 
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
                                                        {`${safe(guru?.tempat_lahir)}${guru?.tanggal_lahir ? ', ' + formatTanggalIndo(guru.tanggal_lahir) : ''}`}
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row">
                                                    <div className="d-flex flex-row gap-4">
                                                        <div className="custom-width-form-besar"> Agama </div>
                                                        <div style={{ width: '15px' }}> : </div>
                                                    </div>

                                                    <div style={{
                                                            wordBreak: 'break-word',
                                                            whiteSpace: 'pre-line',
                                                            maxWidth: '100%'
                                                        }}
                                                    > 
                                                        {safe(guru?.agama)} 
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row">
                                                    <div className="d-flex flex-row gap-4">
                                                        <div className="custom-width-form-besar"> Nomor Induk Kependudukan (NIK) </div>
                                                        <div style={{ width: '15px' }}> : </div>
                                                    </div>

                                                    <div style={{
                                                            wordBreak: 'break-word',
                                                            whiteSpace: 'pre-line',
                                                            maxWidth: '100%'
                                                        }}
                                                    > 
                                                        {safe(guru?.NIK)} 
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
                                                        {safe(guru?.nomor_hp)}
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row">
                                                    <div className="d-flex flex-row gap-4">
                                                        <div className="custom-width-form-besar"> Email </div>
                                                        <div style={{ width: '15px' }}> : </div>
                                                    </div>

                                                    <div style={{
                                                            wordBreak: 'break-word',
                                                            whiteSpace: 'pre-line',
                                                            maxWidth: '100%'
                                                        }}
                                                    > 
                                                        {safe(guru?.email)} 
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ) : (
                                            <div> Memuat data ... </div>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Data Akademik & Alamat */}
                            <div className="custom-container d-flex flex-column align-items-end" style={{ gap: '40px', width: '800px' }}>
                                {/* Data Akademik */}
                                <Card className="w-100 card-kecil" height="calc(100% + 10px)" style={{ padding: '20px' }}>
                                    <div className="w-100 d-flex flex-column px-2 py-1">

                                        <h4 style={{ fontWeight: 'bold', marginBottom: '20px' }}> Data Akademik </h4>

                                        <div className="d-flex flex-column" style={{ fontSize: '16px', gap: '20px' }}>
                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-3">
                                                    <div className="custom-width-form-kecil"> Nomor Induk </div>
                                                    <div style={{ width: '12px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {safe(guru?.nomor_induk)} 
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-3">
                                                    <div className="custom-width-form-kecil"> Mata Pelajaran </div>
                                                    <div style={{ width: '12px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {safe(guru?.mapel)} 
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-3">
                                                    <div className="custom-width-form-kecil"> Jabatan </div>
                                                    <div style={{ width: '12px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {safe(guru?.jabatan)} 
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-3">
                                                    <div className="custom-width-form-kecil"> Pendidikan </div>
                                                    <div style={{ width: '12px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {safe(guru?.pendidikan)} 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Alamat */}
                                <Card className="w-100 card-kecil" height="calc(100% + 10px)" style={{ padding: '20px' }}>
                                    <div className="w-100 d-flex flex-column px-2 py-1">

                                        <h4 style={{ fontWeight: 'bold', marginBottom: '20px' }}> Alamat </h4>

                                        <div className="d-flex flex-column" style={{ fontSize: '16px', gap: '20px' }}>
                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-3">
                                                    <div className="custom-width-form-kecil"> Alamat </div>
                                                    <div style={{ width: '12px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {`${safe(guru?.alamat)} RT ${safe(guru?.rt)}/RW ${safe(guru?.rw)}`} 
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-3">
                                                    <div className="custom-width-form-kecil"> Desa/Kelurahan </div>
                                                    <div style={{ width: '12px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {safe(guru?.kelurahan)} 
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-3">
                                                    <div className="custom-width-form-kecil"> Kecamatan </div>
                                                    <div style={{ width: '12px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {safe(guru?.kecamatan)} 
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-3">
                                                    <div className="custom-width-form-kecil"> Kab/Kota </div>
                                                    <div style={{ width: '12px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {safe(guru?.kabupaten_kota)} 
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-3">
                                                    <div className="custom-width-form-kecil"> Provinsi </div>
                                                    <div style={{ width: '12px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {safe(guru?.provinsi)} 
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-row gap-3">
                                                    <div className="custom-width-form-kecil"> Kode Pos </div>
                                                    <div style={{ width: '12px' }}> : </div>
                                                </div>

                                                <div style={{
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-line',
                                                        maxWidth: '100%'
                                                    }}
                                                > 
                                                    {safe(guru?.kode_pos)} 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
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

export default Profile;