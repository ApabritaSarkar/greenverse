import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios'; 

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
      console.log(response.data); // Check server response
      setIsOtpSent(true); // Indicate that OTP has been sent
    } catch (err) {
      // Log the specific error response from the server
      if (err.response) {
        console.error('Server responded with an error:', err.response.data);
        setError(err.response.data.message || 'Registration failed. Please try again.'); // Adjust this line based on your backend's response
      } else {
        console.error('Error:', err.message);
        setError('Registration failed. Please try again.');
      }
    }
  };
  

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      // Step 2: Verify the OTP entered by the user
      const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
      console.log(response.data); // Check server response

      // If OTP verification is successful, redirect to home page
      setIsLoggedIn(true); // Update login state
      navigate('/');
    } catch (err) {
      setError('OTP verification failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {!isOtpSent ? (
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
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
          <button type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <h3>Enter OTP sent to your email:</h3>
          <input 
            type="text" 
            placeholder="Enter OTP" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            required 
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
                Already have an account?{" "}
                <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
                    Login now
                </Link>
            </p>
    </div>
  );
};

export default Register;
