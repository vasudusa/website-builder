const express = require('express');
const router = express.Router();
const Website = require('../models/Website');

// Get website by ID
router.get('/:id', async (req, res) => {
    try {
        const website = await Website.findById(req.params.id);
        if (!website) return res.status(404).json({ error: 'Website not found' });
        res.json(website);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all websites (for Dashboard; in production, filter by user)
router.get('/', async (req, res) => {
    try {
        const websites = await Website.find();
        res.json(websites);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update website (save changes)
router.put('/:id', async (req, res) => {
    try {
        const website = await Website.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(website);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Publish website (simulate publishing)
router.post('/publish/:id', async (req, res) => {
    try {
        const website = await Website.findById(req.params.id);
        if (!website) return res.status(404).json({ error: 'Website not found' });
        const publishedUrl = `https://yourdomain.com/${website._id}`;
        res.json({ message: 'Website published successfully!', url: publishedUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
