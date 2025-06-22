import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-green-700 shadow-md px-6 py-4">
      <nav className="max-w-7xl mx-auto flex justify-between items-center text-white">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src="/Greenverse.png"
              alt="GreenVerse Logo"
              className="w-20 h-auto"
            />
          </Link>
          <h1 className="text-2xl font-bold tracking-wide">GREENVERSE</h1>
        </div>

        {/* Nav Links */}
        <ul className="flex gap-6 items-center text-lg font-medium">
          <li>
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg hover:bg-green-800 transition ${
                isActive('/') ? 'bg-white text-green-700 font-semibold' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/plants"
              className={`px-3 py-2 rounded-lg hover:bg-green-800 transition ${
                isActive('/plants') ? 'bg-white text-green-700 font-semibold' : ''
              }`}
            >
              Plants
            </Link>
          </li>
          <li>
            <Link
              to="/forum"
              className={`px-3 py-2 rounded-lg hover:bg-green-800 transition ${
                isActive('/forum') ? 'bg-white text-green-700 font-semibold' : ''
              }`}
            >
              Forum
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link
                to="/profile"
                className={`px-3 py-2 rounded-lg hover:bg-green-800 transition ${
                  isActive('/profile') ? 'bg-white text-green-700 font-semibold' : ''
                }`}
              >
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className={`px-3 py-2 rounded-lg hover:bg-green-800 transition ${
                  isActive('/login') ? 'bg-white text-green-700 font-semibold' : ''
                }`}
              >
                Login/Register
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
