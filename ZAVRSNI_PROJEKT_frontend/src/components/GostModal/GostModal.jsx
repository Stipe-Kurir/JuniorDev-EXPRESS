import React from 'react';
import './GostModalStyle.css';

const GostModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <h2 className="modal-title">Niste prijavljeni</h2>
          <p className="modal-paragraph">Molimo prijavite se kako biste nastavili.</p>
        </div>
      </div>
    </div>
  );
};

export default GostModal;
