// Filename: UserHandler.jsx

import axios from 'axios';

const API = 'https://backend.ajwan.xyz';

export async function getUserById(idUser) {
    try {
        const response = await axios.get(`${API}/api/users/${idUser}`);

        // Jika data adalah array, ambil elemen pertama
        if (Array.isArray(response.data.data)) {
            return response.data.data[0] || null;
        }
        
        return response.data.data || null;
    } catch (error) {
        console.error("Gagal mengambil data user:", error);
        return null;
    }
}

export async function getUserByRole(role) {
    const response = await axios.get(`${API}/api/users/role/${role}`);

    if (response.status !== 200) {
        throw { code: 'GET_USER_ROLE_FAILED', message: response.data?.message || 'Gagal mengambil user by role' };
    }

    // return { message, data: [...] }
    return response.data.data || [];
}

export async function getUserByUsername(username) {
    const response = await axios.get(`${API}/api/users/username/${username}`);

    if (response.status !== 200) {
        throw { code: 'GET_USER_USERNAME_FAILED', message: response.data?.message || 'Gagal mengambil user by username' };
    }

    // Return data user
    const data = response.data.data;
    if (Array.isArray(data)) {
        // Kalau array, ambil index ke 0
        return data[0] || null;
    }
    return data || null;
}

export async function createUser(userData) {
    const response = await axios.post(
        `${API}/api/users/`,
        userData
    );

    if (response.status !== 201) {
        throw { code: 'GET_USER_ROLE_FAILED', message: response.data?.message || 'Gagal mengambil user by role' };
    }

    // return { message, data: [...] }
    return response.data.data || [];
}

export async function updateUserById(idUser, userData) {
    try {
        const response = await axios.put(
            `${API}/api/users/${idUser}`,
            userData
        );

        if (response.status !== 200) {
            throw { code: 'UPDATE_USER_FAILED', message: response.data?.message || 'Gagal memperbarui data user' };
        }

        // Return data { message, data: {...} }
        return response.data;
    } catch (error) {
        // Menampilkan error di konsol dan lempar error supaya bisa di-handle di komponen pemanggil
        console.error("Gagal mengupdate data user:", error);
        throw { code: 'UPDATE_USER_FAILED', message: error.response?.data?.message || 'Gagal memperbarui data user' };
    }
}

export async function updatePasswordById(idUser, newPassword) {
    try {
        const response = await axios.put(
            `${API}/api/users/password/${idUser}`,
            { password: newPassword }
        );

        if (response.status !== 200) {
            throw { code: 'UPDATE_PASSWORD_FAILED', message: response.data?.message || 'Gagal mengupdate password user' };
        }

        return response.data;
    } catch (error) {
        console.error("Gagal mengupdate password user:", error);
        throw { code: 'UPDATE_PASSWORD_FAILED', message: error.response?.data?.message || 'Gagal mengupdate password user' };
    }
}

export async function resetPasswordById(idUser) {
    try {
        const response = await axios.put(
            `${API}/api/users/reset-password/${idUser}`
        );

        if (response.status !== 200) {
            throw { code: 'RESET_PASSWORD_FAILED', message: response.data?.message || 'Gagal mereset password user' };
        }

        // response: { message: "...", data: { ... } }
        return response.data;
    } catch (error) {
        console.error("Gagal mereset password user:", error);
        throw { code: 'RESET_PASSWORD_FAILED', message: error.response?.data?.message || 'Gagal mereset password user' };
    }
}

export async function deleteUserById(idUser) {
    const response = await axios.delete(`${API}/api/users/${idUser}`);

    if (response.status !== 200) {
        throw { code: 'GET_USER_ROLE_FAILED', message: response.data?.message || 'Gagal mengambil user by role' };
    }

    // return { message, data: [...] }
    return response.data.data || [];
}

export async function deleteUserByUsername(username) {
    const response = await axios.delete(`${API}/api/users/username/${username}`);

    if (response.status !== 200) {
        throw { code: 'GET_USER_ROLE_FAILED', message: response.data?.message || 'Gagal mengambil user by role' };
    }

    // return { message, data: [...] }
    return response.data.data || [];
}