import React from 'react';
import PropTypes from 'prop-types';

/**
 * Toast - small fixed-position notification bar; caller fully controls visibility.
 *
 * @param {string} message - Text shown in the toast.
 * @param {string} [actionLabel] - Label for the optional action button.
 * @param {Function} [onAction] - Called when the action button is clicked.
 * @param {Function} [onDismiss] - Called when dismissed; omit to hide the dismiss button.
 * @returns {JSX.Element} The rendered toast.
 */
const Toast = ({ message, actionLabel, onAction, onDismiss }) => (
  <div className="app-toast" role="status">
    <span className="app-toast-message">{message}</span>
    {actionLabel && onAction && (
      <button className="app-toast-action" onClick={onAction}>
        {actionLabel}
      </button>
    )}
    {onDismiss && (
      <button className="app-toast-dismiss" onClick={onDismiss} aria-label="Dismiss">
        &times;
      </button>
    )}
  </div>
);

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  onDismiss: PropTypes.func,
};

export default Toast;
