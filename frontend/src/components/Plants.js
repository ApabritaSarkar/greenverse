import React, { useState } from 'react';
import Modal from './Modal';
import plantsData from '../data/plantsData';

const Plants = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const filteredPlants = plantsData.filter((plant) => {
    const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openModal = (plant) => {
    setSelectedPlant(plant);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPlant(null);
  };

  return (
    <div className="bg-gray-50 py-12 px-6 min-h-screen">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Our Plants Collection</h2>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search for a plant..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {['all', 'indoor', 'outdoor', 'herbal', 'pet-friendly', 'gifts'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition border ${
              selectedCategory === category
                ? 'bg-green-700 text-white border-green-700'
                : 'bg-white text-green-700 border-green-300 hover:bg-green-100'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Plant Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <div
              key={plant.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg p-4 cursor-pointer transition"
              onClick={() => openModal(plant)}
            >
              <img
                src={plant.image}
                alt={plant.name}
                className="rounded-xl w-full h-40 object-cover mb-3"
              />
              <h3 className="text-lg font-semibold text-green-800">{plant.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{plant.description}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No plants found for your search or category.</p>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} plant={selectedPlant} />
    </div>
  );
};

export default Plants;
