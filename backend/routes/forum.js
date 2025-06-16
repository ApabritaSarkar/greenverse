const express = require('express');
const router = express.Router();
const ForumPost = require('../models/ForumPost');
const User = require('../models/User'); // ✅ Import User model
const verifyToken = require('../middleware/verifyToken'); // ✅ Import verifyToken middleware

// Fetch all posts (protected)
// We populate the 'user' field and select only the 'username' from the User model
router.get('/forum', verifyToken, async (req, res) => { // ✅ Protect this route
    try {
        const posts = await ForumPost.find()
            .populate('user', 'username') // ✅ Populate the user field and get only the username
            .sort({ createdAt: -1 }); // Sort by creation date, newest first

        // Map the posts to include the author's username directly
        const formattedPosts = posts.map(post => ({
            _id: post._id,
            title: post.title,
            content: post.content,
            author: post.user ? post.user.username : 'Unknown', // Use populated username
            createdAt: post.createdAt,
            // Add other fields you want to expose
        }));

        res.json(formattedPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
});

// Add a new post (protected)
router.post('/forum', verifyToken, async (req, res) => { // ✅ Protect this route
    const { title, content } = req.body;
    const userId = req.userId; // ✅ Get userId from the authenticated token

    if (!title || !content) { // 'author' is no longer expected from frontend
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        // Fetch the user to get their username for the post
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Authenticated user not found.' });
        }

        const newPost = new ForumPost({
            title,
            content,
            user: userId, // ✅ Link the post to the user's ObjectId
            author: user.username, // ✅ Use the username from the fetched user
        });

        await newPost.save();

        // Optionally, populate the new post to return the same structure as GET /forum
        const populatedPost = await ForumPost.findById(newPost._id)
            .populate('user', 'username');

        const formattedNewPost = {
            _id: populatedPost._id,
            title: populatedPost.title,
            content: populatedPost.content,
            author: populatedPost.user ? populatedPost.user.username : 'Unknown',
            createdAt: populatedPost.createdAt,
        };

        res.status(201).json(formattedNewPost); // Return the formatted post
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
});

module.exports = router;
