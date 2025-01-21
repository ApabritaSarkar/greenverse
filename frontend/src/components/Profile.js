import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, addPlant } from '../services/api';
import '../styles/profile.css';

const Profile = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [plantName, setPlantName] = useState('');
    const [datePlanted, setDatePlanted] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email) {
            fetchUserProfile(email)
                .then(data => setUser(data))
                .catch(err => setError(err.message));
        } else {
            setError('No user logged in');
        }
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.clear();
        navigate('/');
    };

    const handleAddPlant = (e) => {
        e.preventDefault();

        if (!plantName || !datePlanted || !status) {
            alert('Please fill out all fields.');
            return;
        }

        const newPlant = {
            userId: user._id, // Assuming user._id is available
            name: plantName,
            datePlanted,
            status,
        };

        addPlant(newPlant)
            .then(data => {
                alert('Plant added successfully!');
                setUser((prev) => ({
                    ...prev,
                    plants: [...prev.plants, data.plant], // Update the local state with the new plant
                }));
                setPlantName('');
                setDatePlanted('');
                setStatus('');
            })
            .catch(err => alert(err.message));
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>

            <div className="profile-details">
                <p>
                    <strong>Name:</strong> {user.username}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
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
            <input
                type="text"
                placeholder="Enter plant name"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Date Planted:</label>
            <input
                type="date"
                value={datePlanted}
                onChange={(e) => setDatePlanted(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Status:</label>
            <input
                type="text"
                placeholder="e.g., Healthy"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />
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