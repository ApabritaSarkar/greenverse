import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchForumPosts, addForumPost } from '../services/forumApi'; // Your existing forum API functions
import { MessageSquareText, Search, UserCircle, MessageCircle, Send, LogIn, UserPlus } from 'lucide-react'; // Added LogIn and UserPlus icons

const Forum = ({ isLoggedIn }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [isAddingPost, setIsAddingPost] = useState(false); // Loading state for adding post
    const [isLoadingPosts, setIsLoadingPosts] = useState(true); // Loading state for fetching posts
    const navigate = useNavigate();

    // Effect to fetch forum posts when the component mounts or isLoggedIn status changes
    useEffect(() => {
        const fetchPosts = async () => {
            setError('');
            setIsLoadingPosts(true); // Set loading to true when starting fetch
            if (!isLoggedIn) {
                setIsLoadingPosts(false); // If not logged in, stop loading immediately
                return;
            }

            try {
                const data = await fetchForumPosts();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                // Handle authentication errors specifically
                if (error.message.includes('Authentication token not found') || error.message.includes('401') || error.message.includes('403')) {
                    localStorage.removeItem('token'); // Clear invalid token
                    navigate('/login'); // Redirect to login page
                    return; // Stop further execution
                }
                setError(error.message || 'Failed to fetch forum posts.');
            } finally {
                setIsLoadingPosts(false); // Always stop loading after fetch
            }
        };

        fetchPosts();
    }, [isLoggedIn, navigate]); // Dependencies: re-run if isLoggedIn or navigate changes

    // Handle submitting a new forum post
    const handleAddPost = async (e) => {
        e.preventDefault();
        setError('');
        setIsAddingPost(true); // Set loading for add post button

        const { title, content } = newPost;
        if (!title.trim() || !content.trim()) { // Use .trim() to check for empty strings with whitespace
            setError('Title and content cannot be empty.');
            setIsAddingPost(false); // Stop loading
            return;
        }

        try {
            // Assuming addForumPost returns the newly created post data
            const addedPost = await addForumPost(title, content); 
            setPosts([addedPost, ...posts]); // Add new post to the beginning of the list
            setNewPost({ title: '', content: '' }); // Clear form fields
            // Optionally, show a success message
            // setMessage('Post added successfully!');
        } catch (error) {
            console.error('Error adding post:', error);
            // Handle authentication errors if adding post fails
            if (error.message.includes('Authentication token not found') || error.message.includes('401') || error.message.includes('403')) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
            }
            setError(error.message || 'Failed to add post.');
        } finally {
            setIsAddingPost(false); // Always stop loading for add post button
        }
    };

    // Filter posts based on search term (case-insensitive)
    const filteredPosts = posts.filter((post) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            (post.title && post.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (post.content && post.content.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (post.author && post.author.toLowerCase().includes(lowerCaseSearchTerm)) // Assuming post object has 'author'
        );
    });

    // Conditional rendering for unauthenticated users
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-eco-offwhite font-roboto pt-20">
                <MessageSquareText size={80} className="text-eco-green mb-6 animate-bounce-slow" /> {/* Larger, animated icon */}
                <h2 className="text-4xl md:text-5xl font-bold text-eco-dark mb-4 font-inter leading-tight">
                    Join the GreenVerse Community Forum
                </h2>
                <p className="text-gray-700 text-lg max-w-lg mx-auto mb-8 leading-relaxed">
                    Connect with fellow plant enthusiasts, share your growing tips, ask questions, and dive into vibrant discussions about all things green.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link
                        to="/login"
                        className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
                    >
                        <LogIn size={20} />
                        <span>Login to Participate</span>
                    </Link>
                    <Link
                        to="/register"
                        className="bg-transparent border-2 border-eco-green text-eco-green px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-eco-green hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
                    >
                        <UserPlus size={20} />
                        <span>Create Account</span>
                    </Link>
                </div>
                {error && <p className="bg-red-100 text-red-700 text-sm text-center py-2 rounded-md font-medium max-w-sm mx-auto">{error}</p>}
            </div>
        );
    }

    // Main forum content for logged-in users
    return (
        <div className="min-h-screen bg-eco-offwhite p-4 pt-20 font-roboto">
            <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-eco-green mb-10 font-inter">GreenVerse Community Forum</h1>

                {/* Display general error or success messages */}
                {error && (
                    <p className="bg-red-100 text-red-700 text-sm text-center py-2 rounded-md mb-4 font-medium">
                        {error}
                    </p>
                )}
                {/* Removed general success message for now, as addPost has its own immediate feedback */}

                {/* Add New Post Form */}
                <form onSubmit={handleAddPost} className="bg-white shadow-xl rounded-xl p-6 mb-8 border border-gray-200">
                    <h3 className="text-2xl font-semibold text-eco-dark mb-5 font-inter border-b pb-3 border-eco-lightgreen flex items-center space-x-2">
                        <MessageSquareText size={24} className="text-eco-green" />
                        <span>Share Your Thoughts</span>
                    </h3>
                    <input
                        type="text"
                        placeholder="Catchy Post Title..."
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
                        required
                    />
                    <textarea
                        placeholder="Write your detailed post here..."
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 w-full flex items-center justify-center space-x-2"
                        disabled={isAddingPost}
                    >
                        {isAddingPost ? (
                            <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : <Send size={20} />}
                        <span>{isAddingPost ? 'Posting...' : 'Post to Forum'}</span>
                    </button>
                </form>

                {/* Search Bar for Posts */}
                <div className="mb-8 relative max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search posts by title, content, or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent shadow-sm text-eco-dark"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>

                {/* Discussion Posts Section */}
                <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
                    <h3 className="text-2xl font-semibold text-eco-dark mb-5 font-inter border-b pb-3 border-eco-lightgreen flex items-center space-x-2">
                        <MessageCircle size={24} className="text-eco-green" />
                        <span>Recent Discussions</span>
                    </h3>
                    
                    {isLoadingPosts ? (
                        <div className="text-center py-8 text-eco-green text-lg font-semibold">
                            Loading forum posts...
                        </div>
                    ) : filteredPosts.length > 0 ? (
                        <ul className="space-y-6">
                            {filteredPosts.map((post) => (
                                <li key={post._id || post.title} className="border-l-4 border-eco-green pl-4 py-2 bg-eco-lightgreen bg-opacity-10 rounded-r-lg shadow-sm hover:shadow-md transition-all duration-200">
                                    <h4 className="text-xl font-bold text-eco-dark mb-1 font-inter">{post.title}</h4>
                                    <p className="text-gray-700 text-base mt-2 leading-relaxed">{post.content}</p>
                                    <p className="text-sm text-gray-500 mt-2 flex items-center space-x-1">
                                        <UserCircle size={16} />
                                        <span>By <span className="font-semibold text-eco-green">{post.author || 'Anonymous'}</span> on{' '}
                                        {new Date(post.createdAt || Date.now()).toLocaleDateString()}</span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic py-4 text-center">No posts found. Be the first to start a discussion!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Forum;
