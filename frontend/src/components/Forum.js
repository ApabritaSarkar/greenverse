import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchForumPosts, addForumPost } from '../services/forumApi';
import '../styles/forum.css';

const Forum = ({ isLoggedIn }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            setError('');
            if (!isLoggedIn) return;

            try {
                const data = await fetchForumPosts();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                if (error.message.includes('401') || error.message.includes('403')) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    return;
                }
                setError(error.message || 'Failed to fetch forum posts.');
            }
        };

        fetchPosts();
    }, [isLoggedIn, navigate]);

    const handleAddPost = async (e) => {
        e.preventDefault();
        setError('');

        const { title, content } = newPost;
        if (!title || !content) {
            setError('Title and content cannot be empty.');
            return;
        }

        try {
            const newPostData = await addForumPost(title, content);
            setPosts([newPostData, ...posts]);
            setNewPost({ title: '', content: '' });
        } catch (error) {
            console.error('Error adding post:', error);
            if (error.message.includes('401') || error.message.includes('403')) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            setError(error.message || 'Failed to add post.');
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

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>

            <div className="forum-container">
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
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <li key={post._id} className="post-item">
                                    <h4 className="post-title">{post.title}</h4>
                                    <p className="post-content">{post.content}</p>
                                    <small className="post-meta">
                                        By: <span className="post-author">{post.author}</span> on{' '}
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </small>
                                </li>
                            ))
                        ) : (
                            <p className="no-posts-message">No posts found. Be the first to add one!</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Forum;
