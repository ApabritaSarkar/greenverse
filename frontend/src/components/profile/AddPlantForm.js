import React from "react";
import { PlusCircle, AlertCircle } from "lucide-react";

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
  wateringLastDone,
  setWateringLastDone,
  fertilizingLastDone,
  setFertilizingLastDone,
  pruningLastDone,
  setPruningLastDone
}) => {
  // Input validation helpers
  const isValidDate = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && date <= new Date();
  };

  const isFormValid = () => {
    return plantName.trim() && 
           isValidDate(datePlanted) && 
           status && 
           ['thriving', 'healthy', 'needs_attention', 'critical', 'dormant'].includes(status);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-eco-dark mb-4 font-inter border-b pb-3 border-eco-lightgreen">
        Add a New Plant
      </h2>

      {message && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
          <AlertCircle className="mr-2" size={16} />
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
          <AlertCircle className="mr-2" size={16} />
          {error}
        </div>
      )}

      <form onSubmit={handleAddPlant} className="space-y-4">
        {/* Required Fields Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-eco-dark mb-3">Required Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="plantName" className="block text-sm font-medium text-eco-dark mb-1">
                Plant Name *
              </label>
              <input
                type="text"
                id="plantName"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                placeholder="e.g., My Fiddle Leaf Fig"
                required
                maxLength={100}
              />
            </div>

            <div>
              <label htmlFor="datePlanted" className="block text-sm font-medium text-eco-dark mb-1">
                Date Planted *
              </label>
              <input
                type="date"
                id="datePlanted"
                value={datePlanted}
                onChange={(e) => setDatePlanted(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                required
                max={new Date().toISOString().split('T')[0]} // Can't be future date
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="plantStatus" className="block text-sm font-medium text-eco-dark mb-1">
              Current Status *
            </label>
            <select
              id="plantStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
              required
            >
              <option value="">Select current status</option>
              <option value="thriving">🌱 Thriving</option>
              <option value="healthy">✅ Healthy</option>
              <option value="needs_attention">⚠️ Needs Attention</option>
              <option value="critical">🚨 Critical</option>
              <option value="dormant">😴 Dormant</option>
            </select>
          </div>
        </div>

        {/* Optional Plant Details */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-eco-dark mb-3">Additional Details (Optional)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="plantSpecies" className="block text-sm font-medium text-eco-dark mb-1">
                Species
              </label>
              <input
                type="text"
                id="plantSpecies"
                value={plantSpecies || ""}
                onChange={(e) => setPlantSpecies(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                placeholder="e.g., Ficus lyrata"
                maxLength={100}
              />
            </div>

            <div>
              <label htmlFor="plantLocation" className="block text-sm font-medium text-eco-dark mb-1">
                Location
              </label>
              <input
                type="text"
                id="plantLocation"
                value={plantLocation || ""}
                onChange={(e) => setPlantLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                placeholder="e.g., Living room window"
                maxLength={100}
              />
            </div>
          </div>
        </div>

        {/* Care Schedule Section */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-eco-dark mb-3">Care Schedule (Optional)</h3>
          <p className="text-sm text-gray-600 mb-4">Set up automatic reminders for plant care</p>
          
          {[
            {
              id: "watering",
              label: "Watering",
              icon: "💧",
              defaultFreq: 7,
              freq: wateringFreq,
              setFreq: setWateringFreq,
              lastDone: wateringLastDone,
              setLastDone: setWateringLastDone,
              description: "How often to water (in days)"
            },
            {
              id: "fertilizing",
              label: "Fertilizing",
              icon: "🌿",
              defaultFreq: 30,
              freq: fertilizingFreq,
              setFreq: setFertilizingFreq,
              lastDone: fertilizingLastDone,
              setLastDone: setFertilizingLastDone,
              description: "How often to fertilize (in days)"
            },
            {
              id: "pruning",
              label: "Pruning",
              icon: "✂️",
              defaultFreq: 90,
              freq: pruningFreq,
              setFreq: setPruningFreq,
              lastDone: pruningLastDone,
              setLastDone: setPruningLastDone,
              description: "How often to prune (in days)"
            }
          ].map((care) => (
            <div key={care.id} className="mb-4 p-3 bg-white rounded border">
              <h4 className="font-medium text-eco-dark mb-2 flex items-center">
                <span className="mr-2">{care.icon}</span>
                {care.label}
              </h4>
              <p className="text-xs text-gray-500 mb-2">{care.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-eco-dark mb-1">
                    Frequency (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={care.freq || ""}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      care.setFreq(isNaN(value) ? "" : value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    placeholder={`Default: ${care.defaultFreq} days`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-eco-dark mb-1">
                    Last Done
                  </label>
                  <input
                    type="date"
                    value={care.lastDone || ""}
                    onChange={(e) => care.setLastDone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 ${
            isFormValid() && !isAddingPlant
              ? "bg-gradient-to-r from-eco-green to-eco-blue text-white hover:shadow-lg hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isFormValid() || isAddingPlant}
        >
          {isAddingPlant ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
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
              <span>Adding Plant...</span>
            </>
          ) : (
            <>
              <PlusCircle size={20} />
              <span>Add Plant</span>
            </>
          )}
        </button>

        {!isFormValid() && (plantName || datePlanted || status) && (
          <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
            <p className="font-medium">Please complete the required fields:</p>
            <ul className="mt-1 list-disc list-inside space-y-1">
              {!plantName.trim() && <li>Plant name is required</li>}
              {!isValidDate(datePlanted) && <li>Valid date planted is required</li>}
              {!status && <li>Plant status is required</li>}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddPlantForm;