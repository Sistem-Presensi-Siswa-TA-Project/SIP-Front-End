// Filename: ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isSessionActive, logout } from '../utils/sessionTimeOut.js';

const ProtectedRoute = ({ allowedRole, children }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role')?.toLowerCase();

    if (!token || !isSessionActive() || !userRole) {
        logout();
        return <Navigate to="/" replace />;
    }

    // Jika role user tidak sesuai, redirect ke halaman default role-nya
    if (allowedRole && userRole !== allowedRole) {
        // Redirect ke dashboard role masing-masing
        return <Navigate to={`/${userRole}`} replace />;
    }

    return children;
};

export default ProtectedRoute;