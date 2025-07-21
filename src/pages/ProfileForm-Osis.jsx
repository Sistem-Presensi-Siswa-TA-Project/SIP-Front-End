// Filename: ProfileForm-Osis.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Card, CardPopUp } from '../components/Molekul.jsx';
import { SuccessButton, SecondaryButton } from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';
import { FormInput } from '../components/Forms.jsx'
import { getSiswaById, updateSiswaById } from '../handlers/SiswaHandler.jsx';

function ProfileFormOsis() {
    // Navigasi Page
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
        ? '/admin' : (location.pathname.startsWith('/guru') 
        ? '/guru' : '/piket');
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const idSiswa = params.get('id');

    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const blueWarningIcon = iconList.find((i) => i.label === 'Blue Warning Icon')?.src;
    

    const [formData, setFormData] = useState({
        namaLengkap: '',
        nomorInduk: '',
        kelas: '',
        jenisKelamin: '',
        tempatLahir: '',
        tanggalLahir: '',
        hp: '',
        kelasGabungan: '',
    });

    // Fetch data guru
    useEffect(() => {
        async function fetchGuru() {
            if (!idSiswa) return;

            try {
                const data = await getSiswaById(idSiswa);

                // Mengambil tangga lahir dalam format date
                function formatTanggal(tanggal) {
                    if (!tanggal) return '';
                    
                    // Kalau sudah YYYY-MM-DD, langsung return
                    if (/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) return tanggal;

                    // Kalau dalam bentuk Date atau string ISO, konversi
                    const d = new Date(tanggal);
                    if (isNaN(d)) return '';
                    const year = d.getFullYear();
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                }

                if (data) {
                    setFormData({
                        namaLengkap: data.nama ?? '',
                        nomorInduk: data.nisn ?? '',
                        kelas: data.kelas ?? '',
                        jenisKelamin: data.jenis_kelamin ?? '',
                        tempatLahir: data.tempat_lahir ?? '',
                        tanggalLahir: formatTanggal(data.tanggal_lahir),
                        hp: data.nomor_hp ?? '',
                        kelasGabungan: data.kelas_gabungan ?? '',
                    });
                }
            } catch (err) {
                console.error('Gagal mengambil data siswa:', err);
            }
        }
        fetchGuru();
    }, [idSiswa]);

    const handleUpdate = () => {
        // Daftar kolom yang wajib diisi beserta labelnya
        const requiredFields = [
            ['Nama Lengkap', 'namaLengkap'],
            ['Nomor Induk', 'nomorInduk'],
            ['Kelas', 'kelas'],
            ['Jenis Kelamin', 'jenisKelamin'],
            ['Tempat Lahir', 'tempatLahir'],
            ['Tanggal Lahir', 'tanggalLahir'],
        ];

        for (const [label, name] of requiredFields) {
            if (!formData[name] || !formData[name].toString().trim()) {
                setErrorMsg(`Kolom ${label} wajib diisi!`);
                return;
            }
        }
        setErrorMsg('');
        setShowUpdatePopup(true);
    };

    const handleConfirmUpdate = async () => {
        setShowUpdatePopup(false);

        if (!idSiswa) {
            setErrorMsg('ID Siswa tidak ditemukan!');
            return;
        }
        try {
            await updateSiswaById(idSiswa, {
                nama: formData.namaLengkap,
                nisn: formData.nomorInduk,
                kelas: formData.kelas,
                jenis_kelamin: formData.jenisKelamin,
                tempat_lahir: formData.tempatLahir,
                tanggal_lahir: formData.tanggalLahir,
                nomor_hp: formData.hp,
                kelas_gabungan: formData.kelasGabungan,
            });
            navigate(`${prefix}/profile/osis`);
        } catch (err) {
            setErrorMsg(
                'ERROR: ' +
                (err?.response?.data?.message || err?.message || JSON.stringify(err))
            );
        }
    };

    return (
        <div>
        <Header> Profil Form </Header>

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
                    onClick={() => navigate(`${prefix}/profile/osis`)}
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
                
                {/* Form Profile */}
                <Card
                    style={{
                        width: '100%',
                        marginTop: '35px',
                        padding: '30px',
                    }}
                >
                    <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '25px' }}> DATA DIRI </h3>

                    <div className="row" style={{ rowGap: '16px' }}>
                        {[
                            // Data Diri
                            ['Nama Lengkap', 'namaLengkap'],
                            ['Nomor Induk', 'nomorInduk'],
                            ['Kelas', 'kelas'],
                            ['Jenis Kelamin', 'jenisKelamin'],
                            ['Tempat Lahir', 'tempatLahir'],
                            ['Tanggal Lahir', 'tanggalLahir'],
                            ['Nomor Handphone', 'hp'],
                            ['Kelas Gabungan', 'kelasGabungan'],
                        ].map(([label, name], index) => {
                            const isRequired = [
                                'namaLengkap', 
                                'nomorInduk',
                                'kelas',
                                'jenisKelamin',
                                'tempatLahir',
                                'tanggalLahir',
                            ].includes(name);

                            const isReadOnly = [
                                'namaLengkap', 
                                'nomorInduk', 
                                'kelas', 
                                'jenisKelamin', 
                                'kelasGabungan'
                            ].includes(name);
                            
                            return (
                                <div className="col-md-4 col-sm-12" key={index}>
                                    <FormInput
                                        label={label}
                                        name={name}
                                        type={
                                            name === 'tanggalLahir'
                                                ? 'date'
                                                : name === 'hp'
                                                ? 'tel'
                                                : 'text'
                                        }
                                        value={formData[name]}
                                        required={isRequired}
                                        readOnly={isReadOnly}
                                        placeholder={label}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, [name]: e.target.value }))
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Jika data yang bersifat required kosong */}
                    {errorMsg && (
                        <div className="d-flex flex-column" style={{ color: "red", fontWeight: 'bold', marginBottom: 18 }}>
                            <div> Harap periksa kembali setiap kolom yang diinput harus sesuai format! </div>
                            <div> {errorMsg} </div>
                        </div>
                    )}

                    {/* Tombol Simpan */}
                    <div className="d-flex justify-content-end justify-content-md-center mt-4">
                        <SuccessButton
                            className="d-flex align-items-center justify-content-center"
                            width="150px"
                            height="45px"
                            style={{
                                padding: '8px 28px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                borderRadius: successButtonHovering ? '14px' : '12px',
                                boxShadow: successButtonHovering
                                    ? '4px 4px 8px rgba(0, 0, 0, 0.5)'
                                    : '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                transition: 'box-shadow 0.2s ease-in-out',
                            }}
                            onMouseEnter={() => setSuccessButtonHovering(true)}
                            onMouseLeave={() => setSuccessButtonHovering(false)}
                            onClick={handleUpdate}
                        >
                            SIMPAN
                        </SuccessButton>
                    </div>
                </Card>            
            </div>
        </main>

        {/* Popup konfirmasi ubah data guru */}
        <CardPopUp
            open={showUpdatePopup}
            image={blueWarningIcon}
            borderColor="#1976D2"
            buttons={[
                {
                    label: "Kembali",
                    bgColor: "#FFFFFF",
                    textColor: "#1976D2",
                    borderColor: "#1976D2",
                    onClick: () => setShowUpdatePopup(false),
                },

                {
                    label: "Ya, Saya Yakin",
                    bgColor: "#1976D2",
                    textColor: "#FFFFFF",
                    borderColor: "#1976D2",
                    onClick: handleConfirmUpdate,
                }
            ]}
        >
            <React.Fragment>
                Apakah Anda yakin ingin memperbarui data diri? 
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

export default ProfileFormOsis;