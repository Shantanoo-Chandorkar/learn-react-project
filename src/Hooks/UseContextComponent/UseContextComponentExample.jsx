import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
  memo,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import './style.css';

// 1. Create Contexts
const NotificationContext = createContext();
const ThemeContext = createContext();

/**
 * Custom hook to use notification context
 */
const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

/**
 * Custom hook to use theme context
 */
const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};

// 2. Notification Provider
const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showNotification = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, []);

  const value = useMemo(() => ({ showNotification }), [showNotification]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {visible && (
        <div className="use-context-notification" role="alert">
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// 3. Theme Provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Update body class (using a local container instead of document.body for safety in this example)
  useEffect(() => {
    const container = document.querySelector('.use-context-outer-container');
    if (container) {
      container.classList.remove('light', 'dark');
      container.classList.add(theme);
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// 4. Pure Presentational Components
const ProfileSettings = memo(() => {
  const { showNotification } = useNotification();

  return (
    <div className="use-context-profile-settings">
      <h3>Profile Settings ⚙️</h3>
      <button
        className="use-context-button"
        onClick={() => showNotification('Profile updated successfully!')}
      >
        Save Changes
      </button>
    </div>
  );
});
ProfileSettings.displayName = 'ProfileSettings';

const ProductPage = memo(() => {
  const { showNotification } = useNotification();

  return (
    <div className="use-context-product-page">
      <h3>Product Page 🛒</h3>
      <button
        className="use-context-button"
        onClick={() => showNotification('Product added to cart!')}
      >
        Add to Cart
      </button>
    </div>
  );
});
ProductPage.displayName = 'ProductPage';

const ThemeSwitcher = memo(() => {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <div className="use-context-theme-switcher">
      <span>
        Current Theme: <strong>{theme}</strong>
      </span>
      <button className="use-context-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
});
ThemeSwitcher.displayName = 'ThemeSwitcher';

/**
 * Main App Container
 */
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
