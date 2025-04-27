import { useState, useEffect, useRef } from "react";
import "./style.css";

const LOCAL_STORAGE_KEY = "autoSavedDraft";

const UseRefComponentExample = () => {
  const [inputValue, setInputValue] = useState("");
  const [savedDraft, setSavedDraft] = useState("");
  const [lastSubmitted, setLastSubmitted] = useState("");
  const [status, setStatus] = useState("Saved");
  const [dummyRender, setDummyRender] = useState(false);

  const currentInputRef = useRef("");
  const previousInputRef = useRef("");
  const isDirtyRef = useRef(false);
  const saveTimeoutRef = useRef(null);

  // Load saved draft from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setInputValue(saved);
      setSavedDraft(saved);
      currentInputRef.current = saved;
      previousInputRef.current = "";
      setStatus("Draft restored from last session 🔥");
    }
  }, []);

  // Handle beforeunload if dirty
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirtyRef.current) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Handle auto-saving after user stops typing
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    if (inputValue !== savedDraft) {
      isDirtyRef.current = true;
      setStatus("Unsaved changes...");

      saveTimeoutRef.current = setTimeout(() => {
        setSavedDraft(inputValue);
        isDirtyRef.current = false;
        setStatus("Draft saved ✅");

        // Save into localStorage
        localStorage.setItem(LOCAL_STORAGE_KEY, inputValue);
      }, 1500);
    } else {
      isDirtyRef.current = false;
      setStatus("Saved");
    }
  }, [inputValue, savedDraft]);

  const handleInputChange = (e) => {
    previousInputRef.current = currentInputRef.current;
    currentInputRef.current = e.target.value;
    setInputValue(e.target.value);

    setDummyRender(prev => !prev); // Force re-render
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLastSubmitted(inputValue);
    setSavedDraft(inputValue);
    isDirtyRef.current = false;
    setStatus("Form submitted 🚀");

    // Save submitted value in localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, inputValue);
  };

  return (
    <div className="use-ref-component-outer-container">
      <h2 className="use-ref-component-header">📝 Advanced Form Tracker</h2>

      <form onSubmit={handleSubmit} className="use-ref-component-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type something..."
          className="use-ref-component-input"
        />
        <button type="submit" className="use-ref-component-submit-button">
          Submit
        </button>
      </form>

      <div className="use-ref-component-info">
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Current Input:</strong> {currentInputRef.current || "Nothing yet"}</p>
        <p><strong>Previous Input:</strong> {previousInputRef.current || "Nothing yet"}</p>
        <p><strong>Last Submitted:</strong> {lastSubmitted || "Nothing yet"}</p>
        <p><strong>Auto-Saved Draft:</strong> {savedDraft || "No draft saved"}</p>
      </div>
    </div>
  );
};

export default UseRefComponentExample;
