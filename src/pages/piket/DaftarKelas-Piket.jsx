// Filename: DaftarKelas-Piket.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, Card, CardPresensi } from '../../components/Molekul.jsx';
import { SecondaryButton } from '../../components/Button.jsx';
import { iconList } from '../../data/iconData.js';
import { getAllJadwal } from '../../handlers/JadwalHandler.jsx';
import { getSiswaByKelas } from '../../handlers/SiswaHandler.jsx';

function DaftarKelasPiket() {
    // Navigasi
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
        ? '/admin' : (location.pathname.startsWith('/guru') 
        ? '/guru' : '/piket');
    const navigate = useNavigate();

    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
    const [jadwalList, setJadwalList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Icon
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;

    // Fetch semua jadwal dan menghitung jumlah siswa
    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await getAllJadwal();
                const jadwalArray = Array.isArray(data) ? data : [];
                
                // Mencegah duplikasi tampilan kelas yang sama
                const kelasUnik = {};
                jadwalArray.forEach(jadwal => {
                    if (!kelasUnik[jadwal.kelas]) {
                        kelasUnik[jadwal.kelas] = jadwal;
                    }
                });
                const jadwalKelasUnik = Object.values(kelasUnik);

                // Ambil jumlah siswa untuk setiap kelas
                const jadwalWithSiswa = await Promise.all(jadwalKelasUnik.map(async (jadwal) => {
                    let totalSiswa = "-";
                    try {
                        const siswaData = await getSiswaByKelas(jadwal.kelas);
                        totalSiswa = Array.isArray(siswaData) ? siswaData.length : "-";
                    } catch {
                        totalSiswa; // totalSiswa tetap "-"
                    }
                    return { ...jadwal, totalSiswa };
                }));

                setJadwalList(jadwalWithSiswa);
            } catch (e) {
                console.error("ERROR: ", e);
                setJadwalList([]);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div>
            <Header>Daftar Kelas</Header>

            <main
                className="d-flex justify-content-center flex-wrap"
                style={{ gap: '20px' }}
            >
                <div 
                    className="d-flex flex-column align-items-start w-100 px-4" 
                    style={{ maxWidth: '1100px', paddingTop: '40px' }}
                >
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
                            style={{ marginLeft: '4px' }}
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

                    {/* Daftar Kelas */}
                    <Card
                        style={{
                            width: '100%',
                            marginTop: '35px',
                            padding: '30px',
                        }}
                    >
                        {/* Title */}
                        <h4 style={{ fontWeight: 'bold', color: '#379777', marginBottom: '30px' }}> 
                            Daftar Kelas 
                        </h4>

                        <div className="row" style={{ rowGap: '50px' }}>
                            {loading ? (
                                <div style={{ textAlign: "center", width: "100%" }}>
                                    <b> Memuat data kelas ... </b>
                                </div>
                            ) : (
                                <>
                                    {jadwalList.length === 0 ? (
                                        <div style={{ textAlign: "center", width: "100%" }}>
                                            <b> Tidak ada kelas ditemukan! </b>
                                        </div>
                                    ) : (
                                        jadwalList.map((jadwal, index) => {
                                            let linkDetail = "";

                                            if (prefix === "/admin") {
                                                linkDetail = `${prefix}/data/kelas/${jadwal.kelas.toUpperCase()}`;
                                            } else if (prefix === "/piket") {
                                                linkDetail = `${prefix}/kelas/${jadwal.kelas.toUpperCase()}`;
                                            }

                                            return (
                                                <div className="col-md-4 col-sm-6 col-12 d-flex justify-content-center" key={index}>
                                                    <CardPresensi
                                                        namaKelas={`Kelas ${jadwal.kelas}`}
                                                        tahunAjar={`${jadwal.tahun_ajaran || "202X/202X"} ${jadwal.semester || ""}`}
                                                        totalSiswa={jadwal.totalSiswa || "-"}
                                                        children="Lihat Detail"
                                                        to={linkDetail}
                                                    />
                                                </div>
                                            );
                                        })
                                    )}
                                </>
                            )}
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

export default DaftarKelasPiket;