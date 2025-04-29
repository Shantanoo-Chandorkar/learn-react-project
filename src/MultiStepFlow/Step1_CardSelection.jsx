import React from 'react';
import './styles/Step1_CardSelection.css';

const Step1_CardSelection = ({ onCardClick }) => {
  return (
    <div className="step1-container">
      <h2 className="step1-title">Choose an HTML Source</h2>
      <div className="step1-card" onClick={onCardClick}>
        <h3 className="step1-card-title">Import Content</h3>
        <p className="step1-card-description">
          Click here to fetch and import HTML content from an API.
        </p>
      </div>
    </div>
  );
};

export default Step1_CardSelection;
