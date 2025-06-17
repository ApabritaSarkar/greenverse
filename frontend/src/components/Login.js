import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';
import { loginUser } from '../services/authApi'; // ✅ use API functions

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await loginUser(email, password);
            setIsLoggedIn(true);
            console.log('login successful');
            navigate('/profile');
        } catch (err) {
            console.error('Login error:', err.message);
            setError(err.message || 'Login failed.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <h2 className="auth-heading">Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" required />
                    <button type="submit" className="auth-button">Login</button>
                </form>
                {error && <p className="auth-error">{error}</p>}
                <p>Don't have an account? <Link to="/register" className="auth-link">Register now</Link></p>
            </div>
        </div>
    );
};

export default Login;
