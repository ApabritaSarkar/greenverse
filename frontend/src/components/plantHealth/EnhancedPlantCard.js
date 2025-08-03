import React, { useState } from 'react';
import { 
  Heart, 
  Calendar, 
  Droplets, 
  AlertTriangle, 
  CheckCircle,
  Info,
  Leaf,
  Scissors
} from 'lucide-react';
import PlantHealthDetails from './PlantHealthDetails';

const EnhancedPlantCard = ({ plant, onCareUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'thriving': return 'bg-green-100 text-green-800';
      case 'healthy': return 'bg-green-100 text-green-700';
      case 'needs_attention': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'dormant': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getNextCareAction = () => {
    const now = new Date();
    const wateringDue = plant.careSchedule?.watering?.nextDue;
    const fertilizingDue = plant.careSchedule?.fertilizing?.nextDue;
    const pruningDue = plant.careSchedule?.pruning?.nextDue;

    const upcomingCare = [];
    
    if (wateringDue) {
      const diffDays = Math.ceil((new Date(wateringDue) - now) / (1000 * 60 * 60 * 24));
      upcomingCare.push({ action: 'watering', days: diffDays, icon: <Droplets size={14} /> });
    }
    
    if (fertilizingDue) {
      const diffDays = Math.ceil((new Date(fertilizingDue) - now) / (1000 * 60 * 60 * 24));
      upcomingCare.push({ action: 'fertilizing', days: diffDays, icon: <Leaf size={14} /> });
    }
    
    if (pruningDue) {
      const diffDays = Math.ceil((new Date(pruningDue) - now) / (1000 * 60 * 60 * 24));
      upcomingCare.push({ action: 'pruning', days: diffDays, icon: <Scissors size={14} /> });
    }

    upcomingCare.sort((a, b) => a.days - b.days);
    return upcomingCare[0];
  };

  const nextCare = getNextCareAction();

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
        {/* Plant Status Header */}
        <div className="p-4 bg-gradient-to-r from-eco-lightgreen/20 to-eco-blue/20">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-eco-dark text-lg">{plant.name}</h3>
            <div className="flex items-center gap-2">
              <Heart 
                className={`${getHealthScoreColor(plant.healthScore)} fill-current`} 
                size={20} 
              />
              <span className={`text-sm font-medium ${getHealthScoreColor(plant.healthScore)}`}>
                {plant.healthScore}%
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(plant.status)}`}>
              {plant.status?.replace('_', ' ')}
            </span>
            {plant.species && (
              <span className="text-xs text-gray-600 italic">{plant.species}</span>
            )}
          </div>
        </div>

        {/* Plant Details */}
        <div className="p-4">
          {plant.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Calendar size={14} />
              <span>Location: {plant.location}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Calendar size={14} />
            <span>Planted: {new Date(plant.datePlanted).toLocaleDateString()}</span>
          </div>

          {/* Next Care Action */}
          {nextCare && (
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg mb-3">
              <div className="flex items-center gap-2">
                {nextCare.icon}
                <span className="text-sm font-medium capitalize">{nextCare.action}</span>
              </div>
              <div className={`text-xs px-2 py-1 rounded ${
                nextCare.days < 0 
                  ? 'bg-red-100 text-red-700' 
                  : nextCare.days <= 1 
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
              }`}>
                {nextCare.days < 0 
                  ? `${Math.abs(nextCare.days)}d overdue` 
                  : nextCare.days === 0 
                    ? 'Due today'
                    : `${nextCare.days}d left`
                }
              </div>
            </div>
          )}

          {/* Plant Notes */}
          {plant.notes && (
            <div className="text-sm text-gray-600 mb-3 p-2 bg-eco-lightgreen/10 rounded">
              {plant.notes}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={() => setShowDetails(true)}
              className="flex-1 bg-eco-green text-white py-2 px-3 rounded-lg hover:bg-eco-blue transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Info size={14} />
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Health Details Modal */}
      {showDetails && (
        <PlantHealthDetails 
          plantId={plant._id}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default EnhancedPlantCard;