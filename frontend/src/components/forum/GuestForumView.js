import { Link } from 'react-router-dom';
import { LogIn, MessageSquareText, UserPlus } from 'lucide-react';

const GuestForumView = ({ error }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-8 pt-20 bg-eco-offwhite font-roboto text-center">
    <MessageSquareText size={80} className="text-eco-green mb-6 animate-bounce-slow" />
    <h2 className="text-4xl md:text-5xl font-bold text-eco-dark mb-4 font-inter leading-tight">
      Join the GreenVerse Community
    </h2>
    <p className="text-gray-700 text-lg max-w-lg mx-auto mb-8 leading-relaxed">
      Share your plant stories, get advice, and connect with others who love greenery.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <Link to="/login" className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 flex items-center space-x-2">
        <LogIn size={20} />
        <span>Login</span>
      </Link>
      <Link to="/register" className="border-2 border-eco-green text-eco-green px-8 py-3 rounded-lg font-semibold text-lg hover:bg-eco-green hover:text-white transition-all duration-300 flex items-center space-x-2">
        <UserPlus size={20} />
        <span>Register</span>
      </Link>
    </div>
    {error && <p className="text-red-600 bg-red-100 px-4 py-2 rounded-md">{error}</p>}
  </div>
);

export default GuestForumView;
