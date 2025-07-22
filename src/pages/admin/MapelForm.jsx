// Filename: SiswaForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Card, CardPopUp } from '../../components/Molekul.jsx';
import { SuccessButton, SecondaryButton } from '../../components/Button.jsx';
import { FormInput } from '../../components/Forms.jsx'
import { iconList } from '../../data/iconData.js';
import { getMapelById, createMapel, updateMapel } from '../../handlers/MapelHandler.jsx';

// Default kosong
const defaultForm = {
    kode: '',
    nama: '',
    deskripsi: '',
};

function MapelForm() {
    // Navigasi
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const idMapel = params.get('id');

    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [showSimpanPopup, setShowSimpanPopup] = useState(false);
    const [pendingData, setPendingData] = useState(null);
    const [formData, setFormData] = useState(defaultForm);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const blueWarningIcon = iconList.find(i => i.label === "Blue Warning Icon")?.src;
    const greenWarningIcon = iconList.find(i => i.label === "Green Warning Icon")?.src;

    // Proses mengambil data dari MapelHandler.jsx
    useEffect(() => {
        if (idMapel) {
            setLoading(true);
            getMapelById(idMapel)
                .then((data) => {
                    if (data) {
                        setFormData({
                            kode: data.id_mapel || '',
                            nama: data.nama || '',
                            deskripsi: data.deskripsi || '',
                        });
                    }
                    setLoading(false);
                });
        } else {
            // Jika tambah data, form kosong
            setFormData(defaultForm);
        }
    }, [idMapel]);

    //Fungsi Simpan Data
    const handleSimpan = async () => {
        // VALIDASI
        const requiredFields = [
            { name: "kode", label: "Kode Mata Pelajaran" },
            { name: "nama", label: "Nama Mata Pelajaran" },
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
            id_mapel: formData.kode,
            nama: formData.nama,
            deskripsi: formData.deskripsi,
        };

        setPendingData(dataToSend);
        setShowSimpanPopup(true);
    };

    const handleConfirmSimpan = async () => {
        setShowSimpanPopup(false);

        try {
            if (idMapel) {
                // UPDATE (PUT)
                await updateMapel(idMapel, pendingData);
            } else {
                // CREATE (POST)
                await createMapel(pendingData);
            }
            navigate('/admin/data/mapel');
        } catch (error) {
            setErrorMsg(
                "ERROR: " +
                (error?.response?.data?.message || error?.message || JSON.stringify(error))
            );
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
        <Header> Form Siswa </Header>

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
                
                {/* Form Profile */}
                {loading ? (
                    <div style={{ textAlign: 'center', width: '100%', margin: '40px 0' }}>
                        <span> Memuat data mata pelajaran.... </span>
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
                            DATA MATA PELAJARAN
                        </h3>

                        <form className="w-100">
                            <div className="row">
                                <div className="col-md-6">
                                    <FormInput
                                        label="Kode Mata Pelajaran"
                                        name="kode"
                                        placeholder="Kode Mata Pelajaran"
                                        autoComplete="off"
                                        value={formData.kode}
                                        onChange={handleChange}
                                        readOnly={idMapel}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <FormInput
                                        label="Nama Mata Pelajaran"
                                        name="nama"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Nama Mata Pelajaran"
                                        value={formData.nama}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <FormInput
                                label="Deskripsi"
                                name="deskripsi"
                                type="textarea"
                                placeholder="Deskripsi Mata Pelajaran..."
                                rows={5}
                                value={formData.deskripsi}
                                onChange={handleChange}
                            />
                        </form>

                        {/* Jika data yang bersifat required kosong */}
                        {errorMsg && (
                            <div style={{ color: "red", fontWeight: 'bold', marginBottom: 18 }}>
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
            image={idMapel ? blueWarningIcon : greenWarningIcon}
            borderColor={idMapel ? "#1976D2" : "#33DB00"}
            buttons={[
                {
                    label: "Kembali",
                    bgColor: "#FFFFFF",
                    textColor: idMapel ? "#1976D2" : "#33DB00",
                    borderColor: idMapel ? "#1976D2" : "#33DB00",
                    onClick: () => setShowSimpanPopup(false),
                },
                {
                    label: idMapel ? "Perbarui Data" : "Simpan Data",
                    bgColor: idMapel ? "#1976D2" : "#33DB00",
                    textColor: "#FFFFFF",
                    borderColor: idMapel ? "#1976D2" : "#33DB00",
                    onClick: handleConfirmSimpan,
                }
            ]}
        >
            {idMapel ? (
                <>Apakah Anda yakin ingin <b> memperbarui </b> data "<b>{formData.nama || 'siswa ini'}</b>"? </>
            ) : (
                <>Apakah Anda yakin ingin <b> menyimpan </b> data siswa baru dengan nama "<b>{formData.nama || 'siswa ini'}</b>"? </>
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

export default MapelForm;