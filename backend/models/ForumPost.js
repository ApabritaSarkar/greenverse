const mongoose = require("mongoose");

const forumPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, // Trim whitespace from the title
        minlength: 3, // Minimum length for title
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 10, // Minimum length for content
    },
    // ✅ Reference to the User who created the post
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to the 'User' model
        required: true,
    },
    // The author's username will be retrieved from the User model via population
    // We'll store it here for quick reference, but the canonical source is the User model
    author: {
        type: String, // This will store the username string
        required: true
    },
    // You can add more fields if needed, e.g., comments, likes, etc.
}, {
    timestamps: true // ✅ Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model("ForumPost", forumPostSchema);
