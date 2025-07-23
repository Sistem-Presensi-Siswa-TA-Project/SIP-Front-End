// Filename: ScanPresensi.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Card, CardPopUp } from '../../components/Molekul.jsx';
import { CustomButton, SecondaryButton } from '../../components/Button.jsx';
import { FormInput } from '../../components/Forms.jsx';
import { iconList } from '../../data/iconData.js';
import { getSiswaByNISN } from '../../handlers/SiswaHandler.jsx';
import { createPresensiPiket } from '../../handlers/PresensiHandler.jsx';
import { getPiketByKodePiket } from '../../handlers/PiketHandler.jsx';
import { Html5Qrcode } from 'html5-qrcode';

function ScanPresensi() {
    const navigate = useNavigate();

    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [customButtonHovering, setCustomButtonHovering] = useState(false);
    const [qrCodeHovering, setQRCodeHovering] = useState(false);
    const [teksHovering, setTeksHovering] = useState(false);
    const [cancelButtonHovering, setCancelButtonHovering] = useState(false);
    const [swapButtonHovering, setSwapButtonHovering] = useState(false);
    const [showCam, setShowCam] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [facingMode, setFacingMode] = useState('environment');
    const [errorMsg, setErrorMsg] = useState('');
    const [showQrInvalidPopup, setShowQrInvalidPopup] = useState(false);
    const [showSimpanPopup, setShowSimpanPopup] = useState(false);
    const [errorMsg2, setErrorMsg2] = useState('');
    const [loadingSimpan, setLoadingSimpan] = useState(false);
    const [loadingPiket, setLoadingPiket] = useState(true);
    const [nomorIndukPiket, setNomorIndukPiket] = useState('');
    const [loadingSearchNisn, setLoadingSearchNisn] = useState(false);
    const [searchNisnError, setSearchNisnError] = useState('');

    const qrRef = useRef(null);
    const html5QrCodeInstance = useRef(null);

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const qrCodeIcon = iconList.find((i) => i.label === 'QR Code')?.src;
    const cancelIconA = iconList.find((i) => i.label === 'Cancel Icon A')?.src;
    const cancelIconB = iconList.find((i) => i.label === 'Cancel Icon B')?.src;
    const swapCamera = iconList.find((i) => i.label === 'Swap Camera')?.src;
    const yellowWarningIcon = iconList.find(i => i.label === "Yellow Warning Icon")?.src;
    const greenWarningIcon = iconList.find(i => i.label === "Green Warning Icon")?.src;
    const searchIcon = iconList.find(i => i.label === "Search Icon")?.src;

    // Form data
    const [formData, setFormData] = useState({
        waktu: '',
        nisn: '',
        nama: '',
        kelas: '',
        jenis: '',
        cat: '',
    });

    // Form required (selain kolom catatan)
    const requiredFields = ['waktu', 'nisn', 'nama', 'kelas', 'jenis'];
    const isButtonDisabled = requiredFields.some(field => !formData[field] || !formData[field].trim());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handler tombol simpan (validasi & popup)
    const handleSimpan = () => {
        if (isButtonDisabled) {
            setErrorMsg2("Mohon isi field wajib!");
            return;
        }

        setErrorMsg2('');
        setShowSimpanPopup(true);
    };

    // Handler confirm simpan
    const handleConfirmSimpan = async () => {
        setLoadingSimpan(true);
        setErrorMsg2('');
        try {
            // Ambil tanggal hari ini (format YYYY-MM-DD)
            const todayString = new Date().toISOString().slice(0, 10);

            // Siapkan payload
            const payload = {
                nisn: formData.nisn,
                tanggal_presensi: todayString,
                waktu: formData.waktu,
                nama_siswa: formData.nama,
                kelas: formData.kelas,
                nomor_induk_piket: nomorIndukPiket || '-',
                jenis: formData.jenis,
                catatan: formData.cat
            };

            await createPresensiPiket(payload);
            setShowSimpanPopup(false);
            setErrorMsg2('');

            // Refresh halaman:
            window.location.reload();
        } catch (err) {
            setErrorMsg2(err.message);
        } finally {
            setShowSimpanPopup(false);
            setLoadingSimpan(false);
        }
    };

    const handleSearchNisn = async () => {
        setLoadingSearchNisn(true);
        setSearchNisnError('');
        try {
            if (!formData.nisn) {
                setSearchNisnError('Nomor induk siswa wajib diisi!');
                setLoadingSearchNisn(false);
                return;
            }
            const siswa = await getSiswaByNISN(formData.nisn);
            if (siswa) {
                setFormData(prev => ({
                    ...prev,
                    nama: siswa.nama || '',
                    kelas: siswa.kelas || '',
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    nama: '',
                    kelas: '',
                }));
                setSearchNisnError('Nomor induk siswa belum terdaftar!');
            }
        } catch (err) {
            console.error(err);
            setSearchNisnError('Terjadi kesalahan saat mencari nomor induk siswa!');
        } finally {
            setLoadingSearchNisn(false);
        }
    };

    // Ambil nomor induk piket
    React.useEffect(() => {
        async function fetchNomorIndukPiket() {
            setLoadingPiket(true);
            try {
                const kodePiket = localStorage.getItem('username');
                if (!kodePiket) {
                    setNomorIndukPiket('');
                    setLoadingPiket(false);
                    return;
                }
                const data = await getPiketByKodePiket(kodePiket);
                setNomorIndukPiket(data?.nomor_induk || '');
            } catch (err) {
                console.error(err);
                setNomorIndukPiket('');
            } finally {
                setLoadingPiket(false);
            }
        }
        fetchNomorIndukPiket();
    }, []);

    // Ambil waktu up-to-date (real-time)
    React.useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().toLocaleTimeString('en-GB', { hour12: false });
            setFormData((prev) => ({ ...prev, waktu: now }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // QR Code: Hasil Scan
    const handleScan = async (data) => {
        if (data && !scanned) {
            setScanned(true);
            setSearchNisnError('');

            const nisn = data.trim();
            setFormData(prev => ({ ...prev, nisn }));

            // Get data siswa by NISN, lalu set nama dan kelas
            try {
                const siswa = await getSiswaByNISN(nisn);

                if (siswa) {
                    setFormData(prev => ({
                        ...prev,
                        nisn: siswa.nisn || nisn,
                        nama: siswa.nama || '',
                        kelas: siswa.kelas || '',
                    }));
                } else {
                    // === QR code tidak valid (tidak ditemukan) ===
                    setShowQrInvalidPopup(true);
                }
            } catch (err) {
                setFormData(prev => ({ ...prev, nama: '', kelas: '' }));
                setShowQrInvalidPopup(true);
                console.error(err);
            }

            setTimeout(() => setScanned(false), 1500);
            setShowCam(false);
            stopScanner();
        }
    };

    // Start/Stop html5-qrcode scanner
    const startScanner = async () => {
        setErrorMsg('');
        if (!qrRef.current) return;
        try {
            if (html5QrCodeInstance.current) {
                await html5QrCodeInstance.current.stop();
                html5QrCodeInstance.current.clear();
            }

            html5QrCodeInstance.current = new Html5Qrcode("qr-reader-box");
            await html5QrCodeInstance.current.start(
                { facingMode },
                { fps: 10, qrbox: 250 },
                (decodedText) => handleScan(decodedText),
                (err) => {
                    console.error(err);
                }
            );
        } catch (e) {
            setErrorMsg('Tidak dapat mengakses kamera.\nSilakan coba tutup lalu buka kamera lagi atau refresh halaman!');
            console.error(e);
        }
    };

    const stopScanner = async () => {
        try {
            if (html5QrCodeInstance.current) {
                await html5QrCodeInstance.current.stop();
                html5QrCodeInstance.current.clear();
                html5QrCodeInstance.current = null;
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Auto start/stop scanner on showCam
    React.useEffect(() => {
        if (showCam) {
            startScanner();
        } else {
            stopScanner();
        }
        return () => { stopScanner(); }
    }, [showCam, facingMode]);

    // Swap Camera
    const handleSwapCamera = () => {
        setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
    };

    // Handler tutup popup invalid QR
    const handleCloseQrInvalidPopup = () => {
        setShowQrInvalidPopup(false);
        // Reset form
        setFormData(prev => ({
            ...prev,
            nisn: '',
            nama: '',
            kelas: '',
        }));
    };

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
                            {showCam ? (
                                // === Div Kamera Aktif (html5-qrcode) ===
                                <React.Fragment>
                                    <div
                                        className="qr-reader-responsive"
                                        style={{
                                        marginTop: '12px',
                                        marginBottom: '24px',
                                        }}
                                    >
                                        <div
                                            id="qr-reader-box"
                                            ref={qrRef}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '16px',
                                            }}
                                        />

                                        {/* Tombol Close */}
                                        <img
                                            src={cancelButtonHovering ? cancelIconB : cancelIconA}
                                            alt="Cancel"
                                            width="34px"
                                            height="34px"
                                            onClick={() => setShowCam(false)}
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
                                            onClick={handleSwapCamera}
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

                                    {/* ERROR MESSAGE */}
                                    {errorMsg && errorMsg.split('\n').map((line, i) => (
                                        <div key={i} style={{ color: 'red', fontWeight: 'bold', width: 400, textAlign: 'center' }}>
                                            {line}
                                        </div>
                                    ))}
                                </React.Fragment>
                            ) : (
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
                            )}
                        </div>

                        {/* Form Presensi Piket */}
                        <div className="d-flex flex-column justify-content-center align-items-center w-full" style={{ marginTop: '15px' }}>
                            {/* Waktu Presensi */}
                            <div style={{ maxWidth: '650px', width: '100%' }}>
                                <FormInput
                                    label="Waktu Presensi"
                                    name="waktu"
                                    value={formData.waktu}
                                    required
                                    placeholder="Waktu Presensi"
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            
                            {/* Nomor Induk Siswa + Search */}
                            <div style={{ maxWidth: '650px', width: '100%', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <FormInput
                                    label="Nomor Induk Siswa"
                                    name="nisn"
                                    value={formData.nisn}
                                    required
                                    placeholder="Nomor Induk Siswa"
                                    autoComplete="off"
                                    onChange={handleChange}
                                    style={{ marginBottom: 0, width: '100%' }}
                                />

                                {/* Button Search Nomor Induk Siswa */}
                                <button
                                    type="button"
                                    onClick={handleSearchNisn}
                                    disabled={loadingSearchNisn || !formData.nisn}
                                    style={{
                                        height: 37,
                                        width: 37,
                                        borderRadius: 6,
                                        border: '1.5px solid #000',
                                        background: loadingSearchNisn ? '#EEE' : '#FFF',
                                        cursor: loadingSearchNisn ? 'not-allowed' : 'pointer',
                                        marginLeft: 4,
                                        marginTop: 19,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                                    }}
                                    title="Cari Siswa"
                                >
                                    {loadingSearchNisn ? (
                                        <span className="spinner-border spinner-border-sm" />
                                    ) : searchIcon ? (
                                        <img src={searchIcon} alt="Search" width="27px" height="27px" />
                                    ) : (
                                        <span role="img" aria-label="search"> 🔍 </span>
                                    )}
                                </button>
                            </div>

                            {searchNisnError && (
                                <div style={{ color: 'red', fontWeight: 'bold', fontSize: 16, marginTop: 4, marginBottom: 8, maxWidth: 650 }}>
                                    {searchNisnError}
                                </div>
                            )}

                            {/* Nama Siswa */}
                            <div style={{ maxWidth: '650px', width: '100%' }}>
                                <FormInput
                                    label="Nama Siswa"
                                    name="nama"
                                    value={formData.nama}
                                    required
                                    placeholder="Nama Siswa"
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>

                            {/* Kelas */}
                            <div style={{ maxWidth: '650px', width: '100%' }}>
                                <FormInput
                                    label="Kelas"
                                    name="kelas"
                                    value={formData.kelas}
                                    required
                                    placeholder="Kelas"
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>

                            {/* Jenis Presensi */}
                            <div style={{ maxWidth: '650px', width: '100%' }}>
                                <FormInput
                                    label="Jenis Presensi"
                                    name="jenis"
                                    value={formData.jenis}
                                    required
                                    placeholder="Jenis Presensi"
                                    onChange={handleChange}
                                    type="select"
                                    options={[
                                        { label: 'Presensi Masuk', value: 'Presensi Masuk' },
                                        { label: 'Presensi Pulang', value: 'Presensi Pulang' }
                                    ]}
                                />
                            </div>

                            {/* Catatan */}
                            <div style={{ maxWidth: '650px', width: '100%' }}>
                                <FormInput
                                    label="Catatan"
                                    name="cat"
                                    value={formData.cat}
                                    placeholder="Catatan"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Error Message untuk SIMPAN */}
                        {errorMsg2 && (
                            <div style={{ color: "red", fontWeight: "bold", textAlign: 'center' }}>
                                {errorMsg2}
                            </div>
                        )}

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
                                onClick={handleSimpan}
                            >
                                {loadingSimpan ? 'Menyimpan...' : (loadingPiket ? '...' : 'SIMPAN')}
                            </CustomButton>
                        </div>
                    </Card>
                </div>
            </main>

            {/* Popup jika QR code tidak valid */}
            <CardPopUp
                open={showSimpanPopup}
                image={greenWarningIcon}
                borderColor="#33DB00"
                buttons={[
                    {
                        label: "Tidak",
                        bgColor: "#FFFFFF",
                        textColor: "#33DB00",
                        borderColor: "#33DB00",
                        onClick: () => setShowSimpanPopup(false),
                    },
    
                    {
                        label: "Simpan",
                        bgColor: "#33DB00",
                        textColor: "#FFFFFF",
                        borderColor: "#33DB00",
                        onClick: handleConfirmSimpan,
                    }
                ]}
            >
                <React.Fragment> Apakah Anda yakin ingin menambahkan presensi "<b>{formData.nama || 'siswa ini'}</b>"? </React.Fragment>
            </CardPopUp>

            {/* Popup jika QR code tidak valid */}
            <CardPopUp
                open={showQrInvalidPopup}
                image={yellowWarningIcon}
                borderColor="#FFC107"
                buttons={[
                    {
                        label: "Tutup",
                        bgColor: "#FFC107",
                        textColor: "#FFFFFF",
                        borderColor: "#FFC107",
                        onClick: handleCloseQrInvalidPopup,
                    }
                ]}
            >
                QR Code tidak valid!! <br />
                Data siswa tidak ditemukan.
            </CardPopUp>

            <footer>
                <small style={{ fontSize: '14px', color: '#808080' }}>
                    Copyright &copy; {new Date().getFullYear()} SMP Plus Babussalam. All Rights Reserved.
                </small>
            </footer>
        </div>
    );
}

export default ScanPresensi;