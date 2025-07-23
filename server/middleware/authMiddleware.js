// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema'); // Or wherever your user model is

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch the user from DB
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // ✅ Attach to req.user
    req.user = user;

    console.log('✅ req.user from DB:', req.user);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = requireAuth;
