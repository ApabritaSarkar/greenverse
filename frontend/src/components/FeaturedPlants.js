import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import Modal from "./Modal";
import plantsData from "../data/plantsData";

const FeaturedPlants = () => {
  const sliderRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const navigate = useNavigate();
  const scrollAmount = 224;

  const scroll = (dir) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
    }
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
    <section className="bg-eco-offwhite py-12 px-4 md:px-8 font-inter">
      <h2 className="text-4xl font-bold text-center text-eco-green mb-10">Featured Plants</h2>

      <div className="relative max-w-7xl mx-auto">
        {/* Left Scroll */}
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll Left"
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10 focus:outline-none focus:ring-2 focus:ring-eco-green"
        >
          <ChevronLeft size={32} className="text-eco-green" />
        </button>

        {/* Plant Cards Scroll */}
        <div ref={sliderRef} className="flex overflow-x-scroll space-x-6 px-1 md:px-0 scrollbar-hide">
          {plantsData.slice(0, 10).map((plant) => (
            <motion.div
              key={plant.id}
              onClick={() => openModal(plant)}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex-none w-56 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              <img
                src={plant.image}
                alt={plant.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x200/9AE6B4/2D3748?text=Plant+Image";
                }}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-eco-green mb-1">{plant.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{plant.description}</p>
              </div>
            </motion.div>
          ))}

          {/* See More Card */}
          <motion.div
            onClick={() => navigate("/plants")}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
            className="flex-none w-56 bg-gradient-to-br from-eco-green to-eco-blue text-white rounded-lg shadow-md hover:shadow-xl cursor-pointer flex flex-col items-center justify-center p-6 text-center"
          >
            <Leaf size={48} className="mb-3" />
            <h3 className="text-2xl font-bold">See More Plants!</h3>
            <p className="text-sm mt-1 opacity-90">Discover our full collection</p>
          </motion.div>
        </div>

        {/* Right Scroll */}
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll Right"
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10 focus:outline-none focus:ring-2 focus:ring-eco-green"
        >
          <ChevronRight size={32} className="text-eco-green" />
        </button>
      </div>

      {/* Plant Details Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} plant={selectedPlant} />
    </section>
  );
};

export default FeaturedPlants;
