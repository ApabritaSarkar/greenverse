import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ isLoggedIn }) => {
    return (
        <div className="navbar">
            <nav>
            <div className="logo">
                <Link to="/">
                    <img src="/Greenverse.png" alt="GreenVerse Logo" className="navbar-logo" />
                </Link>
            
                <h1>GREENVERSE</h1></div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/plants">Plants</Link></li>
                    <li><Link to="/forum">Forum</Link></li>
                    {isLoggedIn ? (
                        <li><Link to="/profile">Profile</Link></li>
                    ) : (
                        <li><Link to="/login">Login/Register</Link></li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
