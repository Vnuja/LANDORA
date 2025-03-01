require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Import routes
const userRoutes = require('./Routes/UserRoutes');
const authRoutes = require('./Routes/AuthRoutes');

// Middleware
app.use(express.json()); // Ensure this is before your routes
app.use(cors()); // You can configure CORS options if needed

// Route middleware
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

const PORT = process.env.PORT || 4000;
const DB_URL = process.env.MONGODB_URL; // MongoDB URL from environment variables

// Connect to MongoDB
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.error('DB connection error:', err);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}!`);
});