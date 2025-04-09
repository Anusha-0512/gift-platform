require('dotenv').config();
const OpenAI = require('openai');

// Check if API key is loaded
console.log("🔑 OpenAI Key:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testPrompt() {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Say hello in a fun way' }],
    });

    console.log("✅ OpenAI Response:", completion.choices[0].message.content);
  } catch (error) {
    console.error("❌ OpenAI Error:", error.message || error);
  }
}

testPrompt();
