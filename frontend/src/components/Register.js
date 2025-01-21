import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios'; 
import '../styles/auth.css';

const Register = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', { username, email, password });
            setIsOtpSent(true);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Registration failed. Please try again.');
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
            setIsLoggedIn(true);
            navigate('/');
        } catch (err) {
            setError('OTP verification failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <h2 className="auth-heading">Register</h2>
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
                {error && <p className="auth-error">{error}</p>}
                <p>
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">Login now</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
