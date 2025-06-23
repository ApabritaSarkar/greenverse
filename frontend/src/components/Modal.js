import React from 'react';
import { X } from 'lucide-react'; // Assuming lucide-react is installed

const Modal = ({ isOpen, onClose, plant }) => {
    // If the modal is not open or no plant data is provided, return null (don't render)
    if (!isOpen || !plant) return null;

    return (
        // Modal Overlay: Fixed position, full screen, semi-transparent black background, centered content
        // The overlay itself remains fixed and full screen
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8 font-roboto">
            {/* Modal Content Container:
                - bg-white for background, rounded-xl for corners, shadow-2xl for depth
                - w-full to take full width on small screens, max-w-lg for desktop constraint
                - max-h-[90vh] to limit height to 90% of viewport height (crucial for mobile fitting)
                - overflow-y-auto to allow scrolling within the modal if content exceeds max-height
                - relative for absolute positioning of close button
                - animate-fade-in-up for entry animation
            */}
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg relative 
                            max-h-[90vh] overflow-y-auto 
                            animate-fade-in-up transform transition-all duration-300 ease-out scale-100 opacity-100">
                
                {/* Close Button: Positioned absolutely within the modal content */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-[#E6B34A] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-eco-green rounded-full p-1 z-10"
                    aria-label="Close modal"
                >
                    <X size={28} /> {/* Lucide-react X icon for closing */}
                </button>

                {/* Plant Image */}
                <div className="flex justify-center mb-6">
                    <img 
                        src={plant.image} 
                        alt={plant.name} 
                        className="w-full h-56 md:h-64 object-cover rounded-lg shadow-md border border-gray-200 transform hover:scale-102 transition-transform duration-300" 
                        // Fallback image if the original image fails to load
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/9AE6B4/2D3748?text=Plant+Image"; }}
                    />
                </div>
                
                {/* Plant Name */}
                <h2 className="text-3xl font-bold text-eco-green mb-3 text-center font-inter leading-tight">
                    {plant.name}
                </h2>
                
                {/* Plant Description */}
                <p className="text-gray-700 text-base leading-relaxed mb-6 text-center">
                    {plant.description}
                </p>
                
                {/* Care Tips Section */}
                <h3 className="text-xl font-semibold text-eco-dark mb-3 border-b-2 border-eco-lightgreen pb-2 font-inter">
                    Care Tips:
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {plant.careTips} 
                </p>
                
                {/* Placeholder for User Reviews/Comments Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-eco-dark mb-4 font-inter">
                        User Feedback:
                    </h3>
                    <p className="text-gray-500 text-sm italic">
                        (User reviews and comments section will go here later, enabling community interaction.)
                    </p>
                    {/* Example placeholder review */}
                    <div className="bg-eco-lightgreen bg-opacity-20 p-4 rounded-lg mt-4 shadow-sm">
                        <p className="font-semibold text-eco-green">John Doe:</p>
                        <p className="text-gray-700 text-sm mt-1">"This plant is surprisingly easy to care for, thanks to these tips!"</p>
                    </div>
                </div>

                {/* Action Button (e.g., Close) */}
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={onClose} 
                        className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                    >
                        Got It!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
