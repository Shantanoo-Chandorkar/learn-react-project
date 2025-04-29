import React, { useState } from 'react';
import './styles/Step2_ImportOptions.css';

const Step2_ImportOptions = ({ htmlContent, onSubmit }) => {
  const [saveText, setSaveText] = useState(false);
  const [saveXml, setSaveXml] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ text: saveText, xml: saveXml });
  };

  return (
    <div className="step2-container">
      <h2 className="step2-title">Import Options</h2>

      <div
        className="step2-preview"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>

      <form className="step2-form" onSubmit={handleSubmit}>
        <label className="step2-toggle">
          <input
            type="checkbox"
            checked={saveText}
            onChange={() => setSaveText(!saveText)}
          />
          Save as Text
        </label>

        <label className="step2-toggle">
          <input
            type="checkbox"
            checked={saveXml}
            onChange={() => setSaveXml(!saveXml)}
          />
          Save as XML
        </label>

        <button type="submit" className="step2-button">Continue</button>
      </form>
    </div>
  );
};

export default Step2_ImportOptions;
