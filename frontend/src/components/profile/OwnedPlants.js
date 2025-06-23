import React from 'react';
import { Sprout } from 'lucide-react';

const OwnedPlants = ({ plants }) => {
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
              className="bg-eco-lightgreen bg-opacity-20 p-4 rounded-lg shadow-sm flex items-center space-x-3"
            >
              <Sprout size={24} className="text-eco-green flex-shrink-0" />
              <div>
                <strong className="text-eco-dark text-lg">{plant.name}</strong>
                <p className="text-gray-600 text-sm">
                  Planted on {new Date(plant.datePlanted).toLocaleDateString()} (
                  <span className="font-medium text-eco-green">{plant.status}</span>)
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic py-4 text-center">You haven't added any plants yet.</p>
      )}
    </div>
  );
};

export default OwnedPlants;
