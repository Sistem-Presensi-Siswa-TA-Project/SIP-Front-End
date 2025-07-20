// Filename: UbahPasswordPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Card, CardPopUp } from '../components/Molekul.jsx';
import { SuccessButton, SecondaryButton } from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';
import { FormInput } from '../components/Forms.jsx';
import { updatePasswordById } from '../handlers/UserHandler.jsx';
import { getPiketByKodePiket } from '../handlers/PiketHandler.jsx';

function UbahPassword() {
    // Navigasi Page
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
        ? '/admin' : (location.pathname.startsWith('/guru') 
        ? '/guru' : '/piket');
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const idUser = params.get('id');

    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [formData, setFormData] = useState({ username: '', passwordBaru: '' });
    const [errorMsg, setErrorMsg] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [role, setRole] = useState('');
    const [statusPiket, setStatusPiket] = useState('');

    // Icon
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const blueWarningIcon = iconList.find((i) => i.label === 'Blue Warning Icon')?.src;

    // Isi username dari localStorage saat mount
    useEffect(() => {
        const username = localStorage.getItem('username') || '';
        const roleStorage = localStorage.getItem('role') || '';
        setRole(roleStorage);
        setFormData(prev => ({ ...prev, username }));

        if (roleStorage === 'piket' && username) {
            // Cek status piket
            getPiketByKodePiket(username).then((data) => {
                setStatusPiket(data?.status || '');
            });
        }
    }, []);

    // Fungsi back button dinamis
    const handleBack = () => {
        if (role === 'admin') {
            navigate(`${prefix}`);
        } else if (role === 'piket') {
            if (statusPiket.toUpperCase() === 'OSIS') {
                navigate(`${prefix}/profile/osis`);
            } else {
                navigate(`${prefix}/profile`);
            }
        } else {
            navigate(`${prefix}/profile`);
        }
    };

    // Handle Update Password
    const handleUpdate = () => {
        if (!formData.passwordBaru) {
            setErrorMsg("Kolom Password Baru wajib diisi!");
            return;
        }
        setErrorMsg('');
        setShowPopup(true);
    };

    const handleConfirmUpdate = async () => {
        setShowPopup(false);

        if (!idUser) {
            setErrorMsg("ID User tidak ditemukan!");
            return;
        }

        try {
            await updatePasswordById(idUser, formData.passwordBaru);
            alert("Password berhasil diubah!");
            handleBack();
        } catch (err) {
            setErrorMsg(
                "ERROR: " +
                (err?.response?.data?.message || err?.message || JSON.stringify(err))
            );
        }
    };

    return (
        <div>
        <Header> Form Password </Header>

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
                    onClick={handleBack}
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
                    <h4 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '25px' }}> UBAH PASSWORD </h4>

                    <div className="row" style={{ rowGap: '16px' }}>
                        {[
                            ['Username', 'username'],
                            ['Password Baru', 'passwordBaru'],
                        ].map(([label, name], index) => {
                            const isRequired = [
                                'username', 
                                'passwordBaru', 
                            ].includes(name);

                            const isReadOnly = ['username'].includes(name);
                            
                            return (
                                <div className="col-md-6 col-sm-12" key={index}>
                                    <FormInput
                                        label={label}
                                        name={name}
                                        type={
                                            name === 'passwordBaru'
                                                ? 'password'
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

                    {/* Jika data yang bersifat required kosong */}
                    {errorMsg && (
                        <div style={{ color: "red", fontWeight: 'bold', marginBottom: 18 }}>
                            {errorMsg}
                        </div>
                    )}

                    {/* Tombol Simpan */}
                    <div className="d-flex justify-content-end mt-4">
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
                            onClick={handleUpdate}
                        >
                            SIMPAN
                        </SuccessButton>
                    </div>
                </Card>
            </div>
        </main>

        {/* Popup konfirmasi ubah password */}
        <CardPopUp
            open={showPopup}
            image={blueWarningIcon}
            borderColor="#1976D2"
            buttons={[
                {
                    label: "Kembali",
                    bgColor: "#FFFFFF",
                    textColor: "#1976D2",
                    borderColor: "#1976D2",
                    onClick: () => setShowPopup(false),
                },

                {
                    label: "Ya, Saya Yakin",
                    bgColor: "#1976D2",
                    textColor: "#FFFFFF",
                    borderColor: "#1976D2",
                    onClick: handleConfirmUpdate,
                }
            ]}
        >
            <React.Fragment>
                Apakah Anda yakin ingin mengubah Password? 
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

export default UbahPassword;