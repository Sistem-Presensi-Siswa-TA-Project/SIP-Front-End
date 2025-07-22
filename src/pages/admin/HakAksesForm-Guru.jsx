// Filename: HakAksesForm-Guru.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Card, CardPopUp } from '../../components/Molekul.jsx';
import { SuccessButton, SecondaryButton, DangerButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { FormInput } from '../../components/Forms.jsx'
import { getUserById, createUser, updateUserById, resetPasswordById } from '../../handlers/UserHandler.jsx';

// Default kosong
const defaultForm = {
    username: ''
};

function HakAksesFormGuru() {
    // Navigasi
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const idUser = params.get('id');

    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [dangerButtonHovering, setDangerButtonHovering] = useState(false);
    const [showSimpanPopup, setShowSimpanPopup] = useState(false);
    const [showResetPopup, setShowResetPopup] = useState(false);
    const [pendingData, setPendingData] = useState(null);
    const [formData, setFormData] = useState(defaultForm);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Icon
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const redWarningIcon = iconList.find(i => i.label === "Red Warning Icon")?.src;
    const blueWarningIcon = iconList.find(i => i.label === "Blue Warning Icon")?.src;
    const greenWarningIcon = iconList.find(i => i.label === "Green Warning Icon")?.src;

    // Mengambil data dari UserHandler.jsx
    useEffect(() => {
        if (idUser) {
            setLoading(true);
            getUserById(idUser)
                .then((data) => {
                    if (data) {
                        setFormData({
                            username: data.username || '',
                        });
                    }

                    setLoading(false);
                });
        } else {
            // Jika tambah data, form kosong
            setFormData(defaultForm);
        }
    }, [idUser]);

    //Fungsi Simpan Data
    const handleSimpan = async () => {
        // VALIDASI
        const requiredFields = [
            { name: "username", label: "Username" },
        ];

        for (let field of requiredFields) {
            if (!formData[field.name] || !formData[field.name].trim()) {
                setErrorMsg(`Kolom ${field.label} wajib diisi!`);
                return;
            }
        }

        setErrorMsg(""); // clear jika lolos validasi

        // PERSIAPKAN data POST!
        const dataToSend = {
            username: formData.username,
            role: 'guru',
        };

        setPendingData(dataToSend);
        setShowSimpanPopup(true);
    };

    const handleConfirmSimpan = async () => {
        setShowSimpanPopup(false);

        try {
            if (idUser) {
                // UPDATE (PUT)
                await updateUserById(idUser, pendingData);
            } else {
                // CREATE (POST)
                await createUser(pendingData);
            }
            navigate('/admin/user/guru');
        } catch (error) {
            setErrorMsg("Gagal menyimpan data user:", error);
        }
    };

    const handleReset = async () => {
        setShowResetPopup(true);
    };

    const handleConfirmReset = async () => {
        setShowResetPopup(false);
        if (!idUser) {
            alert("Reset password hanya tersedia untuk data yang sudah ada.");
            return;
        }

        try {
            const res = await resetPasswordById(idUser);
            alert(res.message || 'Password telah direset ke default "smpbabussalam"!');
        } catch (err) {
            alert(err.message || "Gagal mereset password. Silakan coba lagi!");
        }
    };

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
                    onClick={() => navigate('/admin/user/guru')}
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

                    <span 
                        style={{ 
                            fontSize: '18px', 
                            color: secondaryButtonHovering ? '#FFC107' : '#000', 
                            marginLeft: '2px' 
                        }}
                    > 
                        Kembali 
                    </span>

                </SecondaryButton>
                
                {/* Form Profile */}
                {loading ? (
                    <div style={{ textAlign: 'center', width: '100%', margin: '40px 0' }}>
                        <span> Memuat data guru... </span>
                    </div>
                ) : (
                    <Card
                        style={{
                            width: '100%',
                            marginTop: '35px',
                            padding: '30px',
                        }}
                    >
                        <div style={{ padding: '15px 35px 15px 35px' }}>

                            <h4 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '25px' }}> 
                                FORM DATA GURU 
                            </h4>

                            <div className="row" style={{ rowGap: '16px' }}>
                                {[
                                    ['Username', 'username'],
                                ].map(([label, name], index) => {
                                    const isRequired = [
                                        'username', 
                                    ].includes(name);
                                    
                                    return (
                                        <div className="col-md-12 col-sm-12" key={index}>
                                            <FormInput
                                                label={label}
                                                name={name}
                                                type='text'
                                                autoComplete='off'
                                                value={formData[name]}
                                                required={isRequired}
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
                                <div style={{ color: "red", fontWeight: "bold", marginBottom: 18 }}>
                                    {errorMsg}
                                </div>
                            )}
                            
                            {/* Wrap Button Simpan & Reset */}
                            <div className="d-flex flex-row justify-content-center justify-content-md-end gap-4">
                                {/* Tombol Reset hanya muncul jika ada idUser */}
                                {idUser && (
                                    /* Tombol Reset */
                                    <div className="d-flex justify-content-end mt-4">
                                        <DangerButton
                                            className="d-flex align-items-center justify-content-center"
                                            width="200px"
                                            height="42px"
                                            style={{
                                                padding: '8px 28px',
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                borderRadius: '6px',
                                                boxShadow: dangerButtonHovering
                                                    ? '4px 4px 8px rgba(0, 0, 0, 0.5)'
                                                    : '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                                transition: 'box-shadow 0.2s ease-in-out',
                                            }}
                                            onMouseEnter={() => setDangerButtonHovering(true)}
                                            onMouseLeave={() => setDangerButtonHovering(false)}
                                            onClick={handleReset}
                                        >
                                            RESET PASSWORD
                                        </DangerButton>
                                    </div>
                                )}

                                {/* Tombol Simpan */}
                                <div className="d-flex justify-content-end mt-4">
                                    <SuccessButton
                                        className="d-flex align-items-center justify-content-center"
                                        width="140px"
                                        height="42px"
                                        style={{
                                            padding: '8px 28px',
                                            fontWeight: 'bold',
                                            fontSize: '15px',
                                            borderRadius: '6px',
                                            boxShadow: successButtonHovering
                                                ? '4px 4px 8px rgba(0, 0, 0, 0.5)'
                                                : '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                            transition: 'box-shadow 0.2s ease-in-out',
                                        }}
                                        onMouseEnter={() => setSuccessButtonHovering(true)}
                                        onMouseLeave={() => setSuccessButtonHovering(false)}
                                        onClick={handleSimpan}
                                    >
                                        SIMPAN
                                    </SuccessButton>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </main>

        {/* Popup konfirmasi simpan data user */}
        <CardPopUp
            open={showSimpanPopup}
            image={idUser ? blueWarningIcon : greenWarningIcon}
            borderColor={idUser ? "#1976D2" : "#33DB00"}
            buttons={[
                {
                    label: "Kembali",
                    bgColor: "#FFFFFF",
                    textColor: idUser ? "#1976D2" : "#33DB00",
                    borderColor: idUser ? "#1976D2" : "#33DB00",
                    onClick: () => setShowSimpanPopup(false),
                },
                {
                    label: idUser ? "Perbarui Data" : "Simpan Data",
                    bgColor: idUser ? "#1976D2" : "#33DB00",
                    textColor: "#FFFFFF",
                    borderColor: idUser ? "#1976D2" : "#33DB00",
                    onClick: handleConfirmSimpan,
                }
            ]}
        >
            {idUser ? (
                <>Apakah Anda yakin ingin <b> memperbarui </b> data "<b>{formData.username || 'siswa ini'}</b>"? </>
            ) : (
                <>Apakah Anda yakin ingin <b> menyimpan </b> data siswa baru dengan nama "<b>{formData.username || 'siswa ini'}</b>"? </>
            )}
        </CardPopUp>

        {/* Popup konfirmasi reset password user */}
        <CardPopUp
            open={showResetPopup}
            image={redWarningIcon}
            borderColor="#DB4437"
            buttons={[
                {
                    label: "Kembali",
                    bgColor: "#FFFFFF",
                    textColor: "#DB4437",
                    borderColor: "#DB4437",
                    onClick: () => setShowResetPopup(false),
                },
                {
                    label: "Reset Password",
                    bgColor: "#DB4437",
                    textColor: "#FFFFFF",
                    borderColor: "#DB4437",
                    onClick: handleConfirmReset,
                }
            ]}
        >
            <>Apakah Anda yakin ingin melakukan <b> reset password </b> pada user "<b>{formData.username || 'user ini'}</b>"? </>
        </CardPopUp>

        <footer>
            <small style={{ fontSize: '14px', color: '#808080' }}>
                Copyright &copy; {new Date().getFullYear()} SMP Plus Babussalam. All Rights Reserved.
            </small>
        </footer>
        </div>
    );
}

export default HakAksesFormGuru;