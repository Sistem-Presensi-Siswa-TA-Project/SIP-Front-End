// Filename: Daftar-GuruMapel.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Header, Card } from '../components/Molekul.jsx';
import { SecondaryButton } from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';

function Informasi() {
    // Navigasi
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
        ? '/admin' : (location.pathname.startsWith('/guru') 
        ? '/guru' : '/piket');
    const navigate = useNavigate();

    // State
    const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);

    // Icon from iconList
    const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
    const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;

    return (
        <div>
            <Header> Informasi </Header>

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

                    {/* Informasi Akademik */}
                    <Card style={{ width: '100%', marginTop: '45px', padding: '30px' }}>
                        {/* Wrapper Tabel */}
                        <div 
                            className="table-responsive mx-auto" 
                            style={{ 
                                marginTop: '25px', 
                                borderRadius: '10px', 
                                border: '2px solid #D6D6D6',
                                maxWidth: '850px',
                            }}
                        >
                            <Table className="custom-table">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'left', padding: '16px 16px 16px 25px', fontSize: '22px' }}> Kalender Akademik </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {/* Bulan ke-1 */}
                                    <tr>
                                        <td style={{ padding: '12px 14px 12px 25px' }}>
                                            {/* Bulan & Tahun */}
                                            <div className="d-flex align-items-start gap-3">
                                                <span 
                                                    style={{ 
                                                        fontWeight: 'bold', 
                                                        textAlign: 'left', 
                                                        marginBottom: '4px',
                                                        fontSize: '18px',
                                                    }}
                                                > 
                                                    Juli 2025 
                                                </span>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '14px 14px 14px 25px' }}>
                                            <div className="d-flex align-items-start gap-3">
                                                {/* Bulatan Hijau */}
                                                <div
                                                    className="my-auto"
                                                    style={{
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#379777',
                                                        marginTop: '4px',
                                                    }}
                                                />

                                                {/* Subjek & Keterangan */}
                                                <div className="d-flex flex-column">
                                                    <span 
                                                        style={{ 
                                                            fontWeight: 'bold', 
                                                            textAlign: 'left', 
                                                            marginBottom: '4px',
                                                            fontSize: '18px',
                                                            color: '#379777',
                                                        }}
                                                    > 
                                                        [Subjek]
                                                    </span>

                                                    <span style={{ color: '#999', fontSize: '15px', textAlign: 'left' }}> Keterangan </span>
                                                </div>
                                            </div>

                                            <br />

                                            <div className="d-flex align-items-start gap-3">
                                                {/* Bulatan Hijau */}
                                                <div
                                                    className="my-auto"
                                                    style={{
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#379777',
                                                        marginTop: '4px',
                                                    }}
                                                />

                                                {/* Subjek & Keterangan */}
                                                <div className="d-flex flex-column">
                                                    <span 
                                                        style={{ 
                                                            fontWeight: 'bold', 
                                                            textAlign: 'left', 
                                                            marginBottom: '4px',
                                                            fontSize: '18px',
                                                            color: '#379777',
                                                        }}
                                                    > 
                                                        [Subjek]
                                                    </span>

                                                    <span style={{ color: '#999', fontSize: '15px', textAlign: 'left' }}> Keterangan </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Bulan ke-2 */}                                
                                    <tr>
                                        <td style={{ padding: '12px 14px 12px 25px' }}>
                                            {/* Bulan & Tahun */}
                                            <div className="d-flex align-items-start gap-3">
                                                <span 
                                                    style={{ 
                                                        fontWeight: 'bold', 
                                                        textAlign: 'left', 
                                                        marginBottom: '4px',
                                                        fontSize: '18px',
                                                    }}
                                                > 
                                                    Agustus 2025 
                                                </span>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '14px 14px 14px 25px' }}>
                                            <div className="d-flex align-items-start gap-3">
                                                {/* Bulatan Hijau */}
                                                <div
                                                    className="my-auto"
                                                    style={{
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#379777',
                                                        marginTop: '4px',
                                                    }}
                                                />

                                                {/* Subjek & Keterangan */}
                                                <div className="d-flex flex-column">
                                                    <span 
                                                        style={{ 
                                                            fontWeight: 'bold', 
                                                            textAlign: 'left', 
                                                            marginBottom: '4px',
                                                            fontSize: '18px',
                                                            color: '#379777',
                                                        }}
                                                    > 
                                                        [Subjek]
                                                    </span>

                                                    <span style={{ color: '#999', fontSize: '15px', textAlign: 'left' }}> Keterangan </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Bulan ke-3 */}
                                    <tr>
                                        <td style={{ padding: '12px 14px 12px 25px' }}>
                                            {/* Bulan & Tahun */}
                                            <div className="d-flex align-items-start gap-3">
                                                <span 
                                                    style={{ 
                                                        fontWeight: 'bold', 
                                                        textAlign: 'left', 
                                                        marginBottom: '4px',
                                                        fontSize: '18px',
                                                    }}
                                                > 
                                                    September 2025 
                                                </span>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '14px 14px 14px 25px' }}>
                                            <div className="d-flex align-items-start gap-3">
                                                {/* Bulatan Hijau */}
                                                <div
                                                    className="my-auto"
                                                    style={{
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#379777',
                                                        marginTop: '4px',
                                                    }}
                                                />

                                                {/* Subjek & Keterangan */}
                                                <div className="d-flex flex-column">
                                                    <span 
                                                        style={{ 
                                                            fontWeight: 'bold', 
                                                            textAlign: 'left', 
                                                            marginBottom: '4px',
                                                            fontSize: '18px',
                                                            color: '#379777',
                                                        }}
                                                    > 
                                                        [Subjek]
                                                    </span>

                                                    <span style={{ color: '#999', fontSize: '15px', textAlign: 'left' }}> Keterangan </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Bulan ke-4 */}
                                    <tr>
                                        <td style={{ padding: '12px 14px 12px 25px' }}>
                                            {/* Bulan & Tahun */}
                                            <div className="d-flex align-items-start gap-3">
                                                <span 
                                                    style={{ 
                                                        fontWeight: 'bold', 
                                                        textAlign: 'left', 
                                                        marginBottom: '4px',
                                                        fontSize: '18px',
                                                    }}
                                                > 
                                                    Oktober 2025 
                                                </span>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '14px 14px 14px 25px' }}>
                                            <div className="d-flex align-items-start gap-3">
                                                {/* Bulatan Hijau */}
                                                <div
                                                    className="my-auto"
                                                    style={{
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#379777',
                                                        marginTop: '4px',
                                                    }}
                                                />

                                                {/* Subjek & Keterangan */}
                                                <div className="d-flex flex-column">
                                                    <span 
                                                        style={{ 
                                                            fontWeight: 'bold', 
                                                            textAlign: 'left', 
                                                            marginBottom: '4px',
                                                            fontSize: '18px',
                                                            color: '#379777',
                                                        }}
                                                    > 
                                                        [Subjek]
                                                    </span>

                                                    <span style={{ color: '#999', fontSize: '15px', textAlign: 'left' }}> Keterangan </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Bulan ke-5 */}
                                    <tr>
                                        <td style={{ padding: '12px 14px 12px 25px' }}>
                                            {/* Bulan & Tahun */}
                                            <div className="d-flex align-items-start gap-3">
                                                <span 
                                                    style={{ 
                                                        fontWeight: 'bold', 
                                                        textAlign: 'left', 
                                                        marginBottom: '4px',
                                                        fontSize: '18px',
                                                    }}
                                                > 
                                                    November 2025 
                                                </span>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '14px 14px 14px 25px' }}>
                                            <div className="d-flex align-items-start gap-3">
                                                {/* Bulatan Hijau */}
                                                <div
                                                    className="my-auto"
                                                    style={{
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#379777',
                                                        marginTop: '4px',
                                                    }}
                                                />

                                                {/* Subjek & Keterangan */}
                                                <div className="d-flex flex-column">
                                                    <span 
                                                        style={{ 
                                                            fontWeight: 'bold', 
                                                            textAlign: 'left', 
                                                            marginBottom: '4px',
                                                            fontSize: '18px',
                                                            color: '#379777',
                                                        }}
                                                    > 
                                                        [Subjek]
                                                    </span>

                                                    <span style={{ color: '#999', fontSize: '15px', textAlign: 'left' }}> Keterangan </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Bulan ke-6 */}
                                    <tr>
                                        <td style={{ padding: '12px 14px 12px 25px' }}>
                                            {/* Bulan & Tahun */}
                                            <div className="d-flex align-items-start gap-3">
                                                <span 
                                                    style={{ 
                                                        fontWeight: 'bold', 
                                                        textAlign: 'left', 
                                                        marginBottom: '4px',
                                                        fontSize: '18px',
                                                    }}
                                                > 
                                                    Desember 2025 
                                                </span>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ padding: '14px 14px 14px 25px' }}>
                                            <div className="d-flex align-items-start gap-3">
                                                {/* Bulatan Hijau */}
                                                <div
                                                    className="my-auto"
                                                    style={{
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#379777',
                                                        marginTop: '4px',
                                                    }}
                                                />

                                                {/* Subjek & Keterangan */}
                                                <div className="d-flex flex-column">
                                                    <span 
                                                        style={{ 
                                                            fontWeight: 'bold', 
                                                            textAlign: 'left', 
                                                            marginBottom: '4px',
                                                            fontSize: '18px',
                                                            color: '#379777',
                                                        }}
                                                    > 
                                                        [Subjek]
                                                    </span>

                                                    <span style={{ color: '#999', fontSize: '15px', textAlign: 'left' }}> Keterangan </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
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

export default Informasi;