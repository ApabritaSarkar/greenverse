import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const GREENVERSE_LOGO = "https://placehold.co/40x40/38A169/ffffff?text=GV";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinkStyle =
    "text-eco-dark hover:text-eco-green transition-colors duration-200 font-medium";
  const buttonStyle =
    "bg-gradient-to-r from-eco-green to-eco-blue text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300";

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50 font-inter">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/Greenverse.png"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = GREENVERSE_LOGO;
            }}
            alt="GreenVerse"
            className="h-10 w-10 rounded-full object-cover transition-transform group-hover:scale-110 duration-300"
          />
          <span className="text-2xl font-bold text-eco-green tracking-wide">GREENVERSE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={navLinkStyle}>Home</Link>
          <Link to="/plants" className={navLinkStyle}>Plants</Link>
          <Link to="/forum" className={navLinkStyle}>Forum</Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className={navLinkStyle}>Profile</Link>
              <button onClick={handleLogout} className={buttonStyle}>Logout</button>
            </>
          ) : (
            <Link to="/login" className={buttonStyle}>Login / Register</Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-eco-dark transition-transform hover:scale-110">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-inner animate-fadeInDown">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link to="/" className={navLinkStyle} onClick={toggleMenu}>Home</Link>
            <Link to="/plants" className={navLinkStyle} onClick={toggleMenu}>Plants</Link>
            <Link to="/forum" className={navLinkStyle} onClick={toggleMenu}>Forum</Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className={navLinkStyle} onClick={toggleMenu}>Profile</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className={buttonStyle + " w-4/5 text-center"}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className={buttonStyle + " w-4/5 text-center"} onClick={toggleMenu}>
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
