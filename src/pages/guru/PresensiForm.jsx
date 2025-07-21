// Filename: PresensiForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card, CardPopUp } from '../../components/Molekul.jsx';
import { DangerButton, SecondaryButton, SuccessButton } from '../../components/Button.jsx';
// import { handlePresensiChange } from '../../handlers/PresensiHandler.jsx';
import { iconList } from '../../data/iconData.js';
import { getPresensiMapelByJadwalTanggal, createPresensiMapel, updatePresensiMapel } from '../../handlers/PresensiHandler.jsx';
import { getJadwalById } from '../../handlers/JadwalHandler.jsx';
import { getMapelById } from '../../handlers/MapelHandler.jsx';
import { getGuruByNomorInduk } from '../../handlers/GuruHandler.jsx';
import { getSiswaByKelas } from '../../handlers/SiswaHandler.jsx';

function PresensiForm() {
    // State Hovering
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [successButtonHovering, setSuccessButtonHovering] = useState(false);
    const [dangerButtonHovering, setDangerButtonHovering] = useState(false);
    const [dataPresensi, setDataPresensi] = useState([]);
    const [dataSiswa, setDataSiswa] = useState([])
    const [jadwal, setJadwal] = useState(null);
    const [namaGuru, setNamaGuru] = useState('');
    const [namaMapel, setNamaMapel] = useState('');
    const [errorMsg, setErrorMsg] = useState("")
    const [showSimpanPopup, setShowSimpanPopup] = useState(false);
    
    // Navigasi Page
    const navigate = useNavigate();
    const { kelasId } = useParams();
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
        ? '/admin' : (location.pathname.startsWith('/guru') 
        ? '/guru' : '/piket');
    const params = new URLSearchParams(location.search);
    const idJadwal = params.get('id');
    const tanggalPresensi = params.get('tgl');
    
    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;
    const hadirIcon = iconList.find((i) => i.label === 'Hadir Icon')?.src;
    const izinIcon = iconList.find((i) => i.label === 'Izin Icon')?.src;
    const sakitIcon = iconList.find((i) => i.label === 'Sakit Icon')?.src;
    const alpaIcon = iconList.find((i) => i.label === 'Alpa Icon')?.src;
    const blueWarningIcon = iconList.find(i => i.label === "Blue Warning Icon")?.src;
    const greenWarningIcon = iconList.find(i => i.label === "Green Warning Icon")?.src;

    const nomor_induk_guru = localStorage.getItem('username') || '-';
    const todayString = new Date().toISOString().slice(0, 10);

    // Ubah format tanggal agar sesuai
    function formatTanggalIndo(dateStr) {
        const bulanIndo = [
            "Januari","Februari","Maret","April","Mei","Juni",
            "Juli","Agustus","September","Oktober","November","Desember"
        ];

        const [year, month, day] = dateStr.split('-');
        return `${day} ${bulanIndo[parseInt(month)-1]} ${year}`;
    }

    const [presensiData, setPresensiData] = useState(
        // default semua "H"
        Array(20).fill('H')
    );

    // Reset presensi jadi H semua
    const handleReset = () => {
        setPresensiData(Array(20).fill('H')); 
    };

    // Fetch siswa setiap kali kelasId berubah
    useEffect(() => {
        async function fetchSiswa() {
            if (!kelasId) return;
            try {
                const siswaList = await getSiswaByKelas(kelasId);
                setDataSiswa(
                    (siswaList || []).map(siswa => ({
                        nis: siswa.nisn,
                        nama: siswa.nama
                    }))
                );
                // Reset presensiData sesuai jumlah siswa
                setPresensiData(Array((siswaList || []).length).fill('H'));
            } catch (err) {
                console.error(err);
                setDataSiswa([]);
                setPresensiData([]);
            }
        }
        fetchSiswa();
    }, [kelasId]);

    // Fetch data profil presensi
    useEffect(() => {
        async function fetchProfilPresensi() {
            if (!idJadwal) return;

            try {
                // Ambil data jadwal
                const jadwalData = await getJadwalById(idJadwal);
                setJadwal(jadwalData);

                // Ambil nama guru
                if (jadwalData?.nomor_induk_guru) {
                    const guruData = await getGuruByNomorInduk(jadwalData.nomor_induk_guru);
                    setNamaGuru(guruData?.nama || '-');
                }

                // Ambil nama mapel
                if (jadwalData?.id_mapel) {
                    const mapelData = await getMapelById(jadwalData.id_mapel);
                    setNamaMapel(mapelData?.nama || '-');
                }
            } catch (err) {
                console.error(err);
                setJadwal(null);
                setNamaGuru('');
                setNamaMapel('');
            }
        }
        fetchProfilPresensi();
    }, [idJadwal]);

    // Fetch data presensi mapel
    useEffect(() => {
        async function fetchPresensi() {
            if (!idJadwal || !tanggalPresensi) return;

            try {
                const data = await getPresensiMapelByJadwalTanggal(idJadwal, tanggalPresensi) || [];
                setDataPresensi(data);

                // Susun array status presensi berdasarkan urutan siswa (pastikan API sudah urut)
                setPresensiData(data.map(item => item.keterangan || 'H'));
                setDataSiswa(data.map(item => ({
                    nis: item.nisn || '-', 
                    nama: item.nama_siswa || '-'
                })));
            } catch (err) {
                setDataPresensi([]);
                setPresensiData([]);
                setDataSiswa([]);
                console.error(err);
            }
        }
        fetchPresensi();
    }, [idJadwal, tanggalPresensi]);

    const handleSimpan = () => {
        // validasi (bisa tambah pengecekan lain jika mau)
        if (!dataSiswa.length) {
            setErrorMsg("Tidak ada data siswa untuk disimpan!");
            return;
        }
        setErrorMsg('');
        setShowSimpanPopup(true);
    };

    const handleConfirmSimpan = async () => {
        try {
            const now = new Date();
            const waktuPresensi = now.toLocaleTimeString('en-GB', { hour12: false });
            let payload = [];

            if (!tanggalPresensi) {
                // CREATE MODE
                payload = dataSiswa.map((siswa, i) => ({
                    id_jadwal: idJadwal,
                    nisn: siswa.nis,
                    tanggal_presensi: todayString,
                    waktu_presensi: waktuPresensi,
                    keterangan: presensiData[i],
                    nama_siswa: siswa.nama,
                    kelas: kelasId?.toUpperCase() || '-',
                    nomor_induk_guru: nomor_induk_guru,
                }));

                await createPresensiMapel(payload);
                setShowSimpanPopup(false);
                // Navigasi ke halaman pertemuan (tambah)
                navigate(`${prefix}/kelas/${kelasId?.toUpperCase()}/pertemuan?id=${idJadwal}`);
            } else {
                // UPDATE MODE
                payload = dataPresensi.map((presensi, i) => ({
                    id_jadwal: idJadwal,
                    nisn: presensi.nisn,
                    tanggal_presensi: presensi.tanggal_presensi,
                    keterangan: presensiData[i], // update keterangan dari form
                }));

                await updatePresensiMapel(payload);
                setShowSimpanPopup(false);
                // Navigasi ke halaman lihat presensi (update)
                navigate(`${prefix}/kelas/${kelasId?.toUpperCase()}/pertemuan/lihat-presensi?id=${idJadwal}&tgl=${tanggalPresensi}`);
            }
        } catch (err) {
            setErrorMsg('Gagal simpan presensi: ' + (err.message || JSON.stringify(err)));
            setShowSimpanPopup(false);
        }
    };
    return (
        <div>
            <Header> Form Presensi </Header>

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
                    
                    {/* Profile Presensi */}
                    <Card
                        style={{
                            width: '100%',
                            marginTop: '35px',
                            padding: '30px',
                        }}
                    >
                        <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '22px' }}>
                            Profil Presensi
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '16px', color: '#1c1c1c' }}>
                            {[
                                ['Nama Guru', namaGuru || '-'],
                                ['Mata Pelajaran', namaMapel || '-'],
                                ['Kelas', kelasId?.toUpperCase() || '-'],
                                ['Jumlah Siswa', dataSiswa.length + ' siswa'],
                                ['Tahun Ajaran', jadwal?.tahun_ajaran || '-'],
                                ['Tanggal Presensi', 
                                    (tanggalPresensi ? formatTanggalIndo(tanggalPresensi) : formatTanggalIndo(todayString))
                                ],
                            ].map(([label, value], index) => (
                                <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div className="d-flex flex-row gap-4"> 
                                        <div className="custom-width-form-besar"> {label} </div>
                                        <div style={{ width: '15px' }}> : </div>
                                    </div>
                                    
                                    <div style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}> 
                                        {value} 
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Presensi Content */}
                    <Card style={{ width: '100%', marginTop: '45px', padding: '30px' }}>
                        {/* Title */}
                        <h3 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '22px' }}> 
                            Presensi Siswa 
                        </h3>

                        {/* Keterangan */}
                        <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                            <div className="d-flex align-items-center gap-1">
                                <img src={hadirIcon} alt="Hadir" width="28" height="28" /> <strong> = Hadir </strong>
                            </div>

                            <div className="d-flex align-items-center gap-1">
                                <img src={izinIcon} alt="Izin" width="28" height="28" /> <strong> = Izin </strong>
                            </div>

                            <div className="d-flex align-items-center gap-1">
                                <img src={sakitIcon} alt="Sakit" width="28" height="28" /> <strong> = Sakit </strong>
                            </div>
                            
                            <div className="d-flex align-items-center gap-1">
                                <img src={alpaIcon} alt="Alpa" width="28" height="28" /> <strong> = Alpa </strong>
                            </div>
                        </div>

                        {/* Tabel Presensi */}
                        <div
                            className="table-responsive"
                            style={{
                                marginTop: '25px',
                                borderRadius: '10px',
                                border: '2px solid #D6D6D6',
                            }}
                        >
                            <Table className="custom-table border-vertikal">
                                <thead style={{ backgroundColor: '#D6E7F9', textAlign: 'center' }}>
                                    <tr>
                                        <th style={{ minWidth: '30px', padding: '16px' }}> No. </th>
                                        <th style={{ minWidth: '130px', padding: '16px' }}> Nomor Induk </th>
                                        <th style={{ minWidth: '250px', padding: '16px' }}> Nama Siswa </th>
                                        <th style={{ width: '70px', padding: '16px' }}> Hadir </th>
                                        <th style={{ width: '70px', padding: '16px' }}> Izin </th>
                                        <th style={{ width: '70px', padding: '16px' }}> Sakit </th>
                                        <th style={{ width: '70px', padding: '16px' }}> Alpa </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {dataSiswa.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} style={{ textAlign: 'center' }}> Tidak ada data presensi ditemukan! </td>
                                        </tr>
                                    ) : (
                                        dataSiswa.map((siswa, i) => (
                                            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#F3F3F3' : '#FFF' }}>
                                                <td className="text-center" style={{ verticalAlign: 'middle', padding: '14px' }}> {i+1}. </td>
                                                <td className="text-center" style={{ verticalAlign: 'middle', padding: '14px' }}> {siswa.nis} </td>
                                                <td className="text-left" style={{ verticalAlign: 'middle', padding: '14px' }}> {siswa.nama} </td>
                                                {['H', 'I', 'S', 'A'].map((status, idx) => (
                                                    <td
                                                        key={idx}
                                                        className="text-center"
                                                        style={{ width: '70px', padding: '10px 6px', verticalAlign: 'middle' }}
                                                    >
                                                        <input
                                                            className={`custom-radio ${status}`}
                                                            type="radio"
                                                            name={`presensi-${i}`}
                                                            id={`presensi-${i}-${status}`}
                                                            value={status}
                                                            checked={presensiData[i] === status}
                                                            onChange={() => {
                                                                // update status presensi sesuai index
                                                                const newData = [...presensiData];
                                                                newData[i] = status;
                                                                setPresensiData(newData);
                                                            }}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </div>

                        {/* Jika data yang bersifat required kosong */}
                        {errorMsg && (
                            <div style={{ color: "red", fontWeight: "bold", marginBottom: 18 }}>
                                {errorMsg}
                            </div>
                        )}
                        
                        {/* Wrap Button Simpan & Reset */}
                        <div className="d-flex flex-row justify-content-center justify-content-md-end gap-4">
                            {/* Tombol Reset */}
                            <div className="d-flex justify-content-end mt-4">
                                <DangerButton
                                    className="d-flex align-items-center justify-content-center"
                                    width="140px"
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
                                    RESET
                                </DangerButton>
                            </div>

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
                    </Card>
                </div>
            </main>

            {/* Popup konfirmasi simpan data user */}
            <CardPopUp
                open={showSimpanPopup}
                image={tanggalPresensi ? blueWarningIcon : greenWarningIcon}
                borderColor={tanggalPresensi ? "#1976D2" : "#33DB00"}
                buttons={[
                    {
                        label: "Kembali",
                        bgColor: "#FFFFFF",
                        textColor: tanggalPresensi ? "#1976D2" : "#33DB00",
                        borderColor: tanggalPresensi ? "#1976D2" : "#33DB00",
                        onClick: () => setShowSimpanPopup(false),
                    },
                    {
                        label: tanggalPresensi ? "Perbarui Data" : "Simpan Data",
                        bgColor: tanggalPresensi ? "#1976D2" : "#33DB00",
                        textColor: "#FFFFFF",
                        borderColor: tanggalPresensi ? "#1976D2" : "#33DB00",
                        onClick: handleConfirmSimpan,
                    }
                ]}
            >
                {tanggalPresensi ? (
                    <>Apakah Anda yakin ingin memperbarui data presensi? </>
                ) : (
                    <>Apakah Anda yakin ingin menyimpan data presensi? </>
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

export default PresensiForm;