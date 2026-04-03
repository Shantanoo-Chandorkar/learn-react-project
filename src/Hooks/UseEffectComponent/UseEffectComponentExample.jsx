import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

/**
 * Custom hook for auto-save logic
 * @returns {object} { text, setText, status, savedText }
 */
const useAutoSave = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('Saved');
  const [savedText, setSavedText] = useState('Nothing saved yet.');

  useEffect(() => {
    if (text.trim() === '') {
      setStatus('Saved');
      setSavedText('Nothing saved yet.');
      return;
    }

    setStatus('Saving...');

    const timeoutId = setTimeout(() => {
      setSavedText(text);
      setStatus('Saved');
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [text]);

  return { text, setText, status, savedText };
};

/**
 * Pure presentational component for Auto-Save UI
 */
const AutoSaveUI = memo(({ text, onTextChange, status, savedText }) => (
  <div className="auto-save-form-outer-container">
    <h2 className="auto-save-form-header">Auto-Save Notes 📝</h2>

    <textarea
      value={text}
      onChange={(e) => onTextChange(e.target.value)}
      placeholder="Start typing your notes here..."
      className="auto-save-form-textarea"
      aria-label="Notes input"
    />

    <p className="auto-save-form-status">{status}</p>

    <div className="auto-save-form-saved-preview">
      <h4>Last Saved Content:</h4>
      <p>{savedText}</p>
    </div>
  </div>
));

AutoSaveUI.displayName = 'AutoSaveUI';
AutoSaveUI.propTypes = {
  text: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  savedText: PropTypes.string.isRequired,
};

/**
 * Container component for the UseEffect example
 */
const UseEffectComponentExample = () => {
  const { text, setText, status, savedText } = useAutoSave();

  return <AutoSaveUI text={text} onTextChange={setText} status={status} savedText={savedText} />;
};

export default UseEffectComponentExample;
