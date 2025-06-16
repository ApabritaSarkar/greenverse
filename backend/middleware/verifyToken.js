const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log('--- verifyToken Middleware Started ---');

    // ✅ Now, we get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expects format: "Bearer <TOKEN>"

    if (!token) {
        console.log('🚫 Access denied. No token found in Authorization header.');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        console.log('✅ Token found:', token);
        console.log('JWT_SECRET being used for verification:', process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('🔓 Token decoded successfully. Decoded payload:', decoded);
        req.userId = decoded.id; // Populate req.userId
        console.log('--- verifyToken Middleware Finished ---');
        next();
    } catch (err) {
        console.error('❌ Token verification failed:', err.message); // Log the specific JWT error
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
