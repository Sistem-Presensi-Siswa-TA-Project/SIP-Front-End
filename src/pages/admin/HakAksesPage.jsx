// Filename: HakAksesPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Card } from '../../components/Molekul.jsx';
import { PrimaryButton, SecondaryButton} from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';

function HakAkses() {
    // State Hovering
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    
    // Navigasi Page
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
        ? '/admin' : (location.pathname.startsWith('/guru') 
        ? '/guru' : '/piket');
    const navigate = useNavigate();

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const piketIcon = iconList.find((i) => i.label === 'People')?.src;
    const guruIcon = iconList.find((i) => i.label === 'Guru Icon')?.src;
    const arrowRightBlack = iconList.find((i) => i.label === 'Arrow Right Black')?.src;

    return (
        <div>
            <Header> Hak Akses Pengguna </Header>

            <main
                className="d-flex justify-content-center flex-wrap"
                style={{ gap: '20px' }}
            >
                <div 
                    className="d-flex flex-column align-items-center w-100 mx-auto px-4" 
                    style={{ maxWidth: '1100px', paddingTop: '40px' }}
                >
                    <div className="d-flex flex-column align-items-start w-100 mx-auto">
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
                    
                        {/* Main Card */}
                        <div 
                            className="d-flex flex-column flex-lg-row custom-container w-100" 
                            style={{ marginTop: '30px', gap: '30px'}}
                        >
                            {/* Data Guru */}
                            <Card 
                                className="w-100 d-flex justify-content-center align-items-start" 
                                height="calc(100% + 10px)" 
                                style={{ padding: '30px' }}
                                onClick={() => navigate(`${prefix}/user/guru`)}
                            >
                                <div 
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        paddingBottom: '15px',
                                        alignItems: 'center'
                                    }}>

                                    <img 
                                        src={guruIcon} 
                                        alt="guru icon" 
                                        width="80px" 
                                        height="80px"
                                        style={{ marginRight: '15px' }} 
                                    />

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4px' }}>
                                        <span style={{ fontSize: '25px', fontWeight: 'bold', color: "#000" }}> Guru Mata Pelajaran </span>
                                    </div>
                                </div>

                                {/* Ikon panah kanan */}
                                <img
                                    src={arrowRightBlack}
                                    alt="arrow"
                                    width="35"
                                    height="35"
                                    style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '20px'
                                    }}
                                />
                            </Card>

                            {/* Data Petugas Piket */}
                            <Card 
                                className="w-100 d-flex justify-content-center align-items-start" 
                                height="calc(100% + 10px)" 
                                style={{ padding: '30px' }}
                                onClick={() => navigate(`${prefix}/user/piket`)}
                            >
                                <div 
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        paddingBottom: '15px',
                                        alignItems: 'center'
                                    }}>

                                    <img 
                                        src={piketIcon} 
                                        alt="guru icon" 
                                        width="80px" 
                                        height="80px"
                                        style={{ marginRight: '15px' }} 
                                    />

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4px' }}>
                                        <span style={{ fontSize: '25px', fontWeight: 'bold', color: "#000" }}> Petugas Piket </span>
                                    </div>
                                </div>

                                {/* Ikon panah kanan */}
                                <img
                                    src={arrowRightBlack}
                                    alt="arrow"
                                    width="35"
                                    height="35"
                                    style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '20px'
                                    }}
                                />
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

export default HakAkses;