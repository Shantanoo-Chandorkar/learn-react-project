import { useState, useContext, createContext, useEffect } from "react";
import "./style.css";

// 1. Create Contexts
const NotificationContext = createContext();
const ThemeContext = createContext();

// 2. Create Notification Provider
const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showNotification = (msg) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {visible && (
        <div className="use-context-notification">
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

// 3. Create Theme Provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Update body class
  useEffect(() => {
    const body = document.querySelector(".use-context-outer-container");
    body.classList.remove("light", "dark");
    body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Example child components
const ProfileSettings = () => {
  const { showNotification } = useContext(NotificationContext);

  return (
    <div className="use-context-profile-settings">
      <h3>Profile Settings ⚙️</h3>
      <button
        className="use-context-button"
        onClick={() => showNotification("Profile updated successfully!")}
      >
        Save Changes
      </button>
    </div>
  );
};

const ProductPage = () => {
  const { showNotification } = useContext(NotificationContext);

  return (
    <div className="use-context-product-page">
      <h3>Product Page 🛒</h3>
      <button
        className="use-context-button"
        onClick={() => showNotification("Product added to cart!")}
      >
        Add to Cart
      </button>
    </div>
  );
};

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="use-context-theme-switcher">
      <span>Current Theme: <strong>{theme}</strong></span>
      <button className="use-context-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

// 5. Main App
const UseContextComponentExample = () => {
  return (
    <div className="use-context-outer-container">
      <h2 className="use-context-header">🌍 Global State Management Example</h2>
      <ThemeProvider>
        <NotificationProvider>
          <div className="use-context-inner-container">
            <ThemeSwitcher />
            <ProfileSettings />
            <ProductPage />
          </div>
        </NotificationProvider>
      </ThemeProvider>
    </div>
  );
};

export default UseContextComponentExample;
