// Filename: OpsiCetakPresensi.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card } from '../../components/Molekul.jsx';
import { SecondaryButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';

function OpsiCetakPresensi() {
    const navigate = useNavigate();
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);

    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const hadirIcon = iconList.find((i) => i.label === 'Hadir Icon')?.src;
    const izinIcon = iconList.find((i) => i.label === 'Izin Icon')?.src;
    const sakitIcon = iconList.find((i) => i.label === 'Sakit Icon')?.src;
    const alpaIcon = iconList.find((i) => i.label === 'Alpa Icon')?.src;

    return (
        <div>
        <Header> Cetak Presensi </Header>

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
            

            {/* Cetak Presensi Content */}
            <Card style={{ width: '100%', marginTop: '45px', padding: '30px' }}>
                {/* Title */}
                <h4 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '28px' }}> 
                Presensi Siswa 
                </h4>

                {/* Tombol Cetak */}
                <div style={{ display: 'flex', marginBottom: '45px' }}>
                    {["COPY", "EXCEL", "PDF", "PRINT"].map((label, i) => (
                    <button
                        key={label}
                        onMouseEnter={() => setHoveredId(i)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                            background: hoveredId === i ? '#B3B3B3' : '#C7C7C7',
                            color: '#000',
                            border: '1px solid #888',
                            borderRadius: '3px',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            padding: '4px 15px',
                            marginRight: '2px',
                            cursor: 'pointer',
                            minWidth: '72px',
                        }}
                    >
                        {label}
                    </button>
                    ))}
                </div>

                {/* Keterangan */}
                <div style={{ marginTop: '150px', marginBottom: '13px' }}>
                    <strong style={{ fontSize: '18px' }}> Keterangan: </strong>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-3">
                <div className="d-flex justify-content-center align-items-center gap-1">
                    <img src={hadirIcon} alt="Hadir" width="28" height="28" /> <strong> = Hadir </strong>
                </div>

                <div className="d-flex justify-content-center align-items-center gap-1">
                    <img src={izinIcon} alt="Izin" width="28" height="28" /> <strong> = Izin </strong>
                </div>

                <div className="d-flex justify-content-center align-items-center gap-1">
                    <img src={sakitIcon} alt="Sakit" width="28" height="28" /> <strong> = Sakit </strong>
                </div>

                <div className="d-flex justify-content-center align-items-center gap-1">
                    <img src={alpaIcon} alt="Alpa" width="28" height="28" /> <strong> = Alpa </strong>
                </div>
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

export default OpsiCetakPresensi;