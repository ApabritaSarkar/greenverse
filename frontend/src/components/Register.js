import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Removed axios, using native fetch
// import axios from 'axios';
import '../styles/auth.css';

const Register = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [message, setMessage] = useState(''); // For success messages like "OTP sent!"
    const [error, setError] = useState(''); // For error messages
    const navigate = useNavigate();

    // Base URL for API requests
    const API_BASE = 'http://localhost:5000/api';

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setMessage(''); // Clear previous messages

        try {
            const response = await fetch(`${API_BASE}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed. Please try again.');
            }

            setMessage(data.message || 'Registration in progress... OTP sent!');
            setIsOtpSent(true); // Show OTP field after successful registration request
        } catch (err) {
            console.error('Registration error:', err.message);
            setError(err.message || 'Registration failed. Please try again.');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setMessage(''); // Clear previous messages

        try {
            const response = await fetch(`${API_BASE}/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'OTP verification failed. Please try again.');
            }

            setMessage(data.message || 'OTP verified. User registered and logged in.');

            // ✅ Store the token from the response in localStorage
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            setIsLoggedIn(true); // Update global login state
            navigate('/profile'); // Redirect to profile after successful OTP verification and login
        } catch (err) {
            console.error('OTP verification error:', err.message);
            setError(err.message || 'OTP verification failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <h2 className="auth-heading">Register</h2>
                {message && <p className="auth-success-message">{message}</p>}
                {error && <p className="auth-error">{error}</p>}

                {!isOtpSent ? (
                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="auth-input"
                            required
                        />
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
                        <button type="submit" className="auth-button">Register</button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <h3 className="auth-heading">Enter OTP sent to your email:</h3>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="auth-input"
                            required
                        />
                        <button type="submit" className="auth-button">Verify OTP</button>
                    </form>
                )}
                <p>
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">Login now</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
