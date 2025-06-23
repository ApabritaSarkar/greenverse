import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, addPlant, logout } from '../../services/profileApi';
import UserInfo from './UserInfo';
import OwnedPlants from './OwnedPlants';
import AddPlantForm from './AddPlantForm';
import LogoutButton from './LogoutButton';

const Profile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [plantName, setPlantName] = useState('');
  const [datePlanted, setDatePlanted] = useState('');
  const [status, setStatus] = useState('');
  const [isAddingPlant, setIsAddingPlant] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setError('');

      try {
        const data = await fetchUserProfile();
        const normalizedUser = {
          ...data,
          plants: data.plants || [],
          profilePicture: data.profilePicture || 'https://placehold.co/150x150/9AE6B4/2D3748?text=User',
          bio: data.bio || 'No bio provided.',
          memberSince: data.memberSince || 'N/A',
          plantsOwned: data.plants?.length || 0
        };
        setUser(normalizedUser);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Failed to load profile.');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [navigate, setIsLoggedIn]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleAddPlant = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!plantName || !datePlanted || !status) {
      setError('Please fill in all plant details.');
      return;
    }

    setIsAddingPlant(true);
    const newPlant = { name: plantName, datePlanted, status };

    try {
      const data = await addPlant(newPlant);
      setUser((prev) => ({
        ...prev,
        plants: [...(prev.plants || []), { ...data, _id: data._id || `temp_${Date.now()}` }],
        plantsOwned: (prev.plantsOwned || 0) + 1
      }));
      setPlantName('');
      setDatePlanted('');
      setStatus('');
      setMessage('Plant added successfully!');
    } catch (err) {
      setError('Failed to add plant: ' + err.message);
    } finally {
      setIsAddingPlant(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-eco-offwhite pt-20">
        <div className="text-eco-green text-xl font-semibold">Loading user profile...</div>
      </div>
    );
  }

  if (!user && error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-eco-offwhite pt-20">
        <p className="text-red-600 text-center p-6">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-eco-offwhite p-4 pt-20 font-roboto">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 border border-gray-200">

        {/* General Messages */}
        {message && (
          <p className="bg-eco-lightgreen bg-opacity-20 text-eco-green text-sm text-center py-2 rounded-md mb-4 font-medium">
            {message}
          </p>
        )}
        {error && !message && (
          <p className="bg-red-100 text-red-700 text-sm text-center py-2 rounded-md mb-4 font-medium">
            {error}
          </p>
        )}

        <UserInfo user={user} />
        <OwnedPlants plants={user.plants} />
        <AddPlantForm
          plantName={plantName}
          datePlanted={datePlanted}
          status={status}
          isAddingPlant={isAddingPlant}
          setPlantName={setPlantName}
          setDatePlanted={setDatePlanted}
          setStatus={setStatus}
          handleAddPlant={handleAddPlant}
        />
        <LogoutButton handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Profile;
