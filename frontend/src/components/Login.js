import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });

            if (response.status === 200) {
                const { username, email } = response.data;
                setIsLoggedIn(true); // Update login state
                setError(null);

                // Store the email in localStorage
                localStorage.setItem('userEmail', email);
                localStorage.setItem('username', username); // Store username locally
                navigate('/'); // Redirect to homepage or specified path
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
                    Register now
                </Link>
            </p>
        </div>
    );
};

export default Login;
