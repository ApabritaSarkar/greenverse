import React, { useState, useEffect } from "react";
import {
  Heart,
  Droplets,
  Leaf,
  Scissors,
  AlertTriangle,
  CheckCircle,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  fetchHealthOverview,
  fetchCareReminders,
} from "../../services/plantHealthApi";

const HealthDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadHealthData();
  }, []);

  const loadHealthData = async () => {
    try {
      setLoading(true);
      const [overviewData, remindersData] = await Promise.all([
        fetchHealthOverview(),
        fetchCareReminders(),
      ]);
      setOverview(overviewData);
      setReminders(remindersData);
    } catch (err) {
      setError("Failed to load health data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-eco-green">Loading health dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
    );
  }

  const getUrgencyColor = (urgency, overdue) => {
    if (overdue) {
      return "bg-red-100 text-red-700 border-red-200";
    }
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case "watering":
        return <Droplets size={16} />;
      case "fertilizing":
        return <Leaf size={16} />;
      case "pruning":
        return <Scissors size={16} />;
      default:
        return <Calendar size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Health Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Plants</p>
              <p className="text-2xl font-bold text-eco-green">
                {overview?.totalPlants || 0}
              </p>
            </div>
            <Leaf className="text-eco-green" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Healthy Plants</p>
              <p className="text-2xl font-bold text-green-600">
                {overview?.healthyPlants || 0}
              </p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Need Attention</p>
              <p className="text-2xl font-bold text-yellow-600">
                {overview?.plantsNeedingAttention || 0}
              </p>
            </div>
            <AlertTriangle className="text-yellow-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Health Score</p>
              <p className="text-2xl font-bold text-eco-blue">
                {overview?.averageHealthScore || 0}%
              </p>
            </div>
            <TrendingUp className="text-eco-blue" size={32} />
          </div>
        </div>
      </div>

      {/* Care Reminders */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-eco-dark mb-4 flex items-center gap-2">
          <Calendar className="text-eco-green" />
          Care Reminders
        </h3>

        {reminders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle size={48} className="mx-auto mb-2 text-eco-green" />
            <p>All caught up! No pending care tasks.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.slice(0, 5).map((reminder, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${getUrgencyColor(
                  reminder.urgency,
                  reminder.overdue
                )}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getActionIcon(reminder.action)}
                    <div>
                      <p className="font-semibold">{reminder.plantName}</p>
                      <p className="text-sm capitalize">
                        {reminder.action}{" "}
                        {reminder.overdue
                          ? `(Overdue by ${Math.abs(
                              Math.ceil(
                                (new Date() - new Date(reminder.dueDate)) /
                                  (1000 * 60 * 60 * 24)
                              )
                            )}d)`
                          : "due soon"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {new Date(reminder.dueDate).toLocaleDateString()}
                    </p>
                    {reminder.overdue ? (
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                        Overdue
                      </span>
                    ) : (
                      <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded">
                        Due Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {reminders.length > 5 && (
              <p className="text-center text-gray-500 text-sm">
                +{reminders.length - 5} more reminders
              </p>
            )}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-eco-dark mb-4">
          Care Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Droplets className="text-blue-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Overdue Watering</p>
              <p className="font-semibold text-blue-600">
                {overview?.overdueWatering || 0} plants
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <Leaf className="text-green-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Overdue Fertilizing</p>
              <p className="font-semibold text-green-600">
                {overview?.overdueFertilizing || 0} plants
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <Scissors className="text-purple-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Overdue Pruning</p>
              <p className="font-semibold text-purple-600">
                {overview?.overduePruning || 0} plants
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;
