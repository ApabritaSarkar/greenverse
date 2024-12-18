import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Navbar = ({ isLoggedIn }) => {
    return (
        <div className="navbar">
            <nav>
                <h1>Virtual Plant Companion</h1>
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
