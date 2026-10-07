const express = require('express');
const Website = require('../models/Website');
const router = express.Router();

// Fetch a website
router.get('/:id', async (req, res) => {
    try {
        const website = await Website.findById(req.params.id);
        res.json(website);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Save website
router.put('/:id', async (req, res) => {
    try {
        const website = await Website.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(website);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Publish website (Mock)
router.post('/publish/:id', async (req, res) => {
    res.json({ url: `https://yourdomain.com/${req.params.id}` });
});

module.exports = router;
