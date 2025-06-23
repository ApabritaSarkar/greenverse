import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Modal from './Modal'; 
import plantsData from '../data/plantsData'; 
import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react';

const FeaturedPlants = () => {
    const sliderRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const navigate = useNavigate();
    // Adjust scrollAmount based on card width (approx. 200px) + gap (24px for gap-6)
    const scrollAmount = 224; 

    // Function to scroll the slider left
    const slideLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };

    // Function to scroll the slider right
    const slideRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Handler for the "See More" card click, navigates to /plants
    const handleSeeMore = () => {
        navigate('/plants');
    };

    // Function to open the plant details modal
    const openModal = (plant) => {
        setSelectedPlant(plant);
        setIsOpen(true);
    };

    // Function to close the plant details modal
    const closeModal = () => {
        setIsOpen(false);
        setSelectedPlant(null);
    };

    return (
        <section className="relative py-12 px-4 md:px-8 bg-eco-offwhite font-roboto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-eco-green font-inter">Featured Plants</h2>
            
            <div className="relative max-w-7xl mx-auto">
                {/* Left Slider Button */}
                <button 
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-eco-green z-10 hidden md:block"
                    onClick={slideLeft}
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={32} className="text-eco-green" />
                </button>

                {/* Slider Container */}
                <div 
                    className="flex overflow-x-scroll scrollbar-hide space-x-6 p-4 -mx-4 md:mx-0" // mx-4 for padding on smaller screens
                    ref={sliderRef}
                >
                    {plantsData.slice(0, 10).map((plant) => (
                        <motion.div 
                            className="flex-none w-56 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 overflow-hidden" 
                            key={plant.id}
                            whileHover={{ scale: 1.03 }} // Slightly reduced scale for smoother effect
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }} // Adjusted damping
                            onClick={() => openModal(plant)}
                        >
                            {/* Plant Image */}
                            <img 
                                src={plant.image} 
                                alt={plant.name} 
                                className="w-full h-40 object-cover rounded-t-lg" 
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x200/9AE6B4/2D3748?text=Plant+Image"; }}
                            />
                            {/* Plant Info */}
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2 text-eco-green font-inter">{plant.name}</h3>
                                <p className="text-sm text-gray-600 line-clamp-3">{plant.description}</p>
                            </div>
                        </motion.div>
                    ))}
                    {/* "See More" Card */}
                    <div 
                        className="flex-none w-56 bg-gradient-to-br from-eco-green to-eco-blue text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center text-center p-4 transform hover:scale-103"
                        onClick={handleSeeMore}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Leaf size={48} className="mx-auto mb-4" /> {/* Leaf icon for "See More" */}
                            <h3 className="text-2xl font-bold font-inter">See More Plants!</h3>
                            <p className="text-sm mt-2 opacity-90">Discover our full collection</p>
                        </motion.div>
                    </div>
                </div>

                {/* Right Slider Button */}
                <button 
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-eco-green z-10 hidden md:block"
                    onClick={slideRight}
                    aria-label="Scroll right"
                >
                    <ChevronRight size={32} className="text-eco-green" />
                </button>
            </div>

            {/* Modal for Plant Details */}
            <Modal isOpen={isOpen} onClose={closeModal} plant={selectedPlant} />
        </section>
    );
};

export default FeaturedPlants;
