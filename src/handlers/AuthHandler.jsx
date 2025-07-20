//Filename: AuthHandler.jsx

const API = import.meta.env.VITE_API_URL;

export async function loginUser(username, password) {

  const response = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw { code: 'AUTH_FAILED', message: data.message || 'Login gagal' };
  }

  // return data: { message, token, role }
  return data;
}