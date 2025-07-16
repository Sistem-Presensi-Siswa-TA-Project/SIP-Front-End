// SessionTimeOut.jsx
const SESSION_TIMEOUT = 3 * 60 * 60 * 1000; // 3 jam dalam ms

export const setLastActivity = () => {
  localStorage.setItem('lastActivity', Date.now());
};

export const isSessionActive = () => {
  const last = parseInt(localStorage.getItem('lastActivity'), 10);
  if (!last) return false;
  return (Date.now() - last) < SESSION_TIMEOUT;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('lastActivity');
  window.location.href = '/';
};