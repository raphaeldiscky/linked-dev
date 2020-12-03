const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();

// Init app variable with express
const app = express();

// Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/api/auth')); // login dan load user endpoint
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users')); // register endpoint

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => res.send('API Running'));
}

// Set port to PORT or 5000
const PORT = process.env.PORT || 5000;

// Create web server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
