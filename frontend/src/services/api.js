export async function fetchUserProfile(email) {
    const response = await fetch(`http://localhost:5000/api/profile?email=${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch user profile');
    }
    return data; // Will include `plants`
}

export async function addPlant(plantData) {
    const response = await fetch(`http://localhost:5000/api/add-plant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plantData),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Unable to add plant');
    }
    return data;
}

