import { useState, useEffect } from "react";
import "./style.css"; // Importing the CSS separately

const UseEffectComponentExample = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Saved");
  const [savedText, setSavedText] = useState("Nothing saved yet.");

  useEffect(() => {
    if (text.trim() === "") {
      setStatus("Saved");
      setSavedText("Nothing saved yet.");
      return;
    }


    setStatus("Saving...");

    const timeoutId = setTimeout(() => {
      setSavedText(text);
      setStatus("Saved");
    }, 1000); // save after 1 second of inactivity

    return () => clearTimeout(timeoutId); // cleanup on new typing
  }, [text]);

  return (
    <div className="auto-save-form-outer-container">
      <h2 className="auto-save-form-header">Auto-Save Notes 📝</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing your notes here..."
        className="auto-save-form-textarea"
      />

      <p className="auto-save-form-status">{status}</p>

      <div className="auto-save-form-saved-preview">
        <h4>Last Saved Content:</h4>
        <p>{savedText}</p>
      </div>
    </div>
  );
};

export default UseEffectComponentExample;
