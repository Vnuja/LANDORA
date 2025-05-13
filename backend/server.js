require('dotenv').config();
require("./GeminiApi");
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const exportUserRoutes = require("./Routes/Export/exportUserRoutes");
const exportmRequestRoutes = require("./Routes/Export/exportmRequestRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || '*' })); // Adjust CLIENT_URL in .env



// Import routes
const userRoutes = require('./Routes/UserRoutes');
const authRoutes = require('./Routes/AuthRoutes');
const router = require('./router');
const MaintanancneRoutes = require('./Routes/mRequestRoutes');
const SalesRoutes = require('./Routes/SalesRoutes');
const PropertyRoutes = require('./Routes/PropertyRoutes');

// Route middleware
app.use('/maintenance', MaintanancneRoutes);
app.use('/sales', SalesRoutes);
app.use('/properties', PropertyRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
// Define a route handler for '/api' endpoint
app.use('/api', router);
app.use('/api/export/user', exportUserRoutes);
app.use('/api/export/requests', exportmRequestRoutes);
// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1); // Exit process if DB fails
    }
};

// Start the server after DB connection
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});



