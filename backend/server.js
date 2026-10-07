require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require('./routes/authRoutes');
const websiteRoutes = require('./routes/websiteRoutes');
const templateRoutes = require('./routes/templateRoutes');

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/templates', templateRoutes);

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error("❌ MongoDB URI is missing in .env file.");
    process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
    })
    .catch(err => console.error("❌ MongoDB Connection Error:", err));
