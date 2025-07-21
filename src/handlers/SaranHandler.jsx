// Filename: SaranHandler.jsx

import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export async function createSaran(saran) {
    const response = await axios.post(`${API}/api/saran`, saran);
    return response.data;
}