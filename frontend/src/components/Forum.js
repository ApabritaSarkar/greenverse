import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchForumPosts, addForumPost } from '../services/forumApi';

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

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-3xl font-semibold text-green-700 mb-4">Login to Join the Forum</h2>
        <p className="text-gray-600">
          Please <Link to="/login" className="text-green-600 underline hover:text-green-800">login</Link> to view and participate in discussions.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Welcome to the Forum</h2>

      {/* Add Post Form */}
      <form onSubmit={handleAddPost} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Add a New Post</h3>
        <input
          type="text"
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          required
        />
        <textarea
          placeholder="Write your post here..."
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md h-32 resize-none focus:ring-2 focus:ring-green-500"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Post
        </button>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </form>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Posts */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Discussion Posts</h3>
        {filteredPosts.length > 0 ? (
          <ul className="space-y-6">
            {filteredPosts.map((post) => (
              <li key={post._id} className="border-l-4 border-green-600 pl-4">
                <h4 className="text-lg font-bold text-green-700">{post.title}</h4>
                <p className="text-gray-700 mt-2">{post.content}</p>
                <p className="text-sm text-gray-500 mt-1">
                  By <span className="font-semibold">{post.author}</span> on{' '}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No posts found. Be the first to add one!</p>
        )}
      </div>
    </div>
  );
};

export default Forum;
