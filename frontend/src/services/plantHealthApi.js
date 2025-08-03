const API_BASE = 'https://greenverse-c6jx.onrender.com/api';

const getToken = () => localStorage.getItem('token');

export async function fetchHealthOverview() {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');
  
  const response = await fetch(`${API_BASE}/plants/health-overview`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch health overview');
  }
  
  return response.json();
}

export async function fetchCareReminders() {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');
  
  const response = await fetch(`${API_BASE}/plants/care-reminders`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch care reminders');
  }
  
  return response.json();
}

export async function logCareAction(plantId, action, notes = '') {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');
  
  const response = await fetch(`${API_BASE}/plants/${plantId}/care-log`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ action, notes })
  });
  
  if (!response.ok) {
    throw new Error('Failed to log care action');
  }
  
  return response.json();
}

export async function updatePlantHealth(plantId, healthData) {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');
  
  const response = await fetch(`${API_BASE}/plants/${plantId}/health`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(healthData)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update plant health');
  }
  
  return response.json();
}

export async function updateCareSchedule(plantId, scheduleData) {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');
  
  const response = await fetch(`${API_BASE}/plants/${plantId}/care-schedule`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(scheduleData)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update care schedule');
  }
  
  return response.json();
}

export async function fetchPlantHealthDetails(plantId) {
  const token = getToken();
  if (!token) throw new Error('No authentication token found');
  
  const response = await fetch(`${API_BASE}/plants/${plantId}/health-details`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch plant health details');
  }
  
  return response.json();
}