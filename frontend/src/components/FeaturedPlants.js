// src/components/FeaturedPlants.js
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { motion } from 'framer-motion';
import Modal from './Modal';
import plantsData from '../data/plantsData'; // Assuming plantsData is correctly imported
import '../styles.css'; // Ensure this file contains necessary styles

const FeaturedPlants = () => {
  const sliderRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const navigate = useNavigate(); // React Router's navigation hook
  const scrollAmount = 210; // Adjust for smoothness, accounting for card width and margin

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); // Smooth scrolling left
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' }); // Smooth scrolling right
    }
  };

  const handleSeeMore = () => {
    navigate('/plants'); // Redirect to the Plants page
  };

  const openModal = (plant) => {
    setSelectedPlant(plant);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPlant(null);
  };

  return (
    <section className="featured-plants">
      <h2>Featured Plants</h2>
      <button className="slider-button left" onClick={slideLeft}>&#8249;</button>
      <div className="slider-container" ref={sliderRef}>
        <motion.div 
          className="slider" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {plantsData.slice(0, 10).map((plant) => (
            <motion.div 
              className="plant-card" 
              key={plant.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => openModal(plant)}
            >
              <img src={plant.image} alt={plant.name} />
              <div className="plant-info">
                <h3>{plant.name}</h3>
                <p>{plant.description}</p>
              </div>
            </motion.div>
          ))}
          {/* "See More" Card */}
          <div className="plant-card see-more" onClick={handleSeeMore}>
            <h3>See More</h3>
          </div>
        </motion.div>
      </div>
      <button className="slider-button right" onClick={slideRight}>&#8250;</button>
      <Modal isOpen={isOpen} onClose={closeModal} plant={selectedPlant} />
    </section>
  );
};

export default FeaturedPlants;
