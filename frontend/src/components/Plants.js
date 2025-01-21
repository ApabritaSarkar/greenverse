// src/components/Plants.js
import React, { useState } from 'react';
import Modal from './Modal';
import plantsData from '../data/plantsData';  // Import the dataset
import '../styles/plants.css';

const Plants = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlants = plantsData.filter(plant => {
    const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  
  const openModal = (plant) => {
    setSelectedPlant(plant);
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
    setSelectedPlant(null);
  };

  return (
    <div className="plants-page">
      <h2>Our Plants Collection</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a plant..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="categories">
        {['all', 'indoor', 'outdoor', 'herbal', 'pet-friendly', 'gifts'].map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="plant-listings">
        {filteredPlants.length > 0 ? (
          filteredPlants.map(plant => (
            <article key={plant.id} className="plant-card" onClick={() => openModal(plant)}>
              <img src={plant.image} alt={plant.name} />
              <h3>{plant.name}</h3>
              <p>{plant.description}</p>
            </article>
          ))
        ) : (
          <p>No plants found for your search or category.</p>
        )}
        <Modal isOpen={isOpen} onClose={closeModal} plant={selectedPlant} />
      </div>
    </div>
  );
};

export default Plants;
