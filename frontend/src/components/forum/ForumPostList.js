import { motion } from 'framer-motion';
import { MessageCircle, UserCircle } from 'lucide-react';

const ForumPostList = ({ posts, isLoading }) => (
  <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
    <h3 className="text-2xl font-semibold mb-5 text-eco-dark flex items-center space-x-2 font-inter border-b pb-3 border-eco-lightgreen">
      <MessageCircle size={24} className="text-eco-green" />
      <span>Recent Discussions</span>
    </h3>

    {isLoading ? (
      <div className="text-center py-6 text-eco-green font-medium">Loading discussions...</div>
    ) : posts.length > 0 ? (
      <ul className="space-y-6">
        {posts.map((post) => (
          <motion.li
            key={post._id || post.title}
            className="border-l-4 border-eco-green pl-4 py-2 bg-eco-lightgreen bg-opacity-10 rounded-r-lg shadow-sm hover:shadow-md transition"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h4 className="text-xl font-bold text-eco-dark font-inter">{post.title}</h4>
            <p className="text-gray-700 mt-2 leading-relaxed">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <UserCircle size={16} />
              <span>
                By <span className="font-medium text-eco-green">{post.author || 'Anonymous'}</span> on{' '}
                {new Date(post.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </p>
          </motion.li>
        ))}
      </ul>
    ) : (
      <p className="text-center text-gray-500 py-4 italic">No discussions yet. Start the first one!</p>
    )}
  </div>
);

export default ForumPostList;
