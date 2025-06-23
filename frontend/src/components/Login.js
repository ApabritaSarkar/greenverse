import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authApi'; // Ensure this path is correct

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true); // Set loading to true on form submission
        try {
            await loginUser(email, password);
            setIsLoggedIn(true);
            navigate('/profile'); // Redirect to profile page on successful login
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false); // Set loading to false after success or failure
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-eco-offwhite p-4 pt-20 font-roboto">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-eco-green mb-8 font-inter">Welcome Back!</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-eco-dark mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-eco-dark mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-eco-green to-eco-blue text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : null}
                        {isLoading ? 'Logging In...' : 'Login'}
                    </button>
                </form>
                {error && <p className="text-red-600 mt-4 text-sm text-center font-medium">{error}</p>}
                <p className="mt-6 text-center text-gray-600 text-sm">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-eco-green font-semibold hover:underline">
                        Register now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
