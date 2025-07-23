// routes/protectedRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ msg: 'Welcome to your dashboard!', userId: req.user.id });
});

module.exports = router;
