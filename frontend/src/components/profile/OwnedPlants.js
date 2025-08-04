import { Sprout, Heart } from 'lucide-react';
import EnhancedPlantCard from "../plantHealth/EnhancedPlantCard";
import React, { useState } from "react";

const OwnedPlants = ({ plants }) => {
  const [selectedPlant, setSelectedPlant] = useState(null);

  const getHealthScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
  };

  if (selectedPlant) {
    return (
      <div className="mb-6">
        <button
          className="mb-4 text-sm text-eco-blue hover:underline"
          onClick={() => setSelectedPlant(null)}
        >
          ← Back to Plant List
        </button>
        <EnhancedPlantCard plant={selectedPlant} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-eco-dark mb-4 font-inter border-b pb-3 border-eco-lightgreen">
        Your Owned Plants ({plants.length})
      </h2>

      {plants.length > 0 ? (
        <ul className="space-y-3">
          {plants.map((plant) => (
            <li
              key={plant._id || plant.name}
              onClick={() => setSelectedPlant(plant)}
              className="cursor-pointer bg-eco-lightgreen/20 p-4 rounded-lg shadow-sm flex justify-between items-start hover:bg-eco-lightgreen/40 transition"
            >
              <div className="flex gap-3 items-center">
                <Sprout size={24} className="text-eco-green flex-shrink-0" />
                <div>
                  <strong className="text-eco-dark text-lg">{plant.name}</strong>
                  {plant.species && (
                    <p className="text-sm text-gray-500 italic">{plant.species}</p>
                  )}
                  <p className="text-gray-600 text-sm">
                    Planted on {new Date(plant.datePlanted).toLocaleDateString()} (
                    <span className="font-medium text-eco-green">{plant.status}</span>)
                  </p>
                  {plant.location && (
                    <p className="text-sm text-gray-500">📍 {plant.location}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm">
                <Heart
                  size={16}
                  className={`${getHealthScoreColor(plant.healthScore)} fill-current`}
                />
                <span className={`${getHealthScoreColor(plant.healthScore)} font-medium`}>
                  {plant.healthScore}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic py-4 text-center">
          You haven't added any plants yet.
        </p>
      )}
    </div>
  );
};


export default OwnedPlants;
