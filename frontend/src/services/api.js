const API_BASE = 'https://greenverse-c6jx.onrender.com/api';

// Helper to get token from localStorage
const getToken = () => localStorage.getItem('token');

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
    // Store token received from backend in localStorage
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
    return data; // No token received here, handled by verify-otp
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
            'Authorization': `Bearer ${token}`, // ✅ Send token in Authorization header
        },
        body: JSON.stringify(plantData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Unable to add plant');
    }
    return data;
}

// You might want a logout function that clears the token
export function logout() {
    localStorage.removeItem('token');
}
