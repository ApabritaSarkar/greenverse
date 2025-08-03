import React from "react";
import { PlusCircle } from "lucide-react";

const AddPlantForm = ({
  plantName,
  datePlanted,
  status,
  setPlantName,
  setDatePlanted,
  setStatus,
  handleAddPlant,
  isAddingPlant,
  message,
  error,
  // Additional fields
  plantSpecies,
  setPlantSpecies,
  plantLocation,
  setPlantLocation,
  wateringFreq,
  setWateringFreq,
  fertilizingFreq,
  setFertilizingFreq,
  pruningFreq,
  setPruningFreq,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-eco-dark mb-4 font-inter border-b pb-3 border-eco-lightgreen">
        Add a New Plant
      </h2>

      {/* Display messages */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleAddPlant} className="space-y-4">
        <div>
          <label
            htmlFor="plantName"
            className="block text-sm font-medium text-eco-dark mb-1"
          >
            Plant Name
          </label>
          <input
            type="text"
            id="plantName"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
            placeholder="e.g., Fiddle Leaf Fig"
            required
          />
        </div>

        <div>
          <label
            htmlFor="datePlanted"
            className="block text-sm font-medium text-eco-dark mb-1"
          >
            Date Planted
          </label>
          <input
            type="date"
            id="datePlanted"
            value={datePlanted}
            onChange={(e) => setDatePlanted(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
            required
          />
        </div>
        <div>
          <label
            htmlFor="plantStatus"
            className="block text-sm font-medium text-eco-dark mb-1"
          >
            Status
          </label>
          <select
            id="plantStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
            required
          >
            <option value="">Select status</option>
            <option value="thriving">Thriving</option>
            <option value="healthy">Healthy</option>
            <option value="needs_attention">Needs Attention</option>
            <option value="critical">Critical</option>
            <option value="dormant">Dormant</option>
          </select>
        </div>

        {/* Species field */}
        <div>
          <label
            htmlFor="plantSpecies"
            className="block text-sm font-medium text-eco-dark mb-1"
          >
            Species (Optional)
          </label>
          <input
            type="text"
            id="plantSpecies"
            value={plantSpecies || ""}
            onChange={(e) => setPlantSpecies(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
            placeholder="e.g., Ficus lyrata"
          />
        </div>

        {/* Location field */}
        <div>
          <label
            htmlFor="plantLocation"
            className="block text-sm font-medium text-eco-dark mb-1"
          >
            Location (Optional)
          </label>
          <input
            type="text"
            id="plantLocation"
            value={plantLocation || ""}
            onChange={(e) => setPlantLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
            placeholder="e.g., Living room window"
          />
        </div>

        {/* Care schedule fields */}
        <div>
          <label
            htmlFor="wateringFreq"
            className="block text-sm font-medium text-eco-dark mb-1"
          >
            Watering Frequency (days)
          </label>
          <input
            type="number"
            id="wateringFreq"
            min="1"
            value={wateringFreq || ""}
            onChange={(e) => setWateringFreq(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
            placeholder="e.g., 7"
          />
        </div>

        <div>
          <label
            htmlFor="fertilizingFreq"
            className="block text-sm font-medium text-eco-dark mb-1"
          >
            Fertilizing Frequency (days)
          </label>
          <input
            type="number"
            id="fertilizingFreq"
            min="1"
            value={fertilizingFreq || ""}
            onChange={(e) => setFertilizingFreq(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
            placeholder="e.g., 30"
          />
        </div>
        <div>
          <label
            htmlFor="pruningFreq"
            className="block text-sm font-medium text-eco-dark mb-1"
          >
            Pruning Frequency (days)
          </label>
          <input
            type="number"
            id="pruningFreq"
            min="1"
            value={pruningFreq || ""}
            onChange={(e) => setPruningFreq(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
            placeholder="e.g., 90"
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-full flex items-center justify-center space-x-2"
          disabled={isAddingPlant || !plantName || !datePlanted || !status}
        >
          {isAddingPlant ? (
            <svg
              className="animate-spin h-5 w-5 text-white mr-3"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <PlusCircle size={20} />
          )}
          <span>{isAddingPlant ? "Adding..." : "Add Plant"}</span>
        </button>
      </form>
    </div>
  );
};

export default AddPlantForm;
