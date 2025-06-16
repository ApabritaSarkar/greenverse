import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// Removed axios
// import axios from 'axios';
import '../styles/forum.css';

const Forum = ({ isLoggedIn }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(''); // State for forum-specific errors
    const navigate = useNavigate(); // Hook for navigation

    // Base URL for API requests
    const API_BASE = 'http://localhost:5000/api';

    // Helper to get token from localStorage
    const getToken = () => localStorage.getItem('token');

    // Function to fetch posts
    const fetchPosts = async () => {
        setError(''); // Clear previous errors
        const token = getToken();

        // If not logged in, or no token, don't try to fetch posts
        if (!isLoggedIn || !token) {
            // This case is already handled by the App.js route protection,
            // but it's good to have a local check here too.
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/forum`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // ✅ Send token in Authorization header
                },
            });

            const data = await response.json();

            if (!response.ok) {
                // If token is invalid/expired (e.g., 401, 403), clear token and redirect
                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    // setIsLoggedIn(false); // Prop from App.js to update global state if needed
                    navigate('/login'); // Redirect to login page
                    return; // Stop execution
                }
                throw new Error(data.message || 'Error fetching posts.');
            }
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setError(error.message || 'Failed to fetch forum posts.');
        }
    };

    useEffect(() => {
        // Fetch posts when component mounts or isLoggedIn state changes (after login/logout)
        fetchPosts();
    }, [isLoggedIn, navigate]); // Added isLoggedIn and navigate to dependency array

    const handleAddPost = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        const token = getToken();

        // Basic validation
        if (!newPost.title || !newPost.content) {
            setError('Title and content cannot be empty.');
            return;
        }
        if (!token) {
            setError('You must be logged in to add a post. Please log in again.');
            navigate('/login'); // Redirect to login
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/forum`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // ✅ Send token in Authorization header
                },
                body: JSON.stringify({
                    title: newPost.title,
                    content: newPost.content,
                    // 'author' is now handled by the backend, no longer sent from frontend
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                 if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    // setIsLoggedIn(false);
                    navigate('/login');
                    return;
                }
                throw new Error(data.message || 'Error adding post.');
            }

            // Add the new post to the state at the beginning of the array
            setPosts([data, ...posts]);
            setNewPost({ title: '', content: '' }); // Clear form fields
        } catch (error) {
            console.error('Error adding post:', error);
            setError(error.message || 'Failed to add post.');
        }
    };

    // Conditional rendering based on isLoggedIn prop
    if (!isLoggedIn) {
        return (
            <div className="forum-container">
                <h2 className="forum-title">Login to Join the Forum</h2>
                <p className="forum-login-prompt">
                    Please <Link to="/login" className="login-link">login</Link> to view and participate in forum discussions.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="forum-title">Welcome to the Forum</h2>
            <div className="forum-container">
                <form onSubmit={handleAddPost} className="add-post-form">
                    <h3 className="section-title">Add a New Post</h3>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Post Title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        required
                    />
                    <textarea
                        className="form-textarea"
                        placeholder="Write your post here..."
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        required
                    ></textarea>
                    <button type="submit" className="form-submit-button">Add Post</button>
                    {error && <p className="error-message">{error}</p>} {/* Display form-specific errors */}
                </form>
            </div>
            <div className="forum-container">
                {/* Search Section */}
                <input
                    type="text"
                    className="forum-search"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="forum-posts">
                    <h3 className="section-title">Discussion Posts</h3>
                    <ul className="posts-list">
                        {posts
                            .filter((post) =>
                                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                post.content.toLowerCase().includes(searchTerm.toLowerCase()) || // Also search content
                                post.author.toLowerCase().includes(searchTerm.toLowerCase()) // Also search author
                            )
                            .map((post) => (
                                <li key={post._id} className="post-item">
                                    <h4 className="post-title">{post.title}</h4>
                                    <p className="post-content">{post.content}</p>
                                    <small className="post-meta">
                                        By: <span className="post-author">{post.author}</span> on{' '}
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </small>
                                </li>
                            ))}
                    </ul>
                    {posts.length === 0 && !error && <p className="no-posts-message">No posts found. Be the first to add one!</p>}
                </div>
            </div>
        </div>
    );
};

export default Forum;
