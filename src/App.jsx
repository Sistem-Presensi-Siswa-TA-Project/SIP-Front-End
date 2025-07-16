// Filename: App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { setLastActivity, isSessionActive, logout } from './utils/sessionTimeOut.js';
import AppRoutes from './router/AppRoutes.jsx';

function App() {
  useEffect(() => {
    const events = ['click', 'mousemove', 'keydown', 'scroll'];
    const activityHandler = () => setLastActivity();

    // Set aktivitas pertama kali
    setLastActivity();

    // Pasang event listener ke semua aktivitas
    events.forEach((event) => window.addEventListener(event, activityHandler));

    // Interval cek session timeout
    const interval = setInterval(() => {
      if (!isSessionActive()) {
        logout();
      }
    }, 60 * 1000); // cek tiap 1 menit

    return () => {
      events.forEach((event) => window.removeEventListener(event, activityHandler));
      clearInterval(interval);
    };
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;