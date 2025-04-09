const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');

router.post('/add', authenticate, authorizeRole('admin'), (req, res) => {
  res.json({ message: "Product added by admin" });
});

router.put('/update/:id', authenticate, authorizeRole('admin'), (req, res) => {
  res.json({ message: "Product updated by admin" });
});

router.delete('/delete/:id', authenticate, authorizeRole('admin'), (req, res) => {
  res.json({ message: "Product deleted by admin" });
});

module.exports = router;
