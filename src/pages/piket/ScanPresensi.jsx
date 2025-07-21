// Filename: ScanPresensi.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Card, Camera } from '../../components/Molekul.jsx';
import { CustomButton, SecondaryButton } from '../../components/Button.jsx';
import { FormInput } from '../../components/Forms.jsx';
import { iconList } from '../../data/iconData.js';
import { getAllSiswa } from '../../handlers/SiswaHandler.jsx';

function ScanPresensi() {
    const navigate = useNavigate();
    const camRef = useRef();

    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [customButtonHovering, setCustomButtonHovering] = useState(false);
    const [qrCodeHovering, setQRCodeHovering] = useState(false);
    const [teksHovering, setTeksHovering] = useState(false);
    const [cancelButtonHovering, setCancelButtonHovering] = useState(false);
    const [swapButtonHovering, setSwapButtonHovering] = useState(false);
    const [showCam, setShowCam] = useState(false);
    const [kelasList, setKelasList] = useState([]);

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const qrCodeIcon = iconList.find((i) => i.label === 'QR Code')?.src;
    const cancelIconA = iconList.find((i) => i.label === 'Cancel Icon A')?.src;
    const cancelIconB = iconList.find((i) => i.label === 'Cancel Icon B')?.src;
    const swapCamera = iconList.find((i) => i.label === 'Swap Camera')?.src;

    const [formData, setFormData] = useState({
        waktu: '',
        nisn: '',
        nama: '',
        kelas: '',
        jenis: '',
        cat: '',
    });

    // Form required (selain cat)
    const requiredFields = ['waktu', 'nisn', 'nama', 'kelas', 'jenis'];
    const isButtonDisabled = requiredFields.some(field => !formData[field] || !formData[field].trim());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Ambil kelas dari semua siswa (unik, urut)
    React.useEffect(() => {
        async function fetchKelas() {
            try {
                const siswa = await getAllSiswa() || [];
                const kelasUnik = Array.from(new Set((siswa || []).map(s => s.kelas))).sort();
                setKelasList(kelasUnik);
            } catch (err) {
                console.error(err);
                setKelasList([]);
            }
        }
        fetchKelas();
    }, []);

    // Ambil waktu up-to-date (real-time)
    React.useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().toLocaleTimeString('en-GB', { hour12: false });
            setFormData((prev) => ({ ...prev, waktu: now }));
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Header> Presensi Piket </Header>

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

                    {/* Scan Presensi */}
                    <Card style={{ width: '100%', marginTop: '45px', padding: '30px' }}>
                        {/* Kamera untuk Scan Presensi */}
                        <div className="d-flex flex-column justify-content-center align-items-center mt-2">
                            {!showCam ? (
                                // === Div Buka Kamera ===
                                <div 
                                    className="d-flex flex-column justify-content-center align-items-center"
                                    onClick={() => setShowCam(true)}
                                    onMouseEnter={() => setQRCodeHovering(true)}
                                    onMouseLeave={() => setQRCodeHovering(false)}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '150px',
                                        height: '150px',
                                        cursor: 'pointer',
                                        borderRadius: '20px',
                                        boxShadow: qrCodeHovering ? '3px 3px 12px rgba(0, 0, 0, 0.45)' : '',
                                        transition: 'box-shadow 0.3s ease-in-out',
                                    }}
                                >
                                    <img 
                                        src={qrCodeIcon}
                                        alt="QR Code"
                                        width="100px"
                                        height="100px"
                                        style={{ marginBottom: '5px' }}
                                        draggable={false}
                                    />

                                    <span 
                                        onMouseEnter={() => setTeksHovering(true)}
                                        onMouseLeave={() => setTeksHovering(false)}
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            textDecoration: teksHovering ? 'underline' : '',
                                            color: '#000',
                                            marginLeft: '2px'
                                        }}
                                    >
                                        Buka Kamera
                                    </span>
                                </div>
                            ) : (
                                // === Div Kamera Aktif ===
                                <div 
                                    style={{ 
                                        position: 'relative', 
                                        marginTop: '20px', 
                                        borderRadius: '15px', 
                                        boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.4)'
                                    }}
                                >
                                    <Camera ref={camRef} />

                                    {/* Tombol Close */}
                                    <img 
                                        src={cancelButtonHovering ? cancelIconB : cancelIconA}
                                        alt="Cancel"
                                        width="34px"
                                        height="34px"


                                        onClick={() => {
                                            if (camRef.current) camRef.current.stopCamera(); // Stop Camera
                                            setShowCam(false);
                                            setTeksHovering(false);
                                            setQRCodeHovering(false);
                                        }}

                                        onMouseEnter={() => setCancelButtonHovering(true)}
                                        onMouseLeave={() => setCancelButtonHovering(false)}

                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            left: '12px',
                                            cursor: 'pointer',
                                            backgroundColor: '#FFF',
                                            borderRadius: '50%',
                                        }}
                                        draggable={false}
                                    />

                                    {/* Tombol Swap Camera */}
                                    <img 
                                        src={swapCamera}
                                        alt="Swap"
                                        width="34px"
                                        height="34px"


                                        onClick={() => {
                                            if (camRef.current) camRef.current.swapCamera(); // Swap Camera
                                        }}

                                        onMouseEnter={() => setSwapButtonHovering(true)}
                                        onMouseLeave={() => setSwapButtonHovering(false)}

                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            right: '12px',
                                            cursor: 'pointer',
                                            backgroundColor: swapButtonHovering ? '#4D4D4D' : '#808080',
                                            borderRadius: '50%',
                                        }}
                                        draggable={false}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Form Presensi Piket */}
                        <div 
                            className="d-flex flex-column justify-content-center align-items-center w-full"
                            style={{ marginTop: '5px' }}
                        >
                            {[
                                ['Waktu Presensi', 'Waktu Presensi', 'waktu'],
                                ['Nomor Induk Siswa', 'Nomor Induk Siswa', 'nisn'],
                                ['Nama Siswa', 'Nama Siswa', 'nama'],
                                ['Kelas', 'Kelas', 'kelas'],
                                ['Jenis Presensi', 'Jenis Presensi', 'jenis'],
                                ['Catatan', 'Catatan', 'cat'],
                            ].map(([label, placeholder, name], index) => {
                                const isRequired = requiredFields.includes(name);
                                return (
                                    <div style={{ maxWidth: '650px', width: '100%' }} key={index}>
                                        {name === 'jenis' ? (
                                            <FormInput
                                                label={label}
                                                name={name}
                                                value={formData[name]}
                                                required={isRequired}
                                                placeholder={placeholder}
                                                onChange={handleChange}
                                                options={['Presensi Masuk', 'Presensi Pulang']}
                                            />
                                        ) : name === 'kelas' ? (
                                            <FormInput
                                                label={label}
                                                name={name}
                                                value={formData[name]}
                                                required={isRequired}
                                                placeholder={placeholder}
                                                onChange={handleChange}
                                                options={kelasList.map(k => ({ value: k, label: k }))}
                                            />
                                        ) : name === 'waktu' ? (
                                            <FormInput
                                                label={label}
                                                name={name}
                                                value={formData[name]}
                                                required={isRequired}
                                                placeholder={placeholder}
                                                onChange={handleChange}
                                                readOnly
                                            />
                                        ) : (
                                            <FormInput
                                                label={label}
                                                name={name}
                                                value={formData[name]}
                                                required={isRequired}
                                                placeholder={placeholder}
                                                onChange={handleChange}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Tombol Simpan */}
                        <div className="d-flex justify-content-end justify-content-md-center mt-4">
                            <CustomButton
                                className="d-flex align-items-center justify-content-center"
                                width="120px"
                                height="45px"
                                disabled={isButtonDisabled}
                                style={{
                                    padding: '8px 28px',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    borderRadius: customButtonHovering ? '14px' : '12px',
                                    backgroundColor: isButtonDisabled 
                                        ? '#666' 
                                        : (customButtonHovering ? '#FFF' : '#33DB00'),
                                    borderColor: isButtonDisabled ? '#666' : '#33DB00',
                                    color: customButtonHovering ? '#33DB00' : 'white',
                                    boxShadow: !isButtonDisabled && customButtonHovering
                                        ? '4px 4px 8px rgba(0, 0, 0, 0.5)'
                                        : '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                    transition: 'box-shadow 0.2s ease-in-out',
                                    cursor: isButtonDisabled ? 'not-allowed' : 'pointer'
                                }}
                                onMouseEnter={() => !isButtonDisabled && setCustomButtonHovering(true)}
                                onMouseLeave={() => !isButtonDisabled && setCustomButtonHovering(false)}
                                onClick={() => {
                                    if (!isButtonDisabled) {
                                        // aksi simpan
                                        console.log("Simpan data presensi", formData);
                                    }
                                }}
                            >
                                SIMPAN
                            </CustomButton>
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

export default ScanPresensi;