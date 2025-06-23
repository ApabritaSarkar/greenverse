import { motion } from 'framer-motion';
import { MessageSquareText, Send } from 'lucide-react';

const ForumForm = ({ newPost, setNewPost, handleAddPost, isAddingPost }) => (
  <motion.form
    onSubmit={handleAddPost}
    className="bg-white shadow-xl rounded-xl p-6 mb-8 border border-gray-200"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
  >
    <h3 className="text-2xl font-semibold mb-5 flex items-center space-x-2 text-eco-dark font-inter">
      <MessageSquareText size={24} className="text-eco-green" />
      <span>Share Your Thoughts</span>
    </h3>
    <input
      type="text"
      placeholder="Title"
      value={newPost.title}
      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring-eco-green focus:outline-none"
      required
    />
    <textarea
      placeholder="Write something insightful..."
      value={newPost.content}
      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
      className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg resize-none h-32 focus:ring-eco-green focus:outline-none"
      required
    ></textarea>
    <button
      type="submit"
      className="w-full flex items-center justify-center bg-gradient-to-r from-eco-green to-eco-blue text-white px-6 py-3 rounded-lg font-semibold text-lg hover:shadow-lg transition"
      disabled={isAddingPost}
    >
      {isAddingPost ? (
        <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0..." />
        </svg>
      ) : (
        <Send size={20} className="mr-2" />
      )}
      <span>{isAddingPost ? 'Posting...' : 'Post to Forum'}</span>
    </button>
  </motion.form>
);

export default ForumForm;
