import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Import icons from lucide-react

// Placeholder image for the logo if Greenverse.png isn't available or needs a fallback
const GREENVERSE_LOGO = "https://placehold.co/40x40/38A169/ffffff?text=GV"; 

const Navbar = ({ isLoggedIn, handleLogout }) => {
    // State to manage the visibility of the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the mobile menu state
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-eco-offwhite shadow-md fixed w-full top-0 left-0 z-50 font-roboto">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo and Site Title */}
                <Link to="/" className="flex items-center space-x-2">
                    <img 
                        src="/Greenverse.png" // Your actual logo path
                        alt="GreenVerse Logo" 
                        className="h-10 w-10 rounded-full object-cover" 
                        onError={(e) => { e.target.onerror = null; e.target.src = GREENVERSE_LOGO; }} // Fallback image
                    />
                    <h1 className="text-2xl font-bold text-eco-green font-inter">GREENVERSE</h1>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link 
                        to="/" 
                        className="text-eco-dark hover:text-eco-green font-medium transition-colors duration-200"
                    >
                        Home
                    </Link>
                    <Link 
                        to="/plants" 
                        className="text-eco-dark hover:text-eco-green font-medium transition-colors duration-200"
                    >
                        Plants
                    </Link>
                    <Link 
                        to="/forum" 
                        className="text-eco-dark hover:text-eco-green font-medium transition-colors duration-200"
                    >
                        Forum
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Link 
                                to="/profile" 
                                className="text-eco-dark hover:text-eco-green font-medium transition-colors duration-200"
                            >
                                Profile
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link 
                            to="/login" 
                            className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            Login / Register
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-eco-dark focus:outline-none">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Links (Conditional Render) */}
            {isMenuOpen && (
                <div className="md:hidden bg-eco-offwhite pb-4 shadow-inner">
                    <div className="flex flex-col items-center space-y-4 pt-2">
                        <Link 
                            to="/" 
                            className="block text-eco-dark hover:text-eco-green font-medium transition-colors duration-200 w-full text-center py-2"
                            onClick={toggleMenu} // Close menu on link click
                        >
                            Home
                        </Link>
                        <Link 
                            to="/plants" 
                            className="block text-eco-dark hover:text-eco-green font-medium transition-colors duration-200 w-full text-center py-2"
                            onClick={toggleMenu}
                        >
                            Plants
                        </Link>
                        <Link 
                            to="/forum" 
                            className="block text-eco-dark hover:text-eco-green font-medium transition-colors duration-200 w-full text-center py-2"
                            onClick={toggleMenu}
                        >
                            Forum
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <Link 
                                    to="/profile" 
                                    className="block text-eco-dark hover:text-eco-green font-medium transition-colors duration-200 w-full text-center py-2"
                                    onClick={toggleMenu}
                                >
                                    Profile
                                </Link>
                                <button 
                                    onClick={() => { handleLogout(); toggleMenu(); }} // Logout and close menu
                                    className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 w-4/5"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link 
                                to="/login" 
                                className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 w-4/5"
                                onClick={toggleMenu}
                            >
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
