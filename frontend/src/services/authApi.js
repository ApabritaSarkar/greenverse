const API_BASE = 'https://greenverse-c6jx.onrender.com/api';

// Helper to get token from localStorage
const getToken = () => localStorage.getItem('token');

export { getToken }; // Exported to be reused in profileapi.js

export async function loginUser(email, password) {
    const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }

    if (data.token) {
        localStorage.setItem('token', data.token);
    }

    return data;
}

export async function registerUser(username, email, password) {
    const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
    }

    return data;
}

export async function verifyOtp(email, otp) {
    const response = await fetch(`${API_BASE}/verify-otp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
    }

    if (data.token) {
        localStorage.setItem('token', data.token);
    }

    return data;
}
