const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
    name: String,
    previewImage: String,
    structure: Object // JSON structure for the template
});

module.exports = mongoose.models.Template || mongoose.model('Template', TemplateSchema);
