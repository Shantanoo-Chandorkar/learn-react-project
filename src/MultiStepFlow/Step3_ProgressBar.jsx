import React, { useEffect, useState } from 'react';
import './styles/Step3_ProgressBar.css';

const Step3_ProgressBar = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // small delay before next step
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 5;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="step3-container">
      <h2 className="step3-title">Processing Your Import...</h2>
      <div className="step3-progress-bar">
        <div
          className="step3-progress-fill"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
      <p className="step3-progress-text">{Math.min(progress, 100)}%</p>
    </div>
  );
};

export default Step3_ProgressBar;
