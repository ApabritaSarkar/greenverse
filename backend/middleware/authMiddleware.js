const User = require('../models/User'); // Adjust path as needed

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        // User is authenticated
        next(); // Proceed to the next middleware/route handler
    } else {
        // User is not authenticated
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { isAuthenticated };

