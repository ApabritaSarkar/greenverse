import React from 'react';
import { PlusCircle } from 'lucide-react';

const AddPlantForm = ({
  plantName,
  datePlanted,
  status,
  setPlantName,
  setDatePlanted,
  setStatus,
  handleAddPlant,
  isAddingPlant,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-eco-dark mb-4 font-inter border-b pb-3 border-eco-lightgreen">
        Add a New Plant
      </h2>
      <form onSubmit={handleAddPlant} className="space-y-4">
        <div>
          <label htmlFor="plantName" className="block text-sm font-medium text-eco-dark mb-1">
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
          <label htmlFor="datePlanted" className="block text-sm font-medium text-eco-dark mb-1">
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
          <label htmlFor="plantStatus" className="block text-sm font-medium text-eco-dark mb-1">
            Status
          </label>
          <input
            type="text"
            id="plantStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
            placeholder="e.g., Thriving, Needs water, Growing"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-full flex items-center justify-center space-x-2"
          disabled={isAddingPlant}
        >
          {isAddingPlant ? (
            <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <PlusCircle size={20} />
          )}
          <span>{isAddingPlant ? 'Adding...' : 'Add Plant'}</span>
        </button>
      </form>
    </div>
  );
};

export default AddPlantForm;
