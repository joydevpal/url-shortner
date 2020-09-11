const mongoose = require("mongoose");

const urlShortenSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    urlCode: String,
    shortUrl: String,
    count: { type: Number, default: 0 },
    ipAddress: { type: [String], default: [] },
    country: { type: [String], default: [] },
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UrlShorten", urlShortenSchema);