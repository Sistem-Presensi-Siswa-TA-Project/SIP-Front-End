// Filename: ProfileForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Card } from '../components/Molekul.jsx';
import { SuccessButton, SecondaryButton } from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';
import { FormInput } from '../components/Forms.jsx'

function ProfileForm() {
    const navigate = useNavigate();
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);

    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;

    const [formData, setFormData] = useState({
        namaLengkap: '',
        email: '',
        alamatDomisili: '',
        jenisKelamin: '',
        kewarganegaraan: '',
        desa: '',
        tempatLahir: '',
        tanggalLahir: '',
        rt: '',
        rw: '',
        nip: '',
        kecamatan: '',
        agama: '',
        mapel: '',
        kabupaten: '',
        nik: '',
        status: '',
        provinsi: '',
        hp: '',
        pendidikan: '',
        kodePos: '',
    });

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
                            ['Nama Lengkap', 'namaLengkap'],
                            ['Email', 'email'],
                            ['Alamat Lengkap', 'alamat'],
                            ['RT', 'rt'],
                            ['RW', 'rw'],
                            ['Jenis Kelamin', 'jenisKelamin'],
                            ['Kewarganegaraan', 'kewarganegaraan'],
                            ['Desa/Kelurahan', 'desa'],
                            ['Tempat Lahir', 'tempatLahir'],
                            ['Tanggal Lahir', 'tanggalLahir'],
                            ['NIP/NISN', 'nomorInduk'],
                            ['Kecamatan', 'kecamatan'],
                            ['Agama', 'agama'],
                            ['Mata Pelajaran', 'mapel'],
                            ['Kabupaten/Kota', 'kabupaten'],
                            ['Nomor Induk Kependudukan (NIK)', 'nik'],
                            ['Status', 'status'],
                            ['Provinsi', 'provinsi'],
                            ['Nomor Handphone', 'hp'],
                            ['Pendidikan', 'pendidikan'],
                            ['Kode Pos', 'kodePos'],
                        ].map(([label, name], index) => {
                            const isRequired = [
                                'namaLengkap', 
                                'agama', 
                                'nomorInduk', 
                                'kewarganegaraan', 
                                'alamat', 
                                'email', 
                                'jenisKelamin', 
                                'tempatLahir', 
                                'tanggalLahir', 
                                'nik', 
                                'hp',
                                'desa',
                                'kecamatan',
                                'kabupaten',
                                'provinsi',
                            ].includes(name);

                            const isReadOnly = ['mapel', 'nomorInduk', 'namaLengkap'].includes(name);
                            
                            return (
                                <div className="col-md-4 col-sm-12" key={index}>
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
                                </div>
                            );
                        })}
                    </div>

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
                        >
                            SIMPAN
                        </SuccessButton>
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

export default ProfileForm;