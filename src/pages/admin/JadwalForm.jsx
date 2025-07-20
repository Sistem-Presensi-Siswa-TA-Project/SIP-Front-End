// Filename: JadwalForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Card, CardPopUp } from '../../components/Molekul.jsx';
import { SuccessButton, SecondaryButton } from '../../components/Button.jsx';
import { FormInput } from '../../components/Forms.jsx'
import { iconList } from '../../data/iconData.js';
import { getJadwalById, createJadwal, putJadwalById } from '../../handlers/JadwalHandler.jsx';

// Default kosong
const defaultForm = {
    kodeMapel: '',
    nip: '',
    hari: '',
    waktu: '',
    kelas: '',
    tahunAjar: '',
    semester: '',
};

function JadwalForm() {
    // Navigasi
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const idJadwal = params.get('id');

    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [showSimpanPopup, setShowSimpanPopup] = useState(false);
    const [pendingData, setPendingData] = useState(null);
    const [formData, setFormData] = useState(defaultForm);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Icon
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const blueWarningIcon = iconList.find(i => i.label === "Blue Warning Icon")?.src;
    const greenWarningIcon = iconList.find(i => i.label === "Green Warning Icon")?.src;

    // Proses mengambil data dari JadwalHandler.jsx
    useEffect(() => {
        if (idJadwal) {
            setLoading(true);
            getJadwalById(idJadwal)
                .then((data) => {
                    if (data) {
                        setFormData({
                            kodeMapel: data.id_mapel || '',
                            nip: data.nomor_induk_guru || '',
                            hari: data.hari || '',
                            waktu: data.waktu || '',
                            kelas: data.kelas || '',
                            tahunAjar: data.tahun_ajaran || '',
                            semester: data.semester || '',
                        });
                    }

                    setLoading(false);
                });
        } else {
            // Jika tambah data, form kosong
            setFormData(defaultForm);
        }
    }, [idJadwal]);

    //Fungsi Simpan Data
    const handleSimpan = async () => {
        // VALIDASI
        const requiredFields = [
            { name: "kodeMapel", label: "Kode Mata Pelajaran" },
            { name: "nip", label: "Nomor Induk Guru" },
            { name: "hari", label: "Hari" },
            { name: "waktu", label: "Waktu" },
            { name: "kelas", label: "Kelas" },
            { name: "tahunAjar", label: "Tahun Ajaran" },
            { name: "semester", label: "Semester" },
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
            id_mapel: formData.kodeMapel,
            nomor_induk_guru: formData.nip,
            hari: formData.hari,
            waktu: formData.waktu,
            kelas: formData.kelas.toUpperCase(),
            tahun_ajaran: formData.tahunAjar,
            semester: formData.semester,
        };

        setPendingData(dataToSend);
        setShowSimpanPopup(true);
    };

    const handleConfirmSimpan = async () => {
        setShowSimpanPopup(false);

        try {
            if (idJadwal) {
                // UPDATE (PUT)
                await putJadwalById(idJadwal, pendingData);
            } else {
                // CREATE (POST)
                await createJadwal(pendingData);
            }
            navigate('/admin/data/jadwal');
        } catch (error) {
            setErrorMsg(
                "Gagal menyimpan: " +
                (error?.response?.data?.message || error?.message || JSON.stringify(error))
            );
        }
    };

    return (
        <div>
            <Header> Form Jadwal </Header>

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
                        onClick={() => navigate(`/admin/data/jadwal`)}
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
                                marginLeft: '2px', 
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
                            <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '25px' }}> 
                                DATA JADWAL
                            </h3>

                            <div className="row" style={{ rowGap: '16px' }}>
                                {[
                                    ['Kode Mata Pelajaran', 'kodeMapel'],
                                    ['Nomor Induk Guru', 'nip'],
                                    ['Hari', 'hari'],
                                    ['Waktu', 'waktu'],
                                    ['Kelas', 'kelas'],
                                    ['Tahun Ajaran', 'tahunAjar'],
                                    ['Semester', 'semester'],
                                ].map(([label, name], index) => {
                                    const isRequired = [
                                        'kodeMapel', 
                                        'nip', 
                                        'hari',
                                        'waktu',
                                        'kelas',
                                        'tahunAjar',
                                        'semester',
                                    ].includes(name);
                                    
                                    return (
                                        <div className="col-md-4 col-sm-12" key={index}>
                                            {name === 'semester' ? (
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
                                                    options={['Ganjil', 'Genap']}
                                                />
                                            ) : (
                                                name === 'hari' ? (
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
                                                        options={[
                                                            'Senin', 'Selasa', 'Rabu', 'Kamis', "Jumat", 'Sabtu', 'Minggu'
                                                        ]}
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
                                                )
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
                                    onClick={handleSimpan}
                                >
                                    SIMPAN
                                </SuccessButton>
                            </div>
                        </Card>
                    )}
                </div>
            </main>

            {/* Popup konfirmasi simpan data siswa */}
            <CardPopUp
                open={showSimpanPopup}
                image={idJadwal ? blueWarningIcon : greenWarningIcon}
                borderColor={idJadwal ? "#1976D2" : "#33DB00"}
                buttons={[
                    {
                        label: "Kembali",
                        bgColor: "#FFFFFF",
                        textColor: idJadwal ? "#1976D2" : "#33DB00",
                        borderColor: idJadwal ? "#1976D2" : "#33DB00",
                        onClick: () => setShowSimpanPopup(false),
                    },
                    {
                        label: idJadwal ? "Perbarui Data" : "Simpan Data",
                        bgColor: idJadwal ? "#1976D2" : "#33DB00",
                        textColor: "#FFFFFF",
                        borderColor: idJadwal ? "#1976D2" : "#33DB00",
                        onClick: handleConfirmSimpan,
                    }
                ]}
            >
                {idJadwal ? (
                    <> Apakah Anda yakin ingin <b> memperbarui </b> data jadwal dengan kode mapel "<b>{formData.kodeMapel || 'kode mapel'}</b>" dan nomor induk "<b>{formData.nip || 'nomor induk'}</b>"? </>
                ) : (
                    <> Apakah Anda yakin ingin <b> menyimpan </b> data jadwal baru dengan kode mapel "<b>{formData.kodeMapel || 'kode mapel'}</b>" dan nomor induk "<b>{formData.nip || 'nomor induk'}</b>"? </>
                )}
            </CardPopUp>

            <footer>
                <small style={{ fontSize: '14px', color: '#808080' }}>
                    Copyright &copy; {new Date().getFullYear()} SMP Plus Babussalam. All Rights Reserved.
                </small>
            </footer>
        </div>
    );
}

export default JadwalForm;