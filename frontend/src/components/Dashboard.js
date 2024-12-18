import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import FeaturedPlants from './FeaturedPlants';


const Dashboard = () => {
  return (
    <div className="dashboard">

      {/* Welcome Section */}
      <section className="welcome">
        <h1>Welcome to Virtual Plant Companion</h1>
        <p>Your one-stop destination for managing your plants, exploring plant varieties, and connecting with fellow plant enthusiasts.</p>
        <div className="welcome-buttons">
          <Link to="/plants" className="btn">Browse Plants</Link>
          <Link to="/forum" className="btn">Join Forum</Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>We are passionate about connecting people with plants. Our platform helps you grow your virtual garden, learn plant care tips, and share your plant journey with others.</p>
      </section>

      {/* Featured Plants Section */}
      <FeaturedPlants />

      {/* Contact Us Section */}
      <section className="contact-us">
        <h2>Contact Us</h2>
        <div className="contact-details">
          <div className="address">
            <h3>Our Address</h3>
            <p>123 Plant Street, Green City, Earth</p>
          </div>
          <div className="send-note">
            <h3>Send Us a Note</h3>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Virtual Plant Companion. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
