export async function fetchUserProfile(email) {
    const response = await fetch(`http://localhost:5000/api/profile?email=${email}`, {  // Use GET method with query parameter
        method: 'GET',  // Ensure it's GET
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch user profile');
    }
    return data;
}
