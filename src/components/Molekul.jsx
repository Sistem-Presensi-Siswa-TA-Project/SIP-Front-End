// Filename: Molekul.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { iconList } from '../data/iconData.js';

export const Header = () => {
  const logo = iconList.find((i) => i.label === 'Logo')?.src;

  return (
    <header className="header-bar">
      <div className="header-container">
            <img src={logo} alt="Logo" className="header-logo" />

            <h5 className="header-title"> SMP Plus Babussalam </h5>
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
        { label: 'Dashboard', icon: 'Dashboard Icon' },
        { label: 'Profile', icon: 'Profile Icon' },
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
        Dashboard: '/admin',
        Profile: '/profile',
        'Lihat Presensi': '/presensi',
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
        <aside className={`sidebar ${isDropdownOpen ? 'sidebar-expanded' : ''}`}>
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
                                                width="18"
                                                height="18" 
                                                alt="Minimize" 
                                                className="sidebar-icon" />
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
            className={`custom-card ${className}`}
            style={{ width, height, ...style }}
            {...rest}
        >
            {children}
        </div>
    );
};