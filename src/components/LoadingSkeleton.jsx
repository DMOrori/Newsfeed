
import React from "react";
import PropTypes from "prop-types";
import "./LoadingSkeleton.css";

/**
 * LoadingSkeleton Component
 * Displays shimmer placeholders while news cards are loading.
 */
export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div
      className="skeleton-grid-container"
      role="status"
      aria-busy="true"
      aria-label="Loading news content..."
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image shimmer"></div>
          <div className="skeleton-content">
            <div className="skeleton-line shimmer short"></div>
            <div className="skeleton-line shimmer"></div>
            <div className="skeleton-line shimmer"></div>
            <div className="skeleton-line shimmer very-short"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ✅ Prop validation for flexibility
LoadingSkeleton.propTypes = {
  count: PropTypes.number,
};
