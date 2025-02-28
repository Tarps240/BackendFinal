const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend origin
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blogapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

    // Routes
    const authRoutes = require('./routes/authRoutes');
    const postRoutes = require('./routes/postRoutes');
    app.use('/api/auth', authRoutes);
    app.use('/api/posts', postRoutes);

    // Start server
    app.listen(5000, () => console.log('Server running on port 5000'))