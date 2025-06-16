import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Plants from './components/Plants';
import Profile from './components/Profile';
import Forum from './components/Forum';
// Import the logout function from api.js
import { logout, fetchUserProfile } from './services/api';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem('token'); // Check localStorage for token

            if (!token) {
                // If no token, clearly not logged in
                console.log('No token found in localStorage. User is not logged in.');
                setIsLoggedIn(false);
                setLoading(false);
                return;
            }

            try {
                // Try to fetch profile to validate the token on the backend
                // The fetchUserProfile function now handles sending the token in Authorization header
                const profileData = await fetchUserProfile();
                // If profile data is returned without error, token is valid and user is logged in
                console.log('Token is valid. User is logged in.');
                setIsLoggedIn(true);
            } catch (err) {
                // If profile fetch fails (e.g., 401/403 due to invalid/expired token),
                // it means the token is no longer valid.
                console.error('Token validation failed:', err.message);
                localStorage.removeItem('token'); // Clear invalid token
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    // Function to handle logout from anywhere (e.g., Navbar)
    const handleLogout = () => {
        logout(); // Call the logout function from api.js
        setIsLoggedIn(false);
        // Optionally navigate to home or login page after logout
        // navigate('/'); // You would need useNavigate here if not in App component
    };


    if (loading) return <div>Loading...</div>;

    return (
        <Router>
            {/* Pass handleLogout to Navbar if it has a logout button */}
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/plants" element={<Plants />} />
                <Route
                    path="/forum"
                    element={
                        isLoggedIn ? (
                            <Forum isLoggedIn={isLoggedIn} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/profile"
                    element={
                        isLoggedIn ? (
                            // Pass setIsLoggedIn to Profile so it can update auth state on logout
                            <Profile setIsLoggedIn={setIsLoggedIn} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                {/* Pass setIsLoggedIn to Login and Register to update state on successful auth */}
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
        </Router>
    );
};

export default App;
