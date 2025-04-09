const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/recommendations', async (req, res) => {
  const { occasion, age, interests } = req.body;

  try {
    const interestList = Array.isArray(interests)
      ? interests.join(', ')
      : typeof interests === 'string'
      ? interests
      : '';

    const prompt = `Suggest 3 personalized gift ideas for a ${age}-year-old who enjoys ${interestList}, for the occasion: ${occasion}.`;

    console.log("Generated prompt:", prompt);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = completion.data.choices[0].message.content;
    res.status(200).json({ recommendations: responseText });

  } catch (error) {
    console.error('AI error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Something went wrong',
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
