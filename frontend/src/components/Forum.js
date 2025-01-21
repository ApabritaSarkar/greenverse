import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/forum.css';

const Forum = ({ isLoggedIn }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [searchTerm, setSearchTerm] = useState('');

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
                author: username,
            });

            setPosts([response.data, ...posts]);
            setNewPost({ title: '', content: '' });
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

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
            <div><h2 className="forum-title">Welcome to the Forum</h2>
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
                />
                <button type="submit" className="form-submit-button">Add Post</button>
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
                            post.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            </div>

            
        </div>
        </div>
    );
};

export default Forum;
