import { Search } from 'lucide-react';

const ForumSearch = ({ searchTerm, setSearchTerm }) => (
  <div className="relative max-w-xl mx-auto mb-8">
    <input
      type="text"
      placeholder="Search posts..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-eco-green focus:outline-none shadow-sm"
    />
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
  </div>
);

export default ForumSearch;
