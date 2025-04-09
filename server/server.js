const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const aiRoutes = require('./routes/aiRoutes');
const adminRoutes = require('./routes/adminRoutes');




// ✅ Only one proper CORS setup here:

const allowedOrigins = [
  'http://localhost:3000',
  'https://meek-paletas-395784.netlify.app', // ✅ actual live Netlify URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));





app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
console.log("✅ Mounting AI Routes at /api/ai");
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error('MongoDB connection error:', err));
