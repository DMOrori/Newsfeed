import React from "react";
import PropTypes from "prop-types";
import "./Loader.css";

/**
 * Loader Component
 * Displays a centered spinner with a loading message.
 */
export default function Loader({ message = "Fetching the latest headlines..." }) {
  return (
    <div
      className="loader-container"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <div className="spinner" aria-hidden="true"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
}

// ✅ Prop validation for flexibility
Loader.propTypes = {
  message: PropTypes.string,
};
