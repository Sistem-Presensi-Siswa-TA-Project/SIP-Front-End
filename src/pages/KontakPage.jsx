// Filename: Kontak.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Card, CardPopUp } from '../components/Molekul.jsx';
import { SecondaryButton, PrimaryButton } from '../components/Button.jsx';
import { FormInput } from '../components/Forms.jsx';
import { iconList } from '../data/iconData.js';
import { createSaran } from '../handlers/SaranHandler.jsx'

function Kontak() {
    // Navigasi Page
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
        ? '/admin' : (location.pathname.startsWith('/guru') 
        ? '/guru' : '/piket');
    const navigate = useNavigate();

    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [primaryButtonHovering, setPrimaryButtonHovering] = useState(false);
    const [showKirimPopup, setShowKirimPopup] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const lokasiIcon = iconList.find((i) => i.label === 'Lokasi Black')?.src;
    const emailIcon = iconList.find((i) => i.label === 'Email Icon')?.src;
    const phoneIcon = iconList.find((i) => i.label === 'Phone Icon')?.src;
    const greenWarningIcon = iconList.find(i => i.label === "Green Warning Icon")?.src;

    const [formData, setFormData] = useState({
        nama: '',
        username: '',
        email: '',
        subjek: '',
        pesan: '',
    });

    const username = localStorage.getItem('username') || '-';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleKirim = () => {
        // Daftar kolom yang wajib diisi beserta labelnya
        const requiredFields = [
            ['Nama', 'nama'],
            ['Email', 'email'],
            ['Subjek', 'subjek'],
            ['Pesan', 'pesan'],
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
        
        setFormData(prev => ({ ...prev, username }));
        setErrorMsg('');
        setShowKirimPopup(true);
    };

    const handleConfirmKirim = async () => {
        try {
            await createSaran({ ...formData, username });
            setShowKirimPopup(false);
            setFormData({ nama: '', email: '', subjek: '', pesan: '', username: '' });
            alert('Saran berhasil dikirim!');
        } catch (e) {
            setShowKirimPopup(false);
            setErrorMsg(
                "Gagal mengirim saran: " +
                (e?.response?.data?.message || e?.message || JSON.stringify(e))
            );
        }
    };

    return (
        <div>
            <Header> Kontak </Header>

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
                        onClick={() => navigate(`${prefix}`)}
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

                    {/* Form Saran */}
                    <Card style={{ marginTop: '45px', padding: '30px' }}>
                        <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '25px' }}> Kritik & Saran </h3>

                        <form className="w-100">
                            <div className="row">
                                <div className="col-md-6">
                                    <FormInput
                                        label="Nama"
                                        name="nama"
                                        value={formData.nama}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <FormInput
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <FormInput
                                label="Subjek"
                                name="subjek"
                                value={formData.subjek}
                                onChange={handleChange}
                                required
                            />

                            <FormInput
                                label="Pesan"
                                name="pesan"
                                type="textarea"
                                rows={5}
                                value={formData.pesan}
                                onChange={handleChange}
                                required
                            />

                            {/* Jika data yang bersifat required kosong */}
                            {errorMsg && (
                                <div className="d-flex flex-column" style={{ color: "red", fontWeight: 'bold', marginBottom: 18 }}>
                                    <div> Harap periksa kembali setiap kolom yang diinput harus sesuai format! </div>
                                    <div> {errorMsg} </div>
                                </div>
                            )}

                            {/* Tombol Kirim */}
                            <div className="d-flex justify-content-end" style={{ marginTop: '30px' }}>
                                <PrimaryButton 
                                    width="125px" 
                                    height="42px"
                                    fontSize="16px"
                                    className="width-button-mobile"
                                    onMouseEnter={() => setPrimaryButtonHovering(true)}
                                    onMouseLeave={() => setPrimaryButtonHovering(false)}
                                    onClick={handleKirim}
                                    style={{ 
                                        justifyContent: 'center', 
                                        alignItems: 'center',
                                        borderRadius: primaryButtonHovering ? '12px' : '10px',
                                        boxShadow: primaryButtonHovering ? '6px 6px 12px rgba(0, 0, 0, 0.5)' : '2px 2px 8px rgba(0, 0, 0, 0.5)',
                                        transition: 'box-shadow 0.2s ease-in-out',
                                    }}
                                > 
                                    Kirim
                                </PrimaryButton>
                            </div>
                        </form>
                    </Card>

                    {/* Informasi Kontak */}
                    <Card style={{ marginTop: '40px', padding: '30px' }}>
                        <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '25px' }}> Kontak Kami </h3>

                        <div className="d-flex flex-column" style={{ gap: '22px' }}>
                            <div className="d-flex align-items-center justify-content-start" style={{ gap: '16px' }}>
                                <img src={lokasiIcon} alt="Lokasi" width="28    " height="28    " />
                                <div>
                                    <strong> Lokasi </strong><br />
                                    SMP Plus Babussalam, Cibural, Kecamatan Cimenyan, Kabupaten Bandung, Jawa Barat
                                </div>
                            </div>

                            <div className="d-flex align-items-center justify-content-start" style={{ gap: '16px' }}>
                                <img src={emailIcon} alt="Email" width="28  " height="28  " />
                                <div>
                                    <strong> Email </strong><br />
                                    smpplusbabussalamdago@gmail.com
                                </div>
                            </div>

                            <div className="d-flex align-items-center justify-content-start" style={{ gap: '16px' }}>
                                <img src={phoneIcon} alt="Phone" width="28  " height="28  " />
                                <div>
                                    <strong> Telepon </strong><br />
                                    +62-858-6082-9640
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>

            {/* Popup konfirmasi ubah data guru */}
            <CardPopUp
                open={showKirimPopup}
                image={greenWarningIcon}
                borderColor="#33DB00"
                buttons={[
                    {
                        label: "Kembali",
                        bgColor: "#FFFFFF",
                        textColor: "#33DB00",
                        borderColor: "#33DB00",
                        onClick: () => setShowKirimPopup(false),
                    },
    
                    {
                        label: "Kirim",
                        bgColor: "#33DB00",
                        textColor: "#FFFFFF",
                        borderColor: "#33DB00",
                        onClick: handleConfirmKirim,
                    }
                ]}
            >
                <React.Fragment>
                    Apakah Anda ingin mengirim pesan? 
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

export default Kontak;