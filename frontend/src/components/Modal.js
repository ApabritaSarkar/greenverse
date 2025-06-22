import React from 'react';

const Modal = ({ isOpen, onClose, plant }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 transition"
        >
          &times;
        </button>

        {/* Content */}
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">{plant.name}</h2>
        <img
          src={plant.image}
          alt={plant.name}
          className="rounded-xl w-full h-60 object-cover mb-4"
        />
        <p className="text-gray-700 mb-4">{plant.description}</p>

        <h3 className="text-xl font-semibold text-green-800 mb-2">Care Tips:</h3>
        <p className="text-gray-600">{plant.careTips}</p>

        {/* You can add reviews/comments here */}
      </div>
    </div>
  );
};

export default Modal;
