import React, { useState } from 'react';
// Removed axios, using native fetch
// import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Base URL for API requests
    const API_BASE = 'http://localhost:5000/api';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed. Please try again.');
            }

            // ✅ Store the token from the response in localStorage
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            setIsLoggedIn(true); // Update global login state
            setError(null); // Clear any login specific errors
            navigate('/profile'); // Redirect to profile or dashboard upon successful login
        } catch (err) {
            console.error('Login error:', err.message);
            setError(err.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <h2 className="auth-heading">Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input"
                        required
                    />
                    <button type="submit" className="auth-button">Login</button>
                </form>
                {error && <p className="auth-error">{error}</p>}
                <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="auth-link">Register now</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
