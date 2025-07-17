// SessionTimeOut.jsx
const SESSION_TIMEOUT = 3 * 60; // 3 jam

export const setLastActivity = () => {
  // Hitung waktu sekarang dalam menit (pembulatan ke bawah)
  const minutes = Math.floor(Date.now() / 1000 / 60);
  localStorage.setItem('lastActivity', minutes);
};

export const isSessionActive = () => {
  const last = parseInt(localStorage.getItem('lastActivity'), 10);
  const nowMinutes = Math.floor(Date.now() / 1000 / 60);

  if (!last) {
    return false;
  } else if ((nowMinutes - last) < SESSION_TIMEOUT) {
    return true;
  } else {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('lastActivity');
  localStorage.removeItem('role');
  window.location.href = '/';
};