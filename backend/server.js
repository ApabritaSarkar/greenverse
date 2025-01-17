const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const forumRoutes = require('./routes/forum');

require('dotenv').config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes); // Route all API requests to `auth.js`
app.use('/api', forumRoutes);
// app.use('/api/ownedplants', ownedPlantRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
