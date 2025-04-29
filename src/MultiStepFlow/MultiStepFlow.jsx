import React, { useState } from 'react';
import './styles/MultiStepFlow.css';

import Step1_CardSelection from './Step1_CardSelection';
import Step2_ImportOptions from './Step2_ImportOptions';
import Step3_ProgressBar from './Step3_ProgressBar';
import Step4_Success from './Step4_Success';

const MultiStepFlow = () => {
  const [step, setStep] = useState(1);
  const [htmlContent, setHtmlContent] = useState('');
  const [saveAsText, setSaveAsText] = useState(false);
  const [saveAsXml, setSaveAsXml] = useState(false);

  const handleCardClick = () => {
    // Simulate API fetch with setTimeout
    setStep(2);
    setTimeout(() => {
      setHtmlContent('<h1>Fetched HTML Content</h1><p>This is some imported content.</p>');
    }, 1000);
  };

  const handleOptionsSubmit = ({ text, xml }) => {
    setSaveAsText(text);
    setSaveAsXml(xml);
    setStep(3);
  };

  const handleProcessingComplete = () => {
    setStep(4);
  };

  return (
    <div className="multi-step-container">
      {step === 1 && <Step1_CardSelection onCardClick={handleCardClick} />}
      {step === 2 && (
        <Step2_ImportOptions
          htmlContent={htmlContent}
          onSubmit={handleOptionsSubmit}
        />
      )}
      {step === 3 && <Step3_ProgressBar onComplete={handleProcessingComplete} />}
      {step === 4 && <Step4_Success />}
    </div>
  );
};

export default MultiStepFlow;
