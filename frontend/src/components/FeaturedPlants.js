import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Modal from './Modal';
import plantsData from '../data/plantsData';

const FeaturedPlants = () => {
  const sliderRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const navigate = useNavigate();
  const scrollAmount = 220;

  const slideLeft = () => {
    sliderRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const slideRight = () => {
    sliderRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleSeeMore = () => {
    navigate('/plants');
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
    <section className="py-16 px-6 bg-white relative">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Featured Plants</h2>

      {/* Scroll Buttons */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-700 text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-green-800 shadow-lg z-10"
        onClick={slideLeft}
      >
        &#8249;
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-700 text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-green-800 shadow-lg z-10"
        onClick={slideRight}
      >
        &#8250;
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="overflow-x-auto scrollbar-hide whitespace-nowrap px-4"
      >
        <motion.div
          className="flex gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {plantsData.slice(0, 10).map((plant) => (
            <motion.div
              key={plant.id}
              className="min-w-[200px] max-w-[200px] bg-green-50 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => openModal(plant)}
            >
              <img
                src={plant.image}
                alt={plant.name}
                className="rounded-t-xl h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-800">{plant.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{plant.description}</p>
              </div>
            </motion.div>
          ))}

          {/* See More Card */}
          <div
            onClick={handleSeeMore}
            className="min-w-[200px] max-w-[200px] bg-white border border-green-200 rounded-xl flex items-center justify-center text-green-700 font-bold cursor-pointer hover:bg-green-100 transition"
          >
            <h3>See More</h3>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} plant={selectedPlant} />
    </section>
  );
};

export default FeaturedPlants;
