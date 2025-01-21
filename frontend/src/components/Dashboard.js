import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import FeaturedPlants from './FeaturedPlants';

const Dashboard = () => {
  return (
    <div className="dashboard">
<div className="home">
      {/* Welcome Section */}
      <section className="welcome">
    <h1>Welcome to Greenverse</h1>
    <h3>Explore the universe of green livings</h3>
    <p>Discover a world of green living with our virtual plant companion. Whether you're a seasoned gardener or just starting your plant journey, we have everything you need to nurture and explore your green space.</p>
    <div className="welcome-buttons">
        <Link to="/plants" className="btn">Explore Plant Varieties</Link>
        <Link to="/forum" className="btn">Connect with the Community</Link>
    </div>
</section>


      {/* About Us Section */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>At GreenVerse, we are passionate about bringing the world of plants closer to you. Our mission is to create a digital platform that empowers plant enthusiasts of all levels to manage, explore, and connect with the green world. Whether you’re a first-time plant parent or a seasoned gardener, GreenVerse offers a space to grow your knowledge, share experiences, and discover a diverse range of plants. Join us on this journey as we cultivate a thriving, sustainable community dedicated to all things green.</p>
        </section>
        </div>
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
              <button type="submit" className="btn">Send</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
<footer className="footer">
  <p>&copy; 2024 Virtual Plant Companion. All rights reserved.</p>
  <p>
    <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a>
  </p>
</footer>

    </div>
  );
};

export default Dashboard;
