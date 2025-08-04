import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, addPlant, logout } from "../../services/profileApi";
import UserInfo from "./UserInfo";
import OwnedPlants from "./OwnedPlants";
import AddPlantForm from "./AddPlantForm";
import LogoutButton from "./LogoutButton";
import HealthDashboard from "../plantHealth/HealthDashboard";

const Profile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("plants");

  const [plantName, setPlantName] = useState("");
  const [datePlanted, setDatePlanted] = useState("");
  const [status, setStatus] = useState("");
  const [isAddingPlant, setIsAddingPlant] = useState(false);

  const [plantSpecies, setPlantSpecies] = useState("");
  const [plantLocation, setPlantLocation] = useState("");

  const [wateringFreq, setWateringFreq] = useState("");
  const [fertilizingFreq, setFertilizingFreq] = useState("");
  const [pruningFreq, setPruningFreq] = useState("");

  const [wateringLastDone, setWateringLastDone] = useState("");
  const [fertilizingLastDone, setFertilizingLastDone] = useState("");
  const [pruningLastDone, setPruningLastDone] = useState("");

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchUserProfile();
        const normalizedUser = {
          ...data,
          plants: data.plants || [],
          profilePicture:
            data.profilePicture ||
            "https://placehold.co/150x150/9AE6B4/2D3748?text=User",
          bio: data.bio || "No bio provided.",
          memberSince: data.memberSince || "N/A",
          plantsOwned: data.plants?.length || 0,
        };
        setUser(normalizedUser);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message || "Failed to load profile.");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [navigate, setIsLoggedIn]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleAddPlant = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!plantName || !datePlanted || !status) {
      setError("Please fill in all plant details.");
      return;
    }

    setIsAddingPlant(true);
    const newPlant = {
      name: plantName,
      datePlanted,
      status,
      species: plantSpecies,
      location: plantLocation,
      wateringFrequency: wateringFreq,
      wateringLastDone,
      fertilizingFrequency: fertilizingFreq,
      fertilizingLastDone,
      pruningFrequency: pruningFreq,
      pruningLastDone,
    };

    try {
      const data = await addPlant(newPlant);
      setUser((prev) => ({
        ...prev,
        plants: [
          ...(prev.plants || []),
          { ...data, _id: data._id || `temp_${Date.now()}` },
        ],
        plantsOwned: (prev.plantsOwned || 0) + 1,
      }));

      // Reset form fields
      setPlantName("");
      setDatePlanted("");
      setStatus("");
      setPlantSpecies("");
      setPlantLocation("");
      setWateringFreq("");
      setFertilizingFreq("");
      setPruningFreq("");
      setWateringLastDone("");
      setFertilizingLastDone("");
      setPruningLastDone("");

      setMessage("Plant added successfully!");
    } catch (err) {
      setError("Failed to add plant: " + err.message);
    } finally {
      setIsAddingPlant(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-eco-offwhite pt-20">
        <div className="text-eco-green text-xl font-semibold">
          Loading user profile...
        </div>
      </div>
    );
  }

  if (!user && error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-eco-offwhite pt-20">
        <p className="text-red-600 text-center p-6">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-eco-offwhite p-4 pt-20 font-roboto">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-eco-green text-eco-green"
                  : "border-transparent text-gray-500"
              }`}
            >
              Health Overview
            </button>
            <button
              onClick={() => setActiveTab("plants")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "plants"
                  ? "border-eco-green text-eco-green"
                  : "border-transparent text-gray-500"
              }`}
            >
              My Plants
            </button>
            <button
              onClick={() => setActiveTab("add-plant")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "add-plant"
                  ? "border-eco-green text-eco-green"
                  : "border-transparent text-gray-500"
              }`}
            >
              Add Plant
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "profile"
                  ? "border-eco-green text-eco-green"
                  : "border-transparent text-gray-500"
              }`}
            >
              Profile Info
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && <HealthDashboard />}

          {activeTab === "plants" && <OwnedPlants plants={user.plants} />}

          {activeTab === "add-plant" && (
            <AddPlantForm
              plantName={plantName}
              setPlantName={setPlantName}
              datePlanted={datePlanted}
              setDatePlanted={setDatePlanted}
              status={status}
              setStatus={setStatus}
              handleAddPlant={handleAddPlant}
              isAddingPlant={isAddingPlant}
              message={message}
              error={error}
              plantSpecies={plantSpecies}
              setPlantSpecies={setPlantSpecies}
              plantLocation={plantLocation}
              setPlantLocation={setPlantLocation}
              wateringFreq={wateringFreq}
              setWateringFreq={setWateringFreq}
              fertilizingFreq={fertilizingFreq}
              setFertilizingFreq={setFertilizingFreq}
              pruningFreq={pruningFreq}
              setPruningFreq={setPruningFreq}
              wateringLastDone={wateringLastDone}
              setWateringLastDone={setWateringLastDone}
              fertilizingLastDone={fertilizingLastDone}
              setFertilizingLastDone={setFertilizingLastDone}
              pruningLastDone={pruningLastDone}
              setPruningLastDone={setPruningLastDone}
            />
          )}

          {activeTab === "profile" && (
            <>
              <UserInfo user={user} />
              <LogoutButton handleLogout={handleLogout} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
