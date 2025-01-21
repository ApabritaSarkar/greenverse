import React from 'react';
import '../styles/modal.css';

const Modal = ({ isOpen, onClose, plant }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 className="modal-plant-name">{plant.name}</h2>
        <img className="modal-plant-image" src={plant.image} alt={plant.name} />
        <p className="modal-plant-description">{plant.description}</p>
        <h3 className="modal-care-title">Care Tips:</h3>
        <p className="modal-care-tips">{plant.careTips}</p>
        {/* Add user reviews or comments section here */}
      </div>
    </div>
  );
};

export default Modal;
