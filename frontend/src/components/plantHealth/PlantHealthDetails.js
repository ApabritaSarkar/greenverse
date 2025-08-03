import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Calendar, 
  Droplets, 
  Leaf, 
  Scissors, 
  Plus,
  Edit3,
  Activity,
  X
} from 'lucide-react';
import { 
  fetchPlantHealthDetails, 
  logCareAction, 
  updatePlantHealth,
  updateCareSchedule 
} from '../../services/plantHealthApi';

const PlantHealthDetails = ({ plantId, onClose }) => {
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCareForm, setShowCareForm] = useState(false);
  const [showHealthForm, setShowHealthForm] = useState(false);
  const [careAction, setCareAction] = useState('watered');
  const [careNotes, setCareNotes] = useState('');
  const [healthStatus, setHealthStatus] = useState('healthy');
  const [healthScore, setHealthScore] = useState(100);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPlantData();
  }, [plantId]);

  const loadPlantData = async () => {
    try {
      setLoading(true);
      const data = await fetchPlantHealthDetails(plantId);
      setPlantData(data);
      setHealthStatus(data.plant.status);
      setHealthScore(data.plant.healthScore);
    } catch (err) {
      setError('Failed to load plant data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogCare = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await logCareAction(plantId, careAction, careNotes);
      setCareNotes('');
      setShowCareForm(false);
      await loadPlantData(); // Refresh data
    } catch (err) {
      setError('Failed to log care action');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateHealth = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await updatePlantHealth(plantId, {
        status: healthStatus,
        healthScore: healthScore
      });
      setShowHealthForm(false);
      await loadPlantData(); // Refresh data
    } catch (err) {
      setError('Failed to update plant health');
    } finally {
      setSubmitting(false);
    }
  };

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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl">
          <div className="text-eco-green">Loading plant details...</div>
        </div>
      </div>
    );
  }

  if (error && !plantData) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl max-w-md">
          <div className="text-red-600 mb-4">{error}</div>
          <button 
            onClick={onClose}
            className="bg-eco-green text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-eco-green flex items-center gap-2">
              <Heart className="text-red-500" />
              {plantData?.plant.name} Health Details
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Plant Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-eco-lightgreen/20 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Status</span>
                <button 
                  onClick={() => setShowHealthForm(true)}
                  className="text-eco-green hover:text-eco-blue"
                >
                  <Edit3 size={16} />
                </button>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(plantData?.plant.status)}`}>
                {plantData?.plant.status?.replace('_', ' ')}
              </span>
            </div>

            <div className="bg-eco-lightgreen/20 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">Health Score</div>
              <div className={`text-2xl font-bold ${getHealthScoreColor(plantData?.plant.healthScore)}`}>
                {plantData?.plant.healthScore}%
              </div>
            </div>

            <div className="bg-eco-lightgreen/20 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">Age</div>
              <div className="text-lg font-semibold text-eco-dark">
                {Math.floor((new Date() - new Date(plantData?.plant.datePlanted)) / (1000 * 60 * 60 * 24))} days
              </div>
            </div>
          </div>

          {/* Care Schedule */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-eco-dark mb-4 flex items-center gap-2">
              <Calendar className="text-eco-green" />
              Care Schedule
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CareScheduleItem 
                icon={<Droplets className="text-blue-600" />}
                title="Watering"
                schedule={plantData?.plant.careSchedule?.watering}
                color="blue"
              />
              <CareScheduleItem 
                icon={<Leaf className="text-green-600" />}
                title="Fertilizing"
                schedule={plantData?.plant.careSchedule?.fertilizing}
                color="green"
              />
              <CareScheduleItem 
                icon={<Scissors className="text-purple-600" />}
                title="Pruning"
                schedule={plantData?.plant.careSchedule?.pruning}
                color="purple"
              />
            </div>
          </div>

          {/* Care Statistics */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-eco-dark mb-4 flex items-center gap-2">
              <Activity className="text-eco-green" />
              Care Statistics (Last 30 Days)
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {plantData?.careStats.wateringCount || 0}
                </div>
                <div className="text-sm text-gray-600">Times Watered</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {plantData?.careStats.fertilizingCount || 0}
                </div>
                <div className="text-sm text-gray-600">Times Fertilized</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {plantData?.careStats.pruningCount || 0}
                </div>
                <div className="text-sm text-gray-600">Times Pruned</div>
              </div>
              <div className="text-center p-4 bg-eco-lightgreen/30 rounded-lg">
                <div className="text-2xl font-bold text-eco-green">
                  {plantData?.careStats.totalCareActions || 0}
                </div>
                <div className="text-sm text-gray-600">Total Actions</div>
              </div>
            </div>
          </div>

          {/* Recent Care Log */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-eco-dark">Recent Care Log</h3>
              <button 
                onClick={() => setShowCareForm(true)}
                className="bg-eco-green text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-eco-blue transition-colors"
              >
                <Plus size={16} />
                Log Care
              </button>
            </div>
            
            {plantData?.recentCareLog?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar size={48} className="mx-auto mb-2 text-gray-300" />
                <p>No recent care actions logged</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {plantData?.recentCareLog?.map((log, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {log.action === 'watered' && <Droplets className="text-blue-600" size={20} />}
                      {log.action === 'fertilized' && <Leaf className="text-green-600" size={20} />}
                      {log.action === 'pruned' && <Scissors className="text-purple-600" size={20} />}
                      {!['watered', 'fertilized', 'pruned'].includes(log.action) && 
                        <Calendar className="text-gray-600" size={20} />}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium capitalize">{log.action}</p>
                          {log.notes && (
                            <p className="text-sm text-gray-600">{log.notes}</p>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(log.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Care Action Form Modal */}
          {showCareForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
              <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Log Care Action</h3>
                <form onSubmit={handleLogCare} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Care Action
                    </label>
                    <select 
                      value={careAction}
                      onChange={(e) => setCareAction(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-eco-green focus:border-eco-green"
                    >
                      <option value="watered">Watered</option>
                      <option value="fertilized">Fertilized</option>
                      <option value="pruned">Pruned</option>
                      <option value="repotted">Repotted</option>
                      <option value="rotated">Rotated</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes (Optional)
                    </label>
                    <textarea 
                      value={careNotes}
                      onChange={(e) => setCareNotes(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-eco-green focus:border-eco-green"
                      rows="3"
                      placeholder="Any additional notes about this care action..."
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-eco-green text-white py-2 rounded-lg hover:bg-eco-blue transition-colors disabled:opacity-50"
                    >
                      {submitting ? 'Logging...' : 'Log Care Action'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowCareForm(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Health Update Form Modal */}
          {showHealthForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
              <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Update Plant Health</h3>
                <form onSubmit={handleUpdateHealth} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Health Status
                    </label>
                    <select 
                      value={healthStatus}
                      onChange={(e) => setHealthStatus(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-eco-green focus:border-eco-green"
                    >
                      <option value="thriving">Thriving</option>
                      <option value="healthy">Healthy</option>
                      <option value="needs_attention">Needs Attention</option>
                      <option value="critical">Critical</option>
                      <option value="dormant">Dormant</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Health Score (0-100)
                    </label>
                    <input 
                      type="number"
                      min="0"
                      max="100"
                      value={healthScore}
                      onChange={(e) => setHealthScore(parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-eco-green focus:border-eco-green"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-eco-green text-white py-2 rounded-lg hover:bg-eco-blue transition-colors disabled:opacity-50"
                    >
                      {submitting ? 'Updating...' : 'Update Health'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowHealthForm(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for care schedule items
const CareScheduleItem = ({ icon, title, schedule, color }) => {
  const getNextDueStatus = (nextDue) => {
    if (!nextDue) return 'Not scheduled';
    
    const now = new Date();
    const due = new Date(nextDue);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} days`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  const getStatusColor = (nextDue) => {
    if (!nextDue) return 'text-gray-500';
    
    const now = new Date();
    const due = new Date(nextDue);
    const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'text-red-600';
    if (diffDays <= 1) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className={`p-4 rounded-lg bg-${color}-50 border border-${color}-200`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-medium text-gray-800">{title}</span>
      </div>
      <div className="text-sm space-y-1">
        <div>
          <span className="text-gray-600">Every:</span> {schedule?.frequency || 0} days
        </div>
        <div>
          <span className="text-gray-600">Last done:</span>{' '}
          {schedule?.lastDone 
            ? new Date(schedule.lastDone).toLocaleDateString()
            : 'Never'
          }
        </div>
        <div className={getStatusColor(schedule?.nextDue)}>
          {getNextDueStatus(schedule?.nextDue)}
        </div>
      </div>
    </div>
  );
};

export default PlantHealthDetails;
