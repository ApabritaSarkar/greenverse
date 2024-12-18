import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Profile = ({ setIsLoggedIn }) => {
  const userData = {
    name: 'John Doe',
    bio: 'A plant enthusiast who loves to grow various species.',
    joinDate: '2024-01-15',
    contact: 'johndoe@example.com',
    plantsOwned: [
      { id: 1, name: 'Monstera', datePlanted: '2024-09-15', status: 'Healthy' },
      { id: 2, name: 'Snake Plant', datePlanted: '2024-10-01', status: 'Healthy' },
      { id: 3, name: 'Aloe Vera', datePlanted: '2024-10-10', status: 'Needs Watering' },
    ],
  };

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [plants, setPlants] = useState(userData.plantsOwned);
  const [newPlant, setNewPlant] = useState({ name: '', datePlanted: '', status: '' });
  const [showAddPlantForm, setShowAddPlantForm] = useState(false);
  const [updatePlant, setUpdatePlant] = useState(null);

  const handleDeletePlant = (id) => {
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    setPlants(updatedPlants);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlant({ ...newPlant, [name]: value });
  };

  const handleAddPlant = (e) => {
    e.preventDefault();
    if (newPlant.name && newPlant.datePlanted && newPlant.status) {
      const newPlantEntry = {
        id: plants.length + 1,
        ...newPlant,
      };
      setPlants([...plants, newPlantEntry]);
      setNewPlant({ name: '', datePlanted: '', status: '' });
      setShowAddPlantForm(false);
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatePlant({ ...updatePlant, [name]: value });
  };

  const handleUpdatePlant = (e) => {
    e.preventDefault();
    if (updatePlant) {
      const updatedPlants = plants.map((plant) =>
        plant.id === updatePlant.id ? updatePlant : plant
      );
      setPlants(updatedPlants);
      setUpdatePlant(null);
    }
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <h1>Profile</h1>

      <div className="profile-details">
        <h2>{userData.name}</h2>
        <p><strong>Bio:</strong> {userData.bio}</p>
        <p><strong>Joined on:</strong> {userData.joinDate}</p>
        <p><strong>Contact Info:</strong> {userData.contact}</p>
      </div>

      <div className="owned-plants">
        <h3>My Plants</h3>
        <input
          type="text"
          placeholder="Search plants..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date Planted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlants.map((plant) => (
              <tr key={plant.id}>
                <td>{plant.name}</td>
                <td>{plant.datePlanted}</td>
                <td>{plant.status}</td>
                <td>
                  <button onClick={() => setUpdatePlant(plant)}>Update</button>
                  <button onClick={() => handleDeletePlant(plant.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setShowAddPlantForm(true)}>Add Plant</button>

        {showAddPlantForm && (
          <form onSubmit={handleAddPlant}>
            <h4>Add a New Plant</h4>
            <input
              type="text"
              name="name"
              placeholder="Plant Name"
              value={newPlant.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="datePlanted"
              placeholder="Date Planted"
              value={newPlant.datePlanted}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={newPlant.status}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Add Plant</button>
            <button type="button" onClick={() => setShowAddPlantForm(false)}>Cancel</button>
          </form>
        )}

        {updatePlant && (
          <form onSubmit={handleUpdatePlant}>
            <h4>Update Plant</h4>
            <input
              type="text"
              name="name"
              placeholder="Plant Name"
              value={updatePlant.name}
              onChange={handleUpdateChange}
              required
            />
            <input
              type="date"
              name="datePlanted"
              placeholder="Date Planted"
              value={updatePlant.datePlanted}
              onChange={handleUpdateChange}
              required
            />
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={updatePlant.status}
              onChange={handleUpdateChange}
              required
            />
            <button type="submit">Update Plant</button>
            <button type="button" onClick={() => setUpdatePlant(null)}>Cancel</button>
          </form>
        )}
      </div>

      <div className="logout-button">
      <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
