import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, addPlant, logout } from '../services/profileApi';

const Profile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [plantName, setPlantName] = useState('');
  const [datePlanted, setDatePlanted] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchUserProfile()
      .then((data) => setUser(data))
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setError('You must be logged in to view profile. ' + err.message);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
      });
  }, [navigate, setIsLoggedIn]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleAddPlant = (e) => {
    e.preventDefault();
    if (!plantName || !datePlanted || !status) return;

    const newPlant = { name: plantName, datePlanted, status };

    addPlant(newPlant)
      .then((data) => {
        setUser((prev) => ({
          ...prev,
          plants: [...(prev.plants || []), data.plant],
        }));
        setPlantName('');
        setDatePlanted('');
        setStatus('');
      })
      .catch((err) => {
        setError('Failed to add plant: ' + err.message);
      });
  };

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-center p-6">
        {error}
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-center p-6">
        Loading user profile...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Your Profile</h1>

      {/* Profile Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">User Information</h2>
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* Owned Plants */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Owned Plants</h2>
        {user.plants && user.plants.length > 0 ? (
          <ul className="space-y-3">
            {user.plants.map((plant) => (
              <li key={plant._id} className="bg-green-50 p-3 rounded-lg shadow-sm">
                <strong>{plant.name}</strong> — Planted on{' '}
                {new Date(plant.datePlanted).toLocaleDateString()} (
                {plant.status})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No plants owned yet.</p>
        )}
      </div>

      {/* Add Plant Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add a New Plant</h2>
        <form onSubmit={handleAddPlant} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Plant Name</label>
            <input
              type="text"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Date Planted</label>
            <input
              type="date"
              value={datePlanted}
              onChange={(e) => setDatePlanted(e.target.value)}
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Status</label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
          >
            Add Plant
          </button>
        </form>
      </div>

      {/* Logout */}
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
