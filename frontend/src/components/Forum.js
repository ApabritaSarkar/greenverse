// src/components/Forum.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Forum = ({ isLoggedIn }) => {  
  // Mock data for forum posts
  const initialPosts = [
    {
      id: 1,
      title: 'How to care for Monstera?',
      content: 'I recently bought a Monstera plant and would love some tips on how to take care of it!',
      date: '2024-10-01',
    },
    {
      id: 2,
      title: 'Best fertilizer for Snake Plants',
      content: 'What type of fertilizer do you recommend for Snake Plants?',
      date: '2024-10-05',
    },
    {
      id: 3,
      title: 'Aloe Vera benefits',
      content: 'Can anyone share the benefits of growing Aloe Vera at home?',
      date: '2024-10-10',
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      const newPostEntry = {
        id: posts.length + 1,
        title: newPost.title,
        content: newPost.content,
        date: new Date().toISOString().split('T')[0], // Get current date in YYYY-MM-DD format
      };
      setPosts([...posts, newPostEntry]);
      setNewPost({ title: '', content: '' }); // Reset form
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


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

      {/* Forum Posts Section */}
      <div className="forum-posts">
        <h3>Discussion Posts</h3>
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.id} className="forum-post">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <small>Posted on: {post.date}</small>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Post Form */}
      <form onSubmit={handleAddPost} className="add-post-form">
        <h3>Add a New Post</h3>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={newPost.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="content"
          placeholder="Write your post here..."
          value={newPost.content}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default Forum;
