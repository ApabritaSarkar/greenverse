import React, { useState } from "react";
import Modal from "./Modal";
import plantsData from "../data/plantsData";
import { Search } from "lucide-react";

const categories = ["all", "indoor", "outdoor", "herbal", "pet-friendly", "gifts"];

const Plants = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const filteredPlants = plantsData.filter((plant) => {
    const matchCategory = selectedCategory === "all" || plant.category === selectedCategory;
    const matchSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        plant.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
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
    <div className="min-h-screen bg-eco-offwhite pt-20 px-4 pb-16 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-eco-green mb-10">
          Explore Our Plant Collection
        </h2>

        {/* Search Input */}
        <div className="relative max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-eco-green shadow-sm text-eco-dark focus:outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm md:text-base font-medium border-2 transition-all duration-300
                ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-eco-green to-eco-blue text-white border-eco-green shadow-md"
                    : "bg-white text-eco-green border-eco-lightgreen hover:bg-eco-lightgreen hover:bg-opacity-20"
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Plant Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPlants.length > 0 ? (
            filteredPlants.map((plant) => (
              <div
                key={plant.id}
                onClick={() => openModal(plant)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.03] border border-gray-100 overflow-hidden"
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-40 object-cover rounded-t-lg shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/400x300/9AE6B4/2D3748?text=Plant+Image";
                  }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-eco-green mb-2 truncate">
                    {plant.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {plant.description}
                  </p>
                  <button
                    className="w-full bg-eco-green text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200 text-sm font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(plant);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg py-10">
              No plants found for your current search or category.
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
