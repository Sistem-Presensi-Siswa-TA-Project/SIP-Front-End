// Filename: CariPresensi.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Card } from '../../components/Molekul.jsx';
import { PrimaryButton, SecondaryButton, ToggleButton } from '../../components/Button.jsx';
import { FormInput } from '../../components/Forms.jsx';
import { iconList } from '../../data/iconData.js';

function CariPresensi() {
    const navigate = useNavigate();
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [primaryButtonHovering, setPrimaryButtonHovering] = useState(false);
    const [formType, setFormType] = useState('mapel');

    const [formData, setFormData] = useState({
        tanggal: '',
        siswa: '',
        mapel: '',
        kelas: '',
    });

    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                                    placeholder="Masukkan Mata Pelajaran"
                                    fontSize="15px"
                                />
                            )}

                            <FormInput
                                label="Kelas"
                                name="kelas"
                                value={formData.kelas}
                                onChange={handleChange}
                                placeholder="Masukkan Kelas"
                                fontSize="15px"
                            />
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                            <PrimaryButton 
                                width="125px" 
                                height="42px"
                                fontSize="16px"
                                className="width-button-mobile"
                                onMouseEnter={() => setPrimaryButtonHovering(true)}
                                onMouseLeave={() => setPrimaryButtonHovering(false)}
                                onClick={() => navigate('/piket/lihat-presensi')}
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