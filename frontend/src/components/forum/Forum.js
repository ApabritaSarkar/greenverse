import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchForumPosts, addForumPost } from '../../services/forumApi';
import ForumHeader from './ForumHeader';
import ForumForm from './ForumForm';
import ForumSearch from './ForumSearch';
import ForumPostList from './ForumPostList';
import GuestForumView from './GuestForumView';

const Forum = ({ isLoggedIn }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setError('');
      setIsLoadingPosts(true);
      if (!isLoggedIn) return setIsLoadingPosts(false);

      try {
        const data = await fetchForumPosts();
        setPosts(data);
      } catch (error) {
        if (error.message.includes('401') || error.message.includes('403')) {
          localStorage.removeItem('token');
          return navigate('/login');
        }
        setError('Unable to fetch posts.');
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [isLoggedIn, navigate]);

  const handleAddPost = async (e) => {
    e.preventDefault();
    setError('');
    setIsAddingPost(true);

    const { title, content } = newPost;
    if (!title.trim() || !content.trim()) {
      setError('Please fill in both title and content.');
      return setIsAddingPost(false);
    }

    try {
      const added = await addForumPost(title, content);
      setPosts([added, ...posts]);
      setNewPost({ title: '', content: '' });
    } catch (error) {
      if (error.message.includes('401') || error.message.includes('403')) {
        localStorage.removeItem('token');
        return navigate('/login');
      }
      setError('Unable to add post.');
    } finally {
      setIsAddingPost(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const query = searchTerm.toLowerCase();
    return (
      post.title?.toLowerCase().includes(query) ||
      post.content?.toLowerCase().includes(query) ||
      post.author?.toLowerCase().includes(query)
    );
  });

  if (!isLoggedIn) return <GuestForumView error={error} />;

  return (
    <div className="min-h-screen bg-eco-offwhite p-4 pt-20 font-roboto">
      <div className="max-w-4xl mx-auto">
        <ForumHeader />
        {error && <p className="bg-red-100 text-red-700 text-sm py-2 px-4 rounded-md mb-4">{error}</p>}
        <ForumForm
          newPost={newPost}
          setNewPost={setNewPost}
          handleAddPost={handleAddPost}
          isAddingPost={isAddingPost}
        />
        <ForumSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ForumPostList posts={filteredPosts} isLoading={isLoadingPosts} />
      </div>
    </div>
  );
};

export default Forum;
