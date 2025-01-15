import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../services/api';
import '../styles.css';

const Profile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail'); // Retrieve email
        console.log('Retrieved email from local storage:', email); // Debugging log
        if (email) {
            fetchUserProfile(email)
                .then(data => {
                    console.log('User profile data:', data); // Debugging log
                    setUser(data);
                })
                .catch(err => {
                    console.error('Error fetching profile:', err.message); // Debugging log
                    setError(err.message);
                });
        } else {
            setError('No user logged in');
        }
    }, []);

if (error) {
    return <div>Error: {error}</div>;
}

if (!user) {
    return <div>Loading...</div>;
}

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <h1>Profile</h1>

      <div className="profile-details">
        <p>
          <strong>Name:</strong>{user.username}
        </p>
        <p>
          <strong>Email:</strong>{user.email}
        </p>
      </div>

      <div className="logout-button">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
