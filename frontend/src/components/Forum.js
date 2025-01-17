// src/components/Forum.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

const Forum = ({ isLoggedIn }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch the username from local storage
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/forum');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleAddPost = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/forum', {
                title: newPost.title,
                content: newPost.content,
                author: username, // Use username instead of email
            });

            setPosts([response.data, ...posts]); // Add the new post to the list
            setNewPost({ title: '', content: '' }); // Clear form
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    if (!isLoggedIn) {
        return (
            <div>
                <h1>Login to join the forum</h1>
                <p>
                    Please <Link to="/login">login</Link> to view and participate in the forum discussions.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h1>Forum</h1>

            {/* Search Section */}
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div>
                <h3>Discussion Posts</h3>
                <ul>
                    {posts
                        .filter((post) =>
                            post.title.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((post) => (
                            <li key={post._id}>
                                <h4>{post.title}</h4>
                                <p>{post.content}</p>
                                <small>
                                    By: {post.author} on{' '}
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </small>
                            </li>
                        ))}
                </ul>
            </div>

            <form onSubmit={handleAddPost}>
                <h3>Add a New Post</h3>
                <input
                    type="text"
                    placeholder="Post Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Write your post here..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    required
                />
                <button type="submit">Add Post</button>
            </form>
        </div>
    );
};

export default Forum;
