const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const forumRoutes = require('./routes/forum');
const plantHealthRoutes = require('./routes/plantHealth');

require('dotenv').config();
connectDB();

const app = express();
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'https://greenverse.vercel.app', 'https://greenverse-ten.vercel.app']
}));


app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', forumRoutes);
app.use('/api/plants', plantHealthRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
