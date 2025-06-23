import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, verifyOtp } from '../services/authApi'; // Ensure this path is correct

const Register = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true); // Set loading to true
        try {
            const data = await registerUser(username, email, password);
            setMessage(data.message || 'OTP sent successfully! Please check your email.');
            setIsOtpSent(true);
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false); // Set loading to false
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true); // Set loading to true
        try {
            const data = await verifyOtp(email, otp);
            setMessage(data.message || 'OTP verified. You are now logged in!');
            setIsLoggedIn(true);
            navigate('/profile'); // Redirect to profile page on successful OTP verification
        } catch (err) {
            setError(err.message || 'OTP verification failed. Please check your OTP.');
        } finally {
            setIsLoading(false); // Set loading to false
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-eco-offwhite p-4 pt-20 font-roboto">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-eco-green mb-8 font-inter">Join GreenVerse</h2>
                
                {/* Message and Error Displays */}
                {message && (
                    <p className="bg-eco-lightgreen bg-opacity-20 text-eco-green text-sm text-center py-2 rounded-md mb-4 font-medium">
                        {message}
                    </p>
                )}
                {error && (
                    <p className="bg-red-100 text-red-700 text-sm text-center py-2 rounded-md mb-4 font-medium">
                        {error}
                    </p>
                )}

                {/* Registration Form (Conditional Render) */}
                {!isOtpSent ? (
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-eco-dark mb-1">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
                            />
                        </div>
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
                                placeholder="Create a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-eco-green to-eco-blue text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {isLoading ? 'Sending OTP...' : 'Register'}
                        </button>
                    </form>
                ) : (
                    // OTP Verification Form
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <h3 className="text-center font-semibold text-eco-dark text-lg mb-4">Enter OTP sent to {email}:</h3>
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-eco-dark mb-1">OTP Code</label>
                            <input
                                type="text"
                                id="otp"
                                placeholder="e.g., 123456"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-eco-green to-eco-blue text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {isLoading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>
                )}

                <p className="mt-6 text-center text-gray-600 text-sm">
                    {isOtpSent ? (
                        <>Didn't receive OTP? <span className="font-semibold text-eco-green cursor-pointer hover:underline" onClick={() => { setIsOtpSent(false); setMessage(''); setError(''); setOtp(''); }}>Resend</span></>
                    ) : (
                        <>Already have an account?{' '}
                            <Link to="/login" className="text-eco-green font-semibold hover:underline">
                                Login here
                            </Link>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Register;
