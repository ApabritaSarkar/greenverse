import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedPlants from './FeaturedPlants';

const Dashboard = () => {
    return (
        // Main container with padding for the fixed navbar and min height
        <div className="dashboard min-h-screen pt-16 bg-eco-offwhite font-roboto">
            {/* Welcome Section - Hero */}
            <section className="relative bg-gradient-to-br from-eco-green to-eco-blue text-white py-20 px-4 md:px-8 lg:py-32 flex items-center justify-center overflow-hidden">
                {/* Background overlay for subtle pattern/texture */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://placehold.co/1200x800/FFFFFF/000000?text=Abstract+Leaf+Pattern')] bg-cover bg-center"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-inter leading-tight">
                        Welcome to GreenVerse
                    </h1>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-light mb-6">
                        Explore the universe of green livings
                    </h3>
                    <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                        Discover a world of green living with our virtual plant companion. Whether you're a seasoned gardener or just starting your plant journey, we have everything you need to nurture and explore your green space.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link 
                            to="/plants" 
                            className="inline-block bg-white text-eco-green px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 font-semibold text-lg"
                        >
                            Explore Plant Varieties
                        </Link>
                        <Link 
                            to="/forum" 
                            className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-eco-green transition-all duration-300 font-semibold text-lg"
                        >
                            Connect with the Community
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-16 px-4 md:px-8 bg-eco-beige text-eco-dark rounded-xl mx-auto max-w-6xl my-12 shadow-lg">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-eco-green font-inter">About Us</h2>
                    <p className="text-lg leading-relaxed">
                        At GreenVerse, we are passionate about bringing the world of plants closer to you. Our mission is to create a digital platform that empowers plant enthusiasts of all levels to manage, explore, and connect with the green world. Whether you’re a first-time plant parent or a seasoned gardener, GreenVerse offers a space to grow your knowledge, share experiences, and discover a diverse range of plants. Join us on this journey as we cultivate a thriving, sustainable community dedicated to all things green.
                    </p>
                </div>
            </section>

            {/* Featured Plants Section (This component would be styled separately) */}
            <section className="py-16 px-4 md:px-8 bg-eco-offwhite">
                <div className="max-w-6xl mx-auto">
                    <FeaturedPlants /> {/* This component will render the actual plant cards */}
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="py-16 px-4 md:px-8 bg-eco-lightgreen bg-opacity-20 text-eco-dark">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-eco-green font-inter">Contact Us</h2>
                    <div className="flex flex-col md:flex-row gap-12 items-start justify-center">
                        {/* Address */}
                        <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-md flex-shrink-0">
                            <h3 className="text-2xl font-semibold mb-4 text-eco-green">Our Address</h3>
                            <p className="text-lg">123 Plant Street, Green City, Earth</p>
                            {/* You could add a map embed here if desired */}
                            <div className="mt-6 w-full h-48 bg-gray-200 rounded-md overflow-hidden">
                                <img 
                                    src="https://placehold.co/400x200/9AE6B4/2D3748?text=Map+Location" 
                                    alt="Map placeholder" 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                        </div>

                        {/* Send a Note Form */}
                        <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold mb-4 text-eco-green">Send Us a Note</h3>
                            <form className="space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    required 
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-eco-green focus:border-eco-green transition-all duration-200 text-eco-dark"
                                />
                                <input 
                                    type="email" 
                                    placeholder="Your Email" 
                                    required 
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-eco-green focus:border-eco-green transition-all duration-200 text-eco-dark"
                                />
                                <textarea 
                                    placeholder="Your Message" 
                                    required 
                                    rows="5" 
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-eco-green focus:border-eco-green transition-all duration-200 text-eco-dark"
                                ></textarea>
                                <button 
                                    type="submit" 
                                    className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-semibold w-full md:w-auto"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-eco-dark text-white py-8 px-4 text-center">
                <div className="max-w-6xl mx-auto">
                    <p className="mb-2 text-sm md:text-base">&copy; 2024 Virtual Plant Companion. All rights reserved.</p>
                    <p className="text-sm md:text-base">
                        <Link to="/privacy-policy" className="hover:text-eco-lightgreen transition-colors duration-200">Privacy Policy</Link> 
                        <span className="mx-2">|</span> 
                        <Link to="/terms-of-service" className="hover:text-eco-lightgreen transition-colors duration-200">Terms of Service</Link>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
