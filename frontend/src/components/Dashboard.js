import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedPlants from './FeaturedPlants';

const Dashboard = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Welcome Section */}
      <section className="bg-green-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Greenverse</h1>
        <h3 className="text-xl font-medium mb-6">Explore the universe of green livings</h3>
        <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed">
          Discover a world of green living with our virtual plant companion. Whether you're a seasoned gardener or just starting your plant journey, we have everything you need to nurture and explore your green space.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/plants" className="bg-white text-green-700 font-semibold px-5 py-3 rounded-xl shadow hover:bg-gray-100 transition">
            Explore Plant Varieties
          </Link>
          <Link to="/forum" className="bg-white text-green-700 font-semibold px-5 py-3 rounded-xl shadow hover:bg-gray-100 transition">
            Connect with the Community
          </Link>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">About Us</h2>
        <p className="max-w-4xl mx-auto text-lg leading-relaxed">
          At GreenVerse, we are passionate about bringing the world of plants closer to you. Our mission is to create a digital platform that empowers plant enthusiasts of all levels to manage, explore, and connect with the green world. Whether you’re a first-time plant parent or a seasoned gardener, GreenVerse offers a space to grow your knowledge, share experiences, and discover a diverse range of plants.
        </p>
      </section>

      {/* Featured Plants */}
      <FeaturedPlants />

      {/* Contact Us */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">Contact Us</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Our Address</h3>
            <p className="text-lg">123 Plant Street, Green City, Earth</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-4">Send Us a Note</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="email" placeholder="Your Email" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
              <textarea placeholder="Your Message" required className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
              <button type="submit" className="bg-green-700 text-white font-semibold px-5 py-3 rounded-xl hover:bg-green-800 transition">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-6 text-center text-sm">
        <p>&copy; 2024 Virtual Plant Companion. All rights reserved.</p>
        <p className="mt-1">
          <a href="/privacy-policy" className="underline hover:text-green-300">Privacy Policy</a> | <a href="/terms-of-service" className="underline hover:text-green-300">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
