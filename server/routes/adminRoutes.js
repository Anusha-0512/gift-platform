// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');

// Get all users (Admin only)
router.get('/users', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});

// Delete user
router.delete('/users/:id', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
});

module.exports = router;
