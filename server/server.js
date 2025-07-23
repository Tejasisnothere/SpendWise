// server.js

require('dotenv').config(); // Load env variables first

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const path = require('path');
app.use(express.static(path.join(__dirname, '../client')));

// Middleware
app.use(express.json());

const protectedRoutes = require('./routes/protectedRoutes');
app.use('/api/protected', protectedRoutes);

const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/expenses', expenseRoutes);


// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
})
.catch((err) => console.error('❌ MongoDB connection failed:', err));
