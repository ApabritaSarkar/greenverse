import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, addPlant, logout } from '../services/profileApi';
import '../styles/profile.css';

const Profile = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [plantName, setPlantName] = useState('');
    const [datePlanted, setDatePlanted] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        // Now fetchUserProfile will use the Authorization header automatically
        fetchUserProfile()
            .then(data => setUser(data))
            .catch(err => {
                console.error("Error fetching profile:", err);
                setError('You must be logged in to view profile. ' + err.message);
                // If token is invalid or expired, clear it and redirect
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                navigate('/login');
            });
    }, [navigate, setIsLoggedIn]); // Add navigate and setIsLoggedIn to dependency array

    const handleLogout = async () => {
        try {
            logout();
            setIsLoggedIn(false);
            navigate('/');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const handleAddPlant = (e) => {
        e.preventDefault();

        if (!plantName || !datePlanted || !status) {
            console.warn('Please fill out all fields for the plant.');
            return;
        }

        const newPlant = {
            // userId is no longer needed here, backend will get it from the token
            name: plantName,
            datePlanted,
            status,
        };

        addPlant(newPlant)
            .then(data => {
                console.log('Plant added successfully!', data.plant);
                setUser(prev => ({
                    ...prev,
                    plants: [...(prev.plants || []), data.plant], // Ensure plants is an array
                }));
                setPlantName('');
                setDatePlanted('');
                setStatus('');
            })
            .catch(err => {
                console.error("Error adding plant:", err);
                setError('Failed to add plant: ' + err.message);
            });
    };

    if (error) return <div className="error-message">{error}</div>;
    if (!user) return <div className="loading-message">Loading user profile...</div>;

    return (
        <div className="profile-container">
            <h1>Profile</h1>

            <div className="profile-details">
                <p><strong>Name:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>

            <div className="owned-plants">
                <h2>Owned Plants</h2>
                {user.plants && user.plants.length > 0 ? (
                    <ul>
                        {user.plants.map((plant) => (
                            <li key={plant._id}>
                                <strong>{plant.name}</strong> - Planted on {new Date(plant.datePlanted).toLocaleDateString()} ({plant.status})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No plants owned yet.</p>
                )}
            </div>

            <div className="add-plant-section">
                <h2>Add a New Plant</h2>
                <form onSubmit={handleAddPlant} className="add-plant-form">
                    <div className="form-group">
                        <label>Plant Name:</label>
                        <input type="text" value={plantName} onChange={(e) => setPlantName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Date Planted:</label>
                        <input type="date" value={datePlanted} onChange={(e) => setDatePlanted(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                    </div>
                    <button type="submit" className="add-plant-button">Add Plant</button>
                </form>
            </div>

            <div className="logout-button">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;
