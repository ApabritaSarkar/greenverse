// src/components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, plant }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{plant.name}</h2>
        <img src={plant.image} alt={plant.name} />
        <p>{plant.description}</p>
        <h3>Care Tips:</h3>
        <p>{plant.careTips}</p>
        {/* Add user reviews or comments here */}
      </div>
    </div>
  );
};

export default Modal;
