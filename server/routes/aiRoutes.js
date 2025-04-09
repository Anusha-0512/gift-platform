const express = require('express');
const router = express.Router();
const { CohereClient } = require("cohere-ai");
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');
const GiftSuggestion = require('../models/GiftSuggestion');
require('dotenv').config();

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// ✅ Save suggestion on generation
router.post('/recommendations', authenticate, authorizeRole('core', 'admin'), async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await cohere.generate({
      model: 'command',
      prompt: `Suggest a personalized gift for: ${prompt}`,
      max_tokens: 100,
      temperature: 0.8,
    });

    const suggestion = response.generations[0].text.trim();

    // ✅ Save to DB
    await GiftSuggestion.create({
      userId: req.user.userId, // make sure this is in JWT
      prompt,
      suggestion
    });

    res.status(200).json({ suggestion });
  } catch (error) {
    console.error('Cohere API Error:', error);
    res.status(500).json({ error: 'AI response failed', details: error.message });
  }
});

// ✅ Admin-only route to view suggestions of a user
router.get('/admin/user-suggestions/:userId', authenticate, authorizeRole('admin'), async (req, res) => {
  const { userId } = req.params;

  try {
    const suggestions = await GiftSuggestion.find({ userId }).sort({ createdAt: -1 });
    if (!suggestions || suggestions.length === 0) {
      return res.status(404).json({ message: 'No suggestions found for this user' });
    }
    res.status(200).json(suggestions);
  } catch (err) {
    console.error("Failed to get suggestions:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
