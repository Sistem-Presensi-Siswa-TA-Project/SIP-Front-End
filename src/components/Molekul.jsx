// Filename: Molekul.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iconList } from '../data/iconData.js';

export const Header = ({ children='As User' }) => {
  const logo = iconList.find((i) => i.label === 'Logo')?.src;
  const navigate = useNavigate();

  return (
    <header className="header-bar animate-slide-down">
      <div className="header-container">
            <img src={logo} alt="Logo" className="header-logo" />

            <h5
                className="header-title"
                onClick={() => navigate('/guru')}
            >
                SMP Plus Babussalam
            </h5>

            {/* Elemen children di sisi kanan */}
            {children && (
                <span style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginLeft: 'auto',
                    marginRight: '30px',
                }}>
                    {children}
                </span>
            )}
        </div>
    </header>
  );
};

export const Sidebar = ({ onClose }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [hoveredSubitem, setHoveredSubitem] = useState(null);
    const navigate = useNavigate();

    const sidebarMenu = [
        { label: 'Minimize', icon: 'Back Icon Black' },
        { label: 'Beranda', icon: 'Dashboard Icon' },
        { label: 'Profil', icon: 'Profile Icon' },
        { label: 'Lihat Presensi', icon: 'Presensi Icon' },
        { label: 'Cetak Presensi', icon: 'Cetak Icon' },
        { label: 'Jadwal', icon: 'Jadwal Icon' },
        { label: 'Lainnya', icon: 'Lainnya Icon Black', hasDropdown: true },
    ];

    const dropdownItems = [
        { label: 'Kontak', icon: 'Kontak Icon' },
        { label: 'Informasi', icon: 'Informasi Icon' },
        { label: 'Logout', icon: 'Logout Icon' },
    ];

    const pathMap = {
        Beranda: '/guru',
        Profil: '/profile',
        'Lihat Presensi': '/daftar-kelas',
        'Cetak Presensi': '/cetak-presensi',
        Jadwal: '/jadwal',
        Kontak: '/kontak',
        Informasi: '/informasi',
        Logout: '/',
    };

    const rightArrow = iconList.find((i) => i.label === 'Right Arrow White')?.src;
    const leftArrow = iconList.find((i) => i.label === 'Left Arrow White')?.src;
    const arrowDownWhite = iconList.find((i) => i.label === 'Arrow Down White')?.src;
    const arrowDownBlack = iconList.find((i) => i.label === 'Arrow Down Black')?.src;

    return (
        <aside className={`sidebar animate-sidebar ${isDropdownOpen ? 'sidebar-expanded' : ''}`}>
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
                                            />
                                        ) : (
                                            <img src={icon} alt="Minimize" className="sidebar-icon" />
                                        )
                                    ) : item.hasDropdown ? (
                                        isHovered ? (
                                            <span className="sidebar-icon-placeholder" />
                                        ) : (
                                            <img src={icon} alt={item.label} className="sidebar-icon" />
                                        )
                                    ) : (
                                        isHovered ? (
                                            <span className="sidebar-icon-placeholder" />
                                        ) : (
                                            <img src={icon} alt={item.label} className="sidebar-icon" />
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
                                    />
                                )}

                                {!item.hasDropdown && item.label !== 'Minimize' && isHovered && (
                                    <img
                                        src={rightArrow}
                                        alt="Hover Arrow"
                                        width="18"
                                        height="18"
                                        style={{ marginLeft: 'auto' }}
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
                                                    if (pathMap[sub.label]) {
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
                                                        <img src={subIcon} alt={sub.label} className="sidebar-icon" />
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
        to,
    } = props;

    const navigate = useNavigate();
    const arrowRightIcon = iconList.find(i => i.label === 'Arrow Right Black')?.src;

    return (
        <div className="card-presensi">
            {/* Header */}
            <div className="card-presensi-header">
                <h5 className="card-presensi-title"> {namaKelas} </h5>
            </div>

            {/* Body */}
            <div className="card-presensi-body d-flex flex-column gap-1">
                <span className="text-secondary"> {tahunAjar} </span>

                <div className="d-flex justify-content-between align-items-center">
                    <span className="text-secondary"> Jumlah Siswa </span>
                    <span className="text-dark fw-bold"> {totalSiswa} </span>
                </div>
            </div>

            {/* Footer */}
            <div className="card-presensi-footer" onClick={() => navigate(to)}>
                <span className="fw-bold"> Lihat Detail </span>
                <img src={arrowRightIcon} alt="Lihat Detail" width="20" height="20" className="ms-2" />
            </div>
        </div>
    );
};