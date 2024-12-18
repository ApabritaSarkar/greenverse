// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getPlants = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/plants`);
        return response.data;
    } catch (error) {
        console.error('Error fetching plants:', error);
        throw error;
    }
};

export const addPlant = async (plantData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/plants`, plantData);
        return response.data;
    } catch (error) {
        console.error('Error adding plant:', error);
        throw error;
    }
};

export const updatePlant = async (id, plantData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/plants/${id}`, plantData);
        return response.data;
    } catch (error) {
        console.error('Error updating plant:', error);
        throw error;
    }
};

export const deletePlant = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/plants/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting plant:', error);
        throw error;
    }
};
