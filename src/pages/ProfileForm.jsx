// Filename: ProfileForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Card, CardPopUp } from '../components/Molekul.jsx';
import { SuccessButton, SecondaryButton } from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';
import { FormInput } from '../components/Forms.jsx'
import { getGuruById, putGuruById } from '../handlers/GuruHandler.jsx';

function ProfileForm() {
    // Navigasi Page
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
        ? '/admin' : (location.pathname.startsWith('/guru') 
        ? '/guru' : '/piket');
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const idGuru = params.get('id');

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
        jenisKelamin: '',
        tempatLahir: '',
        tanggalLahir: '',
        agama: '',
        nik: '',
        hp: '',
        email: '',
        nomorInduk: '',
        mapel: '',
        jabatan: '',
        pendidikan: '', 
        alamat: '',
        rt: '',
        rw: '',
        desa: '',
        kecamatan: '',
        kabupaten: '',
        provinsi: '',
        kodePos: '',
    });

    // Fetch data guru
    useEffect(() => {
        async function fetchGuru() {
            if (!idGuru) return;

            try {
                const data = await getGuruById(idGuru);

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
                        // Data Diri
                        namaLengkap: data.nama ?? '',
                        jenisKelamin: data.jenis_kelamin ?? '',
                        tempatLahir: data.tempat_lahir ?? '',
                        tanggalLahir: formatTanggal(data.tanggal_lahir),
                        agama: data.agama ?? '',
                        nik: data.NIK ?? '',
                        hp: data.nomor_hp ?? '',
                        email: data.email ?? '',

                        // Data Akademik
                        nomorInduk: data.nomor_induk ?? '',
                        mapel: data.mata_pelajaran ?? '',
                        jabatan: data.jabatan ?? '',
                        pendidikan: data.pendidikan ?? '',

                        // Alamat
                        alamat: data.alamat ?? '',
                        rt: data.rt ?? '',
                        rw: data.rw ?? '',
                        desa: data.kelurahan ?? '',
                        kecamatan: data.kecamatan ?? '',
                        kabupaten: data.kabupaten_kota ?? '',
                        provinsi: data.provinsi ?? '',
                        kodePos: data.kode_pos ?? '',
                    });
                }
            } catch (err) {
                console.error('Gagal mengambil data guru:', err);
            }
        }
        fetchGuru();
    }, [idGuru]);

    const handleSimpan = () => {
        // Daftar kolom yang wajib diisi beserta labelnya
        const requiredFields = [
            ['Nama Lengkap', 'namaLengkap'],
            ['Jenis Kelamin', 'jenisKelamin'],
            ['Tempat Lahir', 'tempatLahir'],
            ['Tanggal Lahir', 'tanggalLahir'],
            ['Agama', 'agama'],
            ['Email', 'email'],
            ['Nomor Handphone', 'hp'],
            ['Nomor Induk', 'nomorInduk'],
            ['Alamat', 'alamat'],
            ['Desa/Kelurahan', 'desa'],
            ['Kecamatan', 'kecamatan'],
            ['Kabupaten/Kota', 'kabupaten'],
            ['Provinsi', 'provinsi'],
        ];

        for (const [label, name] of requiredFields) {
            if (!formData[name] || !formData[name].toString().trim()) {
                setErrorMsg(`Kolom ${label} wajib diisi!`);
                return;
            }
        }

        // Validasi email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            setErrorMsg("Kolom Email harus berformat valid (misal: user@email.com)!");
            return;
        }
        
        setErrorMsg('');
        setShowUpdatePopup(true);
    };

    const handleConfirmUpdate = async () => {
        setShowUpdatePopup(false);
        if (!idGuru) {
            setErrorMsg('ID Guru tidak ditemukan!');
            return;
        }
        try {
            await putGuruById(idGuru, {
                // Data Diri
                nama: formData.namaLengkap,
                jenis_kelamin: formData.jenisKelamin,
                tempat_lahir: formData.tempatLahir,
                tanggal_lahir: formData.tanggalLahir,
                agama: formData.agama,
                NIK: formData.nik,
                nomor_hp: formData.hp,
                email: formData.email,

                // Data Akademik
                nomor_induk: formData.nomorInduk,
                mata_pelajaran: formData.mapel,
                jabatan: formData.jabatan,
                pendidikan: formData.pendidikan,

                // Alamat
                alamat: formData.alamat,
                rt: formData.rt,
                rw: formData.rw,
                kelurahan: formData.desa,
                kecamatan: formData.kecamatan,
                kabupaten_kota: formData.kabupaten,
                provinsi: formData.provinsi,
                kode_pos: formData.kodePos,
            });
            alert('Data diri berhasil diperbarui!');
            navigate(`${prefix}/profile`);
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
                    onClick={() => navigate(`${prefix}/profile`)}
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
                            ['Jenis Kelamin', 'jenisKelamin'],
                            ['Tempat Lahir', 'tempatLahir'],
                            ['Tanggal Lahir', 'tanggalLahir'],
                            ['Agama', 'agama'],
                            ['Nomor Induk Kependudukan (NIK)', 'nik'],
                            ['Nomor Handphone', 'hp'],
                            ['Email', 'email'],

                            // Data Akademik
                            ['Nomor Induk', 'nomorInduk'],
                            ['Mata Pelajaran', 'mapel'],
                            ['Jabatan', 'jabatan'],
                            ['Pendidikan', 'pendidikan'],

                            // Alamat
                            ['Alamat', 'alamat'],
                            ['RT', 'rt'],
                            ['RW', 'rw'],
                            ['Desa/Kelurahan', 'desa'],
                            ['Kecamatan', 'kecamatan'],
                            ['Kabupaten/Kota', 'kabupaten'],
                            ['Provinsi', 'provinsi'],
                            ['Kode Pos', 'kodePos'],
                        ].map(([label, name], index) => {
                            const isRequired = [
                                'namaLengkap', 
                                'jenisKelamin', 
                                'tempatLahir', 
                                'tanggalLahir', 
                                'agama', 
                                'nomorInduk',
                                'mapel',
                                'jabatan',
                                'alamat', 
                                'email', 
                                'hp',
                                'desa',
                                'kecamatan',
                                'kabupaten',
                                'provinsi',
                            ].includes(name);

                            const isReadOnly = ['mapel', 'nomorInduk', 'namaLengkap', 'jabatan'].includes(name);
                            
                            return (
                                <div className="col-md-4 col-sm-12" key={index}>
                                    {name === 'jenisKelamin' ? (
                                        <FormInput
                                            label={label}
                                            name={name}
                                            value={formData[name]}
                                            required= {isRequired}
                                            placeholder={label}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, [name]: e.target.value }))
                                            }
                                            options={['Laki-Laki', 'Perempuan']}
                                        />
                                    ) : (
                                        <FormInput
                                            label={label}
                                            name={name}
                                            type={
                                                name === 'email'
                                                    ? 'email'
                                                    : name === 'tanggalLahir'
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
                                    )}
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
                            onClick={handleSimpan}
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

export default ProfileForm;