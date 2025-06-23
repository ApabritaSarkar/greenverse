import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, plant }) => {
  if (!isOpen || !plant) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 animate-scaleIn">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-eco-green transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-eco-green"
          aria-label="Close modal"
        >
          <X size={26} />
        </button>

        {/* Plant Image */}
        <div className="mb-6 flex justify-center">
          <img
            src={plant.image}
            alt={plant.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x400/9AE6B4/2D3748?text=Plant+Image";
            }}
            className="w-full h-56 md:h-64 object-cover rounded-xl border border-gray-200 shadow-lg transition-transform hover:scale-105 duration-300"
          />
        </div>

        {/* Plant Name */}
        <h2 className="text-3xl font-bold text-center text-eco-green mb-3 font-inter">
          {plant.name}
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-center text-base leading-relaxed mb-6">
          {plant.description}
        </p>

        {/* Care Tips */}
        <h3 className="text-xl font-semibold text-eco-dark mb-2 border-b-2 border-eco-green pb-2">
          Care Tips
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{plant.careTips}</p>

        {/* User Feedback (Placeholder) */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-eco-dark mb-4">User Feedback</h3>
          <p className="text-gray-500 text-sm italic mb-2">
            (User reviews and comments coming soon!)
          </p>
          <div className="bg-eco-lightgreen/30 p-4 rounded-lg shadow-sm">
            <p className="font-semibold text-eco-green">John Doe:</p>
            <p className="text-gray-700 text-sm mt-1">
              "This plant is surprisingly easy to care for, thanks to these tips!"
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
