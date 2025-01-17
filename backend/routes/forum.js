const express = require('express');
const router = express.Router();
const ForumPost = require('../models/ForumPost');

// Fetch all posts
router.get('/forum', async (req, res) => {
    try {
        const posts = await ForumPost.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
});

// Add a new post
router.post('/forum', async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newPost = new ForumPost({ title, content, author });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
});

module.exports = router;
