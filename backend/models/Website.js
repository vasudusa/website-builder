const mongoose = require('mongoose');

const WebsiteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    pages: [
        { name: String, type: String, content: String }
    ],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.models.Website || mongoose.model('Website', WebsiteSchema);
