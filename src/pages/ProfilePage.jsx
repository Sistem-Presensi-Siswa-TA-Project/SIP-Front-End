// Filename: ProfilePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Card } from '../components/Molekul.jsx';
import { PrimaryButton, SecondaryButton} from '../components/Button.jsx';
import { iconList } from '../data/iconData.js';

function Profile() {
  const navigate = useNavigate();
  const [secondaryButtonHovering, setSecondaryButtonHovering] = useState(false);
  const [primaryButtonHovering, setPrimaryButtonHovering] = useState(false);

  const leftArrowBlack = iconList.find((i) => i.label === 'Left Arrow Black')?.src;
  const leftArrowYellow = iconList.find((i) => i.label === 'Left Arrow Yellow')?.src;

  return (
    <div>
      <Header> Profile User </Header>

      <main
        className="d-flex justify-content-center flex-wrap"
        style={{ gap: '20px' }}
      >
        <div 
            className="d-flex flex-column align-items-center w-100 mx-auto px-4" 
            style={{ maxWidth: '1100px', paddingTop: '40px' }}
        >
            <div className="d-flex flex-column align-items-start w-100 mx-auto">
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
            
                {/* Main Card */}
                <div 
                    className="d-flex flex-column flex-lg-row custom-container" 
                    style={{ marginTop: '30px', gap: '30px' }}
                >
                    {/* Data Diri */}
                    <Card 
                        className="w-100 d-flex justify-content-center align-items-start" 
                        height="calc(100% + 10px)" 
                        style={{ padding: '30px' }}
                    >
                        <div className="w-100 d-flex flex-column">
                            <h3 style={{ fontWeight: 'bold', marginBottom: '30px' }}> Data Diri </h3>

                            {/* Image Profile & Button */}
                            <div 
                                className="d-flex flex-column flex-sm-row gap-5 justify-content-start align-items-center"
                                style={{ marginBottom: '40px' }}
                            >
                                {/* Image Profile */}
                                <div style={{ position: 'relative', width: '95px', height: '95px' }}>
                                    <img
                                        src={iconList.find(i => i.label === 'Profile Default')?.src}
                                        alt="Profile"
                                        style={{
                                            width: '100px',
                                            height: '95px',
                                            objectFit: 'cover',
                                        }}
                                    />

                                    <img
                                        src={iconList.find(i => i.label === 'Add Profile')?.src}
                                        alt="Add"
                                        style={{
                                            position: 'absolute',
                                            top: '-8px',
                                            right: '-8px',
                                            width: '30px',
                                            height: '30px',
                                        }}
                                    />
                                </div>

                                {/* Button */}
                                <div className="d-flex flex-row gap-4">
                                    <PrimaryButton 
                                        width="145px" 
                                        height="40px"
                                        fontSize="14px"
                                        className="width-button-mobile"
                                        onMouseEnter={() => setPrimaryButtonHovering(true)}
                                        onMouseLeave={() => setPrimaryButtonHovering(false)}
                                        style={{ 
                                            justifyContent: 'center', 
                                            alignItems: 'center',
                                            borderRadius: primaryButtonHovering ? '12px' : '10px',
                                            boxShadow: primaryButtonHovering ? '6px 6px 12px rgba(0, 0, 0, 0.5)' : '2px 2px 8px rgba(0, 0, 0, 0.5)',
                                            transition: 'box-shadow 0.2s ease-in-out',
                                        }}
                                    > 
                                        Ubah Password 
                                    </PrimaryButton>

                                    <PrimaryButton 
                                        width="145px"
                                        height="40px"
                                        fontSize="14px"
                                        className="width-button-mobile"
                                        onMouseEnter={() => setPrimaryButtonHovering(true)}
                                        onMouseLeave={() => setPrimaryButtonHovering(false)}
                                        style={{ 
                                            justifyContent: 'center', 
                                            alignItems: 'center',
                                            borderRadius: primaryButtonHovering ? '12px' : '10px',
                                            boxShadow: primaryButtonHovering ? '6px 6px 12px rgba(0, 0, 0, 0.5)' : '2px 2px 8px rgba(0, 0, 0, 0.5)',
                                            transition: 'box-shadow 0.2s ease-in-out',
                                        }}
                                    > 
                                        Ubah Data Diri 
                                    </PrimaryButton>
                                </div>
                            </div>

                            {/* Grid Data */}
                            <div className="d-flex flex-column" style={{ fontSize: '16px', gap: '26px' }}>
                                {[
                                    ['Nama Lengkap', 'Nama Lengkap'],
                                    ['Jenis Kelamin', 'Jenis kelamin'],
                                    ['Tempat, Tanggal Lahir', 'Tempat, Tanggal Lahir'],
                                    ['Agama', 'Agama'],
                                    ['Nomor Induk Kependudukan (NIK)', 'Nomor Induk Kependudukan (NIK)'],
                                    ['Nomor Handphone', 'Nomor Handphone'],
                                    ['Email', 'Email'],
                                ].map(([label, value], i) => (
                                    <div key={i} className="d-flex flex-row">
                                        <div className="d-flex flex-row gap-4"> 
                                            <div className="custom-width-form-besar"> {label} </div>
                                            <div style={{ width: '15px' }}> : </div>
                                        </div>

                                        <div 
                                            style={{ 
                                                wordBreak: 'break-word', 
                                                overflowWrap: 'break-word', 
                                            }}
                                        > 
                                            {value} 
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Data Akademik & Alamat */}
                    <div className="custom-container d-flex flex-column align-items-end" style={{ gap: '50px', width: '800px' }}>
                        {/* Data Akademik */}
                        <Card className="w-100 card-kecil" height="calc(100% + 10px)" style={{ padding: '20px' }}>
                            <div className="w-100 d-flex flex-column px-2 py-1">
                                <h4 style={{ fontWeight: 'bold', marginBottom: '20px' }}> Data Akademik </h4>

                                <div className="d-flex flex-column" style={{ fontSize: '16px', gap: '20px' }}>
                                    {[
                                        ['NIP/NISN', 'NIP/NISN'],
                                        ['Mata Pelajaran', 'Mata Pelajaran'],
                                        ['Status', 'Wali Kelas'],
                                        ['Pendidikan', 'Pendidikan'],
                                    ].map(([label, value], i) => (
                                        <div key={i} className="d-flex flex-row">
                                            <div className="d-flex flex-row gap-3"> 
                                                <div className="custom-width-form-kecil"> {label} </div>
                                                <div style={{ width: '12px' }}> : </div>
                                            </div>

                                            <div 
                                                style={{ 
                                                    wordBreak: 'break-word', 
                                                    overflowWrap: 'break-word', 
                                                }}
                                            > 
                                                {value} 
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Alamat */}
                        <Card className="w-100 card-kecil" height="calc(100% + 10px)" style={{ padding: '20px' }}>
                            <div className="w-100 d-flex flex-column px-2 py-1">
                                <h4 style={{ fontWeight: 'bold', marginBottom: '20px' }}> Alamat </h4>

                                <div className="d-flex flex-column" style={{ fontSize: '16px', gap: '20px' }}>
                                    {[
                                        ['Alamat Domisili', 'Alamat Domisili'],
                                        ['Desa/Kelurahan', 'Desa/Kelurahan'],
                                        ['Kecamatan', 'Kecamatan'],
                                        ['Kab/Kota', 'Kab/Kota'],
                                        ['Provinsi', 'Provinsi'],
                                        ['Kode Pos', 'Kode Pos'],
                                    ].map(([label, value], i) => (
                                        <div key={i} className="d-flex flex-row">
                                            <div className="d-flex flex-row gap-3"> 
                                                <div className="custom-width-form-kecil"> {label} </div>
                                                <div style={{ width: '12px' }}> : </div>
                                            </div>

                                            <div 
                                                style={{ 
                                                    wordBreak: 'break-word', 
                                                    overflowWrap: 'break-word', 
                                                }}
                                            > 
                                                {value} 
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
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

export default Profile;