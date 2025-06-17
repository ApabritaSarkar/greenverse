import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { registerUser, verifyOtp } from '../services/authApi'; // ✅ use API functions

const Register = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const data = await registerUser(username, email, password);
            setMessage(data.message || 'OTP sent!');
            setIsOtpSent(true);
        } catch (err) {
            console.error('Registration error:', err.message);
            setError(err.message || 'Registration failed.');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const data = await verifyOtp(email, otp);
            setMessage(data.message || 'OTP verified. Logged in.');

            setIsLoggedIn(true);
            navigate('/profile');
        } catch (err) {
            console.error('OTP verification error:', err.message);
            setError(err.message || 'OTP verification failed.');
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
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="auth-input" required />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" required />
                        <button type="submit" className="auth-button">Register</button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <h3 className="auth-heading">Enter OTP sent to your email:</h3>
                        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="auth-input" required />
                        <button type="submit" className="auth-button">Verify OTP</button>
                    </form>
                )}
                <p>Already have an account? <Link to="/login" className="auth-link">Login now</Link></p>
            </div>
        </div>
    );
};

export default Register;
