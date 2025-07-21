// Filename: CariPresensi.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Card } from '../../components/Molekul.jsx';
import { PrimaryButton, SecondaryButton, ToggleButton } from '../../components/Button.jsx';
import { FormInput } from '../../components/Forms.jsx';
import { iconList } from '../../data/iconData.js';
import { searchPresensiMapel, searchPresensiPiket } from '../../handlers/PresensiHandler.jsx';
import { getAllSiswa } from '../../handlers/SiswaHandler.jsx';
import { getAllMapel } from '../../handlers/MapelHandler.jsx';

function CariPresensi() {
    // Navigasi
    const navigate = useNavigate();
    
    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [primaryButtonHovering, setPrimaryButtonHovering] = useState(false);
    const [formType, setFormType] = useState('btnA');
    const [error, setError] = useState('');
    const [listMapel, setListMapel] = useState([]);
    const [listKelas, setListKelas] = useState([]);

    const [formData, setFormData] = useState({
        tanggal: '',
        siswa: '',
        mapel: '',
        kelas: '',
    });

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'tanggal' && value) setError('');
    };

    const handleCari = async () => {
        setError('');
        if (!formData.tanggal) {
            setError("Kolom Tanggal Presensi wajib diisi!");
            return;
        }

        try {
            if (formType === 'btnA') {
                // Presensi Mapel
                const data = await searchPresensiMapel({
                    tanggal: formData.tanggal,
                    nama: formData.siswa,
                    mapel: formData.mapel,
                    kelas: formData.kelas,
                });

                navigate('/piket/cari-presensi/presensi-mapel', { state: { result: data, filter: formData } });
            } else {
                // Presensi Piket
                const data = await searchPresensiPiket({
                    tanggal_presensi: formData.tanggal,
                    nama_siswa: formData.siswa,
                    kelas: formData.kelas,
                });

                navigate('/piket/cari-presensi/presensi-piket', { state: { result: data, filter: formData } });
            }
        } catch (err) {
            console.error(err);
            setError('Gagal mengambil data presensi.');
        }
    };

    React.useEffect(() => {
        // Fetch mapel
        getAllMapel().then(setListMapel);
        // Fetch siswa, lalu ambil distinct kelas
        getAllSiswa().then((data) => {
            // Ekstrak kelas unik dari data siswa
            const kelasUnik = [...new Set(data.map(s => s.kelas))];
            setListKelas(kelasUnik);
        });
    }, []);

    return (
        <div>
            <Header> Cari Presensi </Header>

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
                        onClick={() => navigate('/piket')}
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

                    {/* Form Cari Presensi */}
                    <Card style={{ width: '100%', marginTop: '45px', padding: '30px' }}>
                        <ToggleButton 
                            onToggle={(type) => setFormType(type)} 
                            childrenA="Presensi Mapel" 
                            childrenB="Presensi Piket"
                        />

                        <div className="d-flex flex-column" style={{ marginTop: '35px', marginBottom: '20px', gap: '10px' }}>
                            <FormInput
                                label="Tanggal Presensi"
                                name="tanggal"
                                type="date"
                                value={formData.tanggal}
                                onChange={handleChange}
                                placeholder="Masukkan Tanggal Presensi"
                                fontSize="15px"
                                required
                            />

                            <FormInput
                                label="Nama Siswa"
                                name="siswa"
                                value={formData.siswa}
                                onChange={handleChange}
                                placeholder="Masukkan Nama Siswa"
                                fontSize="15px"
                            />

                            {formType === 'btnA' && (
                                <FormInput
                                    label="Mata Pelajaran"
                                    name="mapel"
                                    value={formData.mapel}
                                    onChange={handleChange}
                                    placeholder="Pilih Mata Pelajaran"
                                    fontSize="15px"
                                    type="select"
                                    options={listMapel.map(mp => ({ label: mp.nama, value: mp.nama }))}
                                    required
                                />
                            )}

                            <FormInput
                                label="Kelas"
                                name="kelas"
                                value={formData.kelas}
                                onChange={handleChange}
                                placeholder="Pilih Kelas"
                                fontSize="15px"
                                type="select"
                                options={listKelas.map(kls => ({ label: kls, value: kls }))}
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {error && 
                            <div style={{ color: "red", fontWeight: 'bold', marginBottom: 16 }}> 
                                {error} 
                            </div>
                        }

                        <div className="d-flex justify-content-end mt-3">
                            <PrimaryButton 
                                width="125px" 
                                height="42px"
                                fontSize="16px"
                                className="width-button-mobile"
                                onMouseEnter={() => setPrimaryButtonHovering(true)}
                                onMouseLeave={() => setPrimaryButtonHovering(false)}
                                onClick={handleCari}
                                style={{ 
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    borderRadius: primaryButtonHovering ? '12px' : '10px',
                                    boxShadow: primaryButtonHovering ? '6px 6px 12px rgba(0, 0, 0, 0.5)' : '2px 2px 8px rgba(0, 0, 0, 0.5)',
                                    transition: 'box-shadow 0.2s ease-in-out',
                                }}
                            > 
                                Cari
                            </PrimaryButton>
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

export default CariPresensi;