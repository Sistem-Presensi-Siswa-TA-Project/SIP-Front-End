// Filename: HakAksesForm-Piket.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Card, CardPopUp } from '../../components/Molekul.jsx';
import { SuccessButton, SecondaryButton, DangerButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { FormInput } from '../../components/Forms.jsx'
import { getGuruByNomorInduk } from '../../handlers/GuruHandler.jsx';
import { getSiswaByNISN } from '../../handlers/SiswaHandler.jsx';
import { getAllPiket, getPiketById, createPiket, putPiketById } from '../../handlers/PiketHandler.jsx';
import { getUserByUsername, createUser, updateUserById, resetPasswordById } from '../../handlers/UserHandler.jsx';

// Default kosong
const defaultForm = {
    username: '',
    nomorInduk: '',
    status: '',
};

function HakAksesFormPiket() {
    // Navigasi
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const idPiket = params.get('id');

    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [dangerButtonHovering, setDangerButtonHovering] = useState(false);
    const [showSimpanPopup, setShowSimpanPopup] = useState(false);
    const [showResetPopup, setShowResetPopup] = useState(false);
    const [formData, setFormData] = useState(defaultForm);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Icon
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const redWarningIcon = iconList.find(i => i.label === "Red Warning Icon")?.src;
    const blueWarningIcon = iconList.find(i => i.label === "Blue Warning Icon")?.src;
    const greenWarningIcon = iconList.find(i => i.label === "Green Warning Icon")?.src;

    // Mengambil data dari PiketHandler.jsx
    useEffect(() => {
        async function fetchData() {
            if (idPiket) {
                setLoading(true);
                const data = await getPiketById(idPiket);
                let user = null;
                if (data) {
                    const userData = await getUserByUsername(data.kode_piket);
                    // Cek dulu, jika array, ambil index 0
                    user = Array.isArray(userData) ? userData[0] : userData;

                    setFormData({
                        idUser: user?.id_user || '',
                        username: data.kode_piket || '',
                        nomorInduk: data.nomor_induk || '',
                        status: data.status || '',
                    });
                }
                setLoading(false);
            } else {
                setFormData(defaultForm);
            }
        }
        fetchData();
    }, [idPiket]);

    //Fungsi Simpan Data
    const handleSimpan = async () => {
        // VALIDASI
        const requiredFields = [
            { name: "username", label: "Username" },
            { name: "nomorInduk", label: "Nomor Induk" },
            { name: "status", label: "Status" },
        ];

        for (let field of requiredFields) {
            if (!formData[field.name] || !formData[field.name].trim()) {
                setErrorMsg(`Kolom ${field.label} wajib diisi!`);
                return;
            }
        }

        setErrorMsg(""); // clear jika lolos validasi
        setShowSimpanPopup(true);
    };

    const handleConfirmSimpan = async () => {
        setShowSimpanPopup(false);

        // CEK NISN/NIP SUDAH TERDAFTAR DI PIKET?
        try {
            if (!idPiket) { // Cek hanya saat tambah baru
                const allPiket = await getAllPiket();

                const found = allPiket.find(
                    p => p.nomor_induk === formData.nomorInduk
                );

                if (found) {
                    setErrorMsg("Nomor induk telah terdaftar sebagai petugas piket!");
                    return;
                }
            }
        } catch (err) {
            let message = "Gagal cek data piket!";

            if (err.response && err.response.data && err.response.data.message) {
                message = err.response.data.message;
            } else if (err.message) {
                message = err.message;
            }

            setErrorMsg(message);
        }

        // CEK NISN/NIP
        try {
            // cek ke tabel guru
            const guru = await getGuruByNomorInduk(formData.nomorInduk);

            if (!guru || !guru.nama) {
                // kalau tidak ketemu di guru, cek ke siswa
                const siswa = await getSiswaByNISN(formData.nomorInduk);
                if (!siswa || !siswa.nama) {
                    setErrorMsg("Nomor induk belum terdaftar!");
                    return; // STOP proses create jika tidak ditemukan
                }
            }
        } catch (err) {
            setErrorMsg("Nomor induk belum terdaftar!", err);
            return;
        }

        // PUT dan POST data petugas piket
        try {
            if (idPiket) {
                // Ambil id_user dari username
                if (!formData.idUser) {
                    setErrorMsg("User tidak ditemukan (id_user kosong)!");
                    return;
                }

                // PUT: Update data Piket
                await putPiketById(idPiket, {
                    kode_piket: formData.username,
                    nomor_induk: formData.nomorInduk,
                    status: formData.status,
                });

                // PUT: Update data User
                await updateUserById(formData.idUser, { username: formData.username, role: 'piket' });
            } else {
                // CREATE (POST) USER lebih dulu
                await createUser({ username: formData.username, role: 'piket' });

                // Lanjut CREATE (POST) ke Piket
                await createPiket({
                    kode_piket: formData.username,
                    nomor_induk: formData.nomorInduk,
                    status: formData.status,
                });
            }
            navigate('/admin/user/piket');
        } catch (error) {
            let message = "Gagal menyimpan data piket!";

            if (error.response && error.response.data && error.response.data.message) {
                message = error.response.data.message;
            } else if (error.message) {
                message = error.message;
            }

            setErrorMsg(message);
        }
    };

    const handleReset = async () => {
        setShowResetPopup(true);
    };

    const handleConfirmReset = async () => {
        setShowResetPopup(false);

        if (!idPiket) {
            alert("Reset password hanya tersedia untuk data yang sudah ada.");
            return;
        }

        try {
            const res = await resetPasswordById(formData.idUser);
            alert(res.message || 'Password telah direset ke default "smpbabussalam"!');
        } catch (err) {
            alert(err.message || "Gagal mereset password. Silakan coba lagi!");
        }
    };

    return (
        <div>
        <Header> Form Piket </Header>

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
                    onClick={() => navigate(`/admin/user/piket`)}
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
                {loading ? (
                    <div style={{ textAlign: 'center', width: '100%', margin: '40px 0' }}>
                        <span> Memuat data piket.... </span>
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

                            <h4 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '25px' }}> FORM DATA PETUGAS PIKET </h4>

                            <div className="row" style={{ rowGap: '16px' }}>
                                {[
                                    ['Username', 'username'],
                                    ['Nomor Induk', 'nomorInduk'],
                                    ['Status', 'status'],
                                ].map(([label, name], index) => {
                                    const isRequired = [
                                        'username',
                                        'nomorInduk',
                                        'status',
                                    ].includes(name);
                                    
                                    return (
                                        <div className="col-md-4 col-sm-12" key={index}>
                                            {name === 'status' ? (
                                                <FormInput
                                                    label={label}
                                                    name={name}
                                                    value={formData[name]}
                                                    required= {isRequired}
                                                    placeholder={label}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({ ...prev, [name]: e.target.value }))
                                                    }
                                                    options={['Guru', 'OSIS']}
                                                />
                                            ) : (
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
                                            )}
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
                                {idPiket && (
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

        {/* Popup konfirmasi simpan data piket */}
        <CardPopUp
            open={showSimpanPopup}
            image={idPiket ? blueWarningIcon : greenWarningIcon}
            borderColor={idPiket ? "#1976D2" : "#33DB00"}
            buttons={[
                {
                    label: "Kembali",
                    bgColor: "#FFFFFF",
                    textColor: idPiket ? "#1976D2" : "#33DB00",
                    borderColor: idPiket ? "#1976D2" : "#33DB00",
                    onClick: () => setShowSimpanPopup(false),
                },
                {
                    label: idPiket ? "Perbarui Data" : "Simpan Data",
                    bgColor: idPiket ? "#1976D2" : "#33DB00",
                    textColor: "#FFFFFF",
                    borderColor: idPiket ? "#1976D2" : "#33DB00",
                    onClick: handleConfirmSimpan,
                }
            ]}
        >
            {idPiket ? (
                <>Apakah Anda yakin ingin <b> memperbarui </b> data "<b>{formData.username || 'petugas piket ini'}</b>"? </>
            ) : (
                <>Apakah Anda yakin ingin <b> menyimpan </b> data petugas piket baru dengan nama "<b>{formData.nama || 'petugas piket ini'}</b>"? </>
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

export default HakAksesFormPiket;