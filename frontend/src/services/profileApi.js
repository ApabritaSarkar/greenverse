import { getToken } from './authApi';

const API_BASE = 'https://greenverse-c6jx.onrender.com/api';

export async function fetchUserProfile() {
    const token = getToken();
    if (!token) {
        throw new Error('No authentication token found. Please log in.');
    }

    const response = await fetch(`${API_BASE}/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch user profile');
    }

    return data;
}

export async function addPlant(plantData) {
    const token = getToken();
    if (!token) {
        throw new Error('No authentication token found. Please log in.');
    }

    const response = await fetch(`${API_BASE}/add-plant`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(plantData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Unable to add plant');
    }

    return data;
}

export function logout() {
    localStorage.removeItem('token');
}
