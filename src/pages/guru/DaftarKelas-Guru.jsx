// Filename: DaftarKelas-Guru.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Card, CardPresensi } from '../../components/Molekul.jsx';
import { SecondaryButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';

function DaftarKelasGuru() {
    const navigate = useNavigate();
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);

    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;

    const kelasList = [
        '7A', '7B', '8A', '8B', '9A', '9B', '9C',
    ];

    return (
        <div>
            <Header>Daftar Kelas</Header>

            <main
                className="d-flex justify-content-center flex-wrap"
                style={{ gap: '20px' }}
            >
                <div className="d-flex flex-column align-items-start w-100 px-4" style={{ maxWidth: '1100px', paddingTop: '40px' }}>
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
                            style={{ marginLeft: '4px' }}
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

                    {/* Daftar Kelas */}
                    <Card
                        style={{
                            width: '100%',
                            marginTop: '35px',
                            padding: '30px',
                        }}
                    >
                        {/* Title */}
                        <h4 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '30px' }}> 
                            Daftar Kelas 
                        </h4>

                        <div className="row" style={{ rowGap: '50px' }}>
                            {kelasList.map((kelas, index) => (
                                <div className="col-md-4 col-sm-6 col-12 d-flex justify-content-center" key={index}>
                                    <CardPresensi
                                        namaKelas={`Kelas ${kelas}`}
                                        tahunAjar="202X/202X Ganjil"
                                        totalSiswa="XX"
                                        to={'/pertemuan'}
                                    />
                                </div>
                            ))}
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

export default DaftarKelasGuru;