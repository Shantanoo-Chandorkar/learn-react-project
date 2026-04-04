import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const LOCAL_STORAGE_KEY = 'autoSavedDraft';

/**
 * Custom hook for form tracking logic
 * @returns {object} { inputValue, status, savedDraft, lastSubmitted, currentInput, previousInput, handleInputChange, handleSubmit }
 */
const useFormTracker = () => {
  const [inputValue, setInputValue] = useState('');
  const [savedDraft, setSavedDraft] = useState('');
  const [lastSubmitted, setLastSubmitted] = useState('');
  const [status, setStatus] = useState('Saved');

  const currentInputRef = useRef('');
  const previousInputRef = useRef('');
  const isDirtyRef = useRef(false);
  const saveTimeoutRef = useRef(null);

  // Load saved draft from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setInputValue(saved);
      setSavedDraft(saved);
      currentInputRef.current = saved;
      previousInputRef.current = '';
      setStatus('Draft restored from last session 🔥');
    }
  }, []);

  // Handle beforeunload if dirty
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirtyRef.current) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Handle auto-saving after user stops typing
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    if (inputValue !== savedDraft) {
      isDirtyRef.current = true;
      setStatus('Unsaved changes...');

      saveTimeoutRef.current = setTimeout(() => {
        setSavedDraft(inputValue);
        isDirtyRef.current = false;
        setStatus('Draft saved ✅');
        localStorage.setItem(LOCAL_STORAGE_KEY, inputValue);
      }, 1500);
    } else {
      isDirtyRef.current = false;
      setStatus('Saved');
    }
  }, [inputValue, savedDraft]);

  const handleInputChange = useCallback((value) => {
    previousInputRef.current = currentInputRef.current;
    currentInputRef.current = value;
    setInputValue(value);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setLastSubmitted(currentInputRef.current);
    setSavedDraft(currentInputRef.current);
    isDirtyRef.current = false;
    setStatus('Form submitted 🚀');
    localStorage.setItem(LOCAL_STORAGE_KEY, currentInputRef.current);
  }, []);

  return {
    inputValue,
    status,
    savedDraft,
    lastSubmitted,
    currentInput: currentInputRef.current,
    previousInput: previousInputRef.current,
    handleInputChange,
    handleSubmit,
  };
};

/**
 * Pure presentational component for Form Tracker UI
 */
const FormTrackerUI = memo(
  ({
    inputValue,
    status,
    savedDraft,
    lastSubmitted,
    currentInput,
    previousInput,
    onInputChange,
    onSubmit,
  }) => (
    <div className="use-ref-component-outer-container">
      <h2 className="use-ref-component-header">📝 Advanced Form Tracker</h2>

      <form onSubmit={onSubmit} className="use-ref-component-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type something..."
          className="use-ref-component-input"
          aria-label="Form input"
        />
        <button type="submit" className="use-ref-component-submit-button">
          Submit
        </button>
      </form>

      <div className="use-ref-component-info">
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Current Input:</strong> {currentInput || 'Nothing yet'}
        </p>
        <p>
          <strong>Previous Input:</strong> {previousInput || 'Nothing yet'}
        </p>
        <p>
          <strong>Last Submitted:</strong> {lastSubmitted || 'Nothing yet'}
        </p>
        <p>
          <strong>Auto-Saved Draft:</strong> {savedDraft || 'No draft saved'}
        </p>
      </div>
    </div>
  ),
);

FormTrackerUI.displayName = 'FormTrackerUI';
FormTrackerUI.propTypes = {
  inputValue: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  savedDraft: PropTypes.string.isRequired,
  lastSubmitted: PropTypes.string.isRequired,
  currentInput: PropTypes.string.isRequired,
  previousInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

/**
 * Container component for the UseRef example
 */
const UseRefComponentExample = () => {
  const { handleInputChange, handleSubmit, ...rest } = useFormTracker();

  return <FormTrackerUI onInputChange={handleInputChange} onSubmit={handleSubmit} {...rest} />;
};

export default UseRefComponentExample;
