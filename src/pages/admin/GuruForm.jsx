// Filename: GuruForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Card } from '../../components/Molekul.jsx';
import { SuccessButton, SecondaryButton } from '../../components/Button.jsx';
import { FormInput } from '../../components/Forms.jsx'
import { iconList } from '../../data/iconData.js';

function GuruForm() {
    const navigate = useNavigate();
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);

    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;

    const [formData, setFormData] = useState({
        nip: '',
        nama: '',
        mapel: '',
        jenisKelamin: '',
    });

    return (
        <div>
            <Header> Form Guru </Header>

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
                        <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '25px' }}> 
                            DATA GURU
                        </h3>

                        <div className="row" style={{ rowGap: '16px' }}>
                            {[
                                ['NIP/NUPTK', 'nomorInduk'],
                                ['Nama Lengkap', 'nama'],
                                ['Mata Pelajaran', 'mapel'],
                                ['Jenis Kelamin', 'jenisKelamin'],
                                ['Jabatan', 'jabatan'],
                            ].map(([label, name], index) => {
                                const isRequired = [
                                    'nama', 
                                    'nomorInduk', 
                                    'mapel',
                                    'jenisKelamin',
                                    'jabatan',
                                ].includes(name);
                                
                                return (
                                    <div className="col-md-6 col-sm-12" key={index}>
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
                                                type='text'
                                                value={formData[name]}
                                                required={isRequired}
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

export default GuruForm;