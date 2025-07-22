// Filename: Molekul.jsx

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { iconList } from '../data/iconData.js';
import { logout } from '../utils/sessionTimeOut.js';

export const Header = ({ children='As User' }) => {
    const logo = iconList.find((i) => i.label === 'Logo')?.src;

    // Navigasi Page
    const location = useLocation();
    const prefix = location.pathname.startsWith('/admin') 
        ? '/admin' : (location.pathname.startsWith('/guru') 
        ? '/guru' : '/piket');
    const navigate = useNavigate();

    return (
        <header className="header-bar animate-slide-down">
            
        <div className="header-container">
                <img 
                    src={logo} alt="Logo" 
                    className="header-logo" 
                    draggable={false}
                />

                <h5
                    className="header-title"
                    onClick={() => navigate(
                        `${prefix}`
                    )}
                >
                    SIPLUS BABUSSALAM
                </h5>

                {/* Elemen children di sisi kanan */}
                {children && (
                    <span 
                        className="header-children"
                        style={{
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            marginLeft: 'auto',
                            marginRight: '30px',
                        }}
                    >
                        {children}
                    </span>
                )}
            </div>
        </header>
    );
};

export const Sidebar = (props) => {
    const {
        onClose,
        pathMap: customPathMap = {},
        sidebarCustomMenu = {},
    } = props;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [hoveredSubitem, setHoveredSubitem] = useState(null);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const navigate = useNavigate();

    const sidebarMenu = sidebarCustomMenu.sidebarMenu || [
        { label: 'Minimize', icon: 'Back Icon Black' },
        { label: 'Beranda', icon: 'Dashboard Icon' },
        { label: 'Profil', icon: 'Profile Icon' },
        { label: 'Lihat Presensi', icon: 'Presensi Icon' },
        { label: 'Cetak Presensi', icon: 'Cetak Icon' },
        { label: 'Lainnya', icon: 'Lainnya Icon Black', hasDropdown: true },
    ];

    const dropdownItems = sidebarCustomMenu.dropdownItems || [
        { label: 'Kontak', icon: 'Kontak Icon' },
        { label: 'Informasi', icon: 'Informasi Icon' },
        { label: 'Logout', icon: 'Logout Icon' },
    ];

    const defaultPathMap = {
        Beranda: '/guru',
        Profil: '/profile',
        'Lihat Presensi': '/guru/daftar-kelas',
        'Cetak Presensi': '/cetak-presensi',
        Jadwal: '/jadwal',
        Kontak: '/kontak',
        Informasi: '/informasi',
        Logout: '/',
    };

    // Merge default dan custom (custom menimpa default jika ada)
    const pathMap = { ...defaultPathMap, ...customPathMap };

    const rightArrow = iconList.find((i) => i.label === 'Right Arrow White')?.src;
    const leftArrow = iconList.find((i) => i.label === 'Left Arrow White')?.src;
    const arrowDownWhite = iconList.find((i) => i.label === 'Arrow Down White')?.src;
    const arrowDownBlack = iconList.find((i) => i.label === 'Arrow Down Black')?.src;
    const redWarningIcon = iconList.find(i => i.label === "Red Warning Icon")?.src;

    return (
        <>
            <aside className='sidebar animate-sidebar'>
                <ul className="sidebar-menu">
                    {sidebarMenu.map((item, index) => {
                        const isHovered = hoveredItem === item.label;
                        const icon = iconList.find((i) => i.label === item.icon)?.src;

                        return (
                            <React.Fragment key={index}>
                                <li
                                    className="sidebar-item"
                                    onClick={() => {
                                        // Jika item "Minimize", jalankan fungsi tutup sidebar
                                        if (item.label === 'Minimize' && onClose) {
                                            onClose();
                                        } else if (item.hasDropdown) {
                                            setIsDropdownOpen(!isDropdownOpen);
                                        } else if (item.label === 'Logout') {                                    
                                            setShowLogoutPopup(true);
                                        } else if (pathMap[item.label]) {
                                            navigate(pathMap[item.label]);
                                        }
                                    }}
                                    onMouseEnter={() => setHoveredItem(item.label)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    {/* Icon Kiri */}
                                    {item.label === 'Minimize' ? (
                                            isHovered ? (
                                                <img 
                                                    src={leftArrow} 
                                                    width="8"
                                                    height="8" 
                                                    alt="Minimize"
                                                    style={{ marginLeft: '5px', marginRight: '20px' }}
                                                    draggable={false}
                                                />
                                            ) : (
                                                <img src={icon} alt="Minimize" className="sidebar-icon" draggable={false} />
                                            )
                                        ) : item.hasDropdown ? (
                                            isHovered ? (
                                                <span className="sidebar-icon-placeholder" />
                                            ) : (
                                                <img src={icon} alt={item.label} className="sidebar-icon" draggable={false} />
                                            )
                                        ) : (
                                            isHovered ? (
                                                <span className="sidebar-icon-placeholder" />
                                            ) : (
                                                <img src={icon} alt={item.label} className="sidebar-icon" draggable={false} />
                                            )
                                        )
                                    }

                                    {/* Label */}
                                    <span className="sidebar-label"> {item.label} </span>

                                    {/* Icon Kanan */}
                                    {item.hasDropdown && (
                                        <img
                                            src={isHovered ? arrowDownWhite : arrowDownBlack}
                                            alt="Dropdown"
                                            width="18"
                                            height="18"
                                            style={{ marginLeft: 'auto' }}
                                            draggable={false}
                                        />
                                    )}

                                    {!item.hasDropdown && item.label !== 'Minimize' && isHovered && (
                                        <img
                                            src={rightArrow}
                                            alt="Hover Arrow"
                                            width="18"
                                            height="18"
                                            style={{ marginLeft: 'auto' }}
                                            draggable={false}
                                        />
                                    )}
                                </li>

                                {/* Submenu Dropdown */}
                                {item.hasDropdown && isDropdownOpen && (
                                    <ul className="sidebar-submenu">
                                        {dropdownItems.map((sub, subIndex) => {
                                            const isSubHovered = hoveredSubitem === sub.label;
                                            const subIcon = iconList.find((i) => i.label === sub.icon)?.src;

                                            return (
                                                <li
                                                    key={subIndex}
                                                    className="sidebar-subitem"
                                                    onClick={() => {
                                                        if (sub.label === 'Logout') {
                                                            // Panggil logout supaya token & lastActivity dihapus dan redirect ke halaman login
                                                            logout();
                                                        } else if (pathMap[sub.label]) {
                                                            navigate(pathMap[sub.label]);
                                                        }
                                                    }}
                                                    onMouseEnter={() => setHoveredSubitem(sub.label)}
                                                    onMouseLeave={() => setHoveredSubitem(null)}
                                                >
                                                    {/* Icon Kiri Submenu */}
                                                    {isSubHovered ? (
                                                            <span className="sidebar-icon-placeholder" />
                                                        ) : (
                                                            <img src={subIcon} alt={sub.label} className="sidebar-icon" draggable={false} />
                                                        )
                                                    }

                                                    {/* Label */}
                                                    <span className="sidebar-label"> {sub.label} </span>

                                                    {/* Icon Kanan Submenu */}
                                                    {isSubHovered && (
                                                        <img
                                                            src={rightArrow}
                                                            alt="Sub Arrow"
                                                            width="16"
                                                            height="16"
                                                            style={{ marginLeft: 'auto' }}
                                                            draggable={false}
                                                        />
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </React.Fragment>
                        );
                    })}
                </ul>
            </aside>

            {/* POPUP LOGOUT */}
            <CardPopUp
                open={showLogoutPopup}
                image={redWarningIcon}
                borderColor="#DB4437"
                buttons={[
                    {
                        label: "Kembali ke Beranda",
                        bgColor: "#FFFFFF",
                        textColor: "#DB4437",
                        borderColor: "#DB4437",
                        onClick: () => setShowLogoutPopup(false),
                    },
                    {
                        label: "Ya, Saya Yakin",
                        bgColor: "#DB4437",
                        textColor: "#FFFFFF",
                        borderColor: "#DB4437",
                        onClick: () => {
                            logout();
                            setShowLogoutPopup(false);
                        },
                    }
                ]}
            >
                Apakah Anda yakin ingin keluar?
            </CardPopUp>
        </>
    );
};

export const Card = (props) => {
    const {
        children, 
        width = '100%', 
        height = 'auto', 
        className = '', 
        style = {},
        ...rest
    } = props;

    return (
        <div
            className={`custom-card animate-card ${className}`}
            style={{ width, height, ...style }}
            {...rest}
        >
            {children}
        </div>
    );
};

export const CardPresensi = (props) => {
    const {
        namaKelas, 
        tahunAjar, 
        totalSiswa,
        mapel,
        children,
        to,
    } = props;

    const navigate = useNavigate();
    const arrowRightIcon = iconList.find(i => i.label === 'Arrow Right Black')?.src;
    const jumlahSiswa = iconList.find((i) => i.label === 'Jumlah Siswa Icon')?.src;

    return (
        <div className="card-presensi" onClick={() => navigate(to)}>
            {/* Header */}
            <div className="card-presensi-header">
                <h5 className="card-presensi-title"> {namaKelas} </h5>
            </div>

            {/* Body */}
            <div className="card-presensi-body d-flex flex-column gap-1">
                <span className="text-secondary"> {mapel} </span>

                <div className="d-flex justify-content-between align-items-center">
                    <span className="text-secondary"> Jumlah Siswa </span>
                    <span className="text-dark fw-bold d-flex align-items-center">
                        {totalSiswa}
                        <img 
                            src={jumlahSiswa} 
                            alt="Jumlah Siswa" 
                            width="16" 
                            height="16" 
                            style={{ marginLeft: "8px" }}
                            draggable={false}
                        />
                    </span>
                </div>
                
                <span className="text-secondary"> {tahunAjar} </span>
            </div>

            {/* Footer */}
            <div className="card-presensi-footer">
                <span className="fw-bold"> {children} </span>
                <img src={arrowRightIcon} alt="Lihat Detail" width="20" height="20" className="ms-2" draggable={false} />
            </div>
        </div>
    );
};

export const Camera = forwardRef((props, ref) => {
    const videoRef = useRef();
    const streamRef = useRef();
    const [facingMode, setFacingMode] = useState('environment'); // default kamera belakang
    
    const isPcOrLaptop = () => {
        return !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    };

    const startCamera = (mode = 'environment') => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }

        navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } })
            .then((stream) => {
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            })
            .catch((err) => {
                console.error("Gagal akses kamera:", err);
                alert("Tidak dapat membuka kamera. Mohon cek izin browser atau device!");
            });
    };

    useEffect(() => {
        startCamera(facingMode);

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [facingMode]);

    useImperativeHandle(ref, () => ({
        stopCamera: () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        },
        swapCamera: () => {
            setFacingMode((prev) => prev === 'user' ? 'environment' : 'user');
        }
    }));

    return (
        <div style={{ width: '100%', maxWidth: '400px', borderRadius: '15px', overflow: 'hidden' }}>
            <video 
                ref={videoRef} 
                style={{ 
                    width: '100%', 
                    transform: (facingMode === 'user' || isPcOrLaptop()) ? 'scaleX(-1)' : 'none' 
                }} 
            />
        </div>
    );
});

export const CardPopUp = (props) => {
    const {
        open = false,
        image,
        children = "",
        borderColor,
        buttons = [],
    } = props;

    if (!open) return null; // Tidak tampil kalau tidak dibuka

    return (
        <div className="popup-overlay">
            <div className="popup-card" style={{ borderColor: borderColor }}>
                {/* Gambar */}
                {image && (
                    <img
                        src={image}
                        alt="popup-img"
                        style={{
                            width: 95, height: 95,
                            margin: "0 auto 24px auto", display: "block"
                        }}
                        draggable={false}
                    />
                )}

                {/* Teks */}
                <div style={{ 
                        marginTop: 5, 
                        marginBottom: 30, 
                        fontSize: 18, 
                        color: "#000", 
                        fontWeight: "bold",
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-line',
                        maxWidth: '100%',
                    }}
                >
                    {children}
                </div>

                {/* Tombol */}
                <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                    {buttons.map((btn, idx) => (
                        <button
                            key={idx}
                            className="popup-button"
                            style={{
                                background: btn.bgColor || '#000',
                                color: btn.textColor || '#FFF',
                                borderColor: btn.borderColor || '#FFF',
                            }}
                            onClick={btn.onClick}
                            autoFocus={btn.autoFocus}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};