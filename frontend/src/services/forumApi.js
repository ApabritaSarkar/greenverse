const API_BASE = 'https://greenverse-c6jx.onrender.com/api';

// Helper to get token from localStorage
const getToken = () => localStorage.getItem('token');

// Fetch all forum posts
export async function fetchForumPosts() {
    const token = getToken();
    if (!token) throw new Error('Authentication token not found.');

    const response = await fetch(`${API_BASE}/forum`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Error fetching posts.');
    }

    return data;
}

// Add a new post
export async function addForumPost(title, content) {
    const token = getToken();
    if (!token) throw new Error('Authentication token not found.');

    const response = await fetch(`${API_BASE}/forum`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Error adding post.');
    }

    return data;
}
