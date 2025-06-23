import React, { useState } from "react";
import Modal from "./Modal"; // Ensure Modal.js is in the same directory
import plantsData from "../data/plantsData"; // Ensure plantsData.js is correctly imported and has categories
import { Search } from "lucide-react"; // Icons for search and filter

const Plants = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Filter plants based on selected category and search term
  const filteredPlants = plantsData.filter((plant) => {
    const matchesCategory =
      selectedCategory === "all" || plant.category === selectedCategory;
    const matchesSearch =
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    <div className="min-h-screen bg-eco-offwhite p-4 pt-20 font-roboto">
      <div className="max-w-7xl mx-auto py-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-eco-green mb-10 font-inter">
          Explore Our Plant Collection
        </h2>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8 relative">
          <input
            type="text"
            placeholder="Search for a plant by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent shadow-sm text-eco-dark"
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["all", "indoor", "outdoor", "herbal", "pet-friendly", "gifts"].map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 border-2 text-sm md:text-base
                                ${
                                  selectedCategory === category
                                    ? "bg-gradient-to-r from-eco-green to-eco-blue text-white border-eco-green shadow-md"
                                    : "bg-white text-eco-green border-eco-lightgreen hover:bg-eco-lightgreen hover:bg-opacity-20 hover:border-eco-green"
                                }`}
              >
                {/* Capitalize first letter for display */}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Plant Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPlants.length > 0 ? (
            filteredPlants.map((plant) => (
              <div
                key={plant.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg p-4 cursor-pointer transition-all duration-300 transform hover:scale-102 border border-gray-100"
                onClick={() => openModal(plant)}
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="rounded-lg w-full h-40 object-cover mb-4 shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/400x300/9AE6B4/2D3748?text=Plant+Image";
                  }}
                />
                <h3 className="text-xl font-semibold text-eco-green mb-2 font-inter line-clamp-1">
                  {plant.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {plant.description}
                </p>
                <button className="w-full bg-eco-green text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200 text-sm font-medium">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg py-8">
              No plants found for your current search or category. Try adjusting
              your filters!
            </p>
          )}
        </div>
      </div>

      {/* Modal for Plant Details */}
      <Modal isOpen={isOpen} onClose={closeModal} plant={selectedPlant} />
    </div>
  );
};

export default Plants;
