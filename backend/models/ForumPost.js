const mongoose = require('mongoose');

const forumPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true }, // Store username
    createdAt: { type: Date, default: Date.now },
});

const ForumPost = mongoose.model('ForumPost', forumPostSchema);

module.exports = ForumPost;
