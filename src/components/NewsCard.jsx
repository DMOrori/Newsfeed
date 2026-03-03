import React from "react";
import PropTypes from "prop-types";
import "./NewsCard.css";

/**
 * NewsCard Component
 * Displays a single news article card with image, title, summary, and link.
 */
export default function NewsCard({ news }) {
  // ✅ Prioritize NewsAPI image or fallback
  const imageUrl =
    news.urlToImage ||
    news.image ||
    "https://via.placeholder.com/600x400?text=Image+Unavailable";

  // ✅ Generate a short summary
  const summary = news.content
    ? news.content.slice(0, 150) + "..."
    : "Click below to read the full story.";

  // ✅ Format time safely
  const publishedTime = news.publishedAt
    ? new Date(news.publishedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : news.time || "N/A";

  // ✅ Fallback source name (handles object OR string)
  const sourceName =
    typeof news.source === "object"
      ? news.source?.name || "FlashFeed Staff"
      : news.source || "FlashFeed Staff";

  // ✅ Fallback category
  const category = news.category || "General";

  return (
    <article className="news-card" aria-label={news.title}>
      {/* 🖼️ News Image */}
      <div className="news-image">
        <img
          src={imageUrl}
          alt={news.title || "News Article"}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/600x400?text=Error+Loading+Image";
          }}
        />
      </div>

      {/* 📰 News Content */}
      <div className="news-content">
        {/* Meta Info */}
        <div className="news-meta">
          <span className="category-tag">{category}</span>
          <span className="source">{sourceName}</span>
        </div>

        {/* Title */}
        <h2 className="news-title" title={news.title}>
          {news.title || "Untitled Article"}
        </h2>

        {/* Summary */}
        <p className="news-desc">{summary}</p>

        {/* Read More Button */}
        {news.url ? (
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="read-btn"
          >
            Read Full Story →
          </a>
        ) : (
          <span className="unavailable">Link unavailable</span>
        )}

        {/* Publish Time */}
        <small className="date">{publishedTime}</small>
      </div>
    </article>
  );
}

// ✅ Prop Validation (accepts object OR string for `source`)
NewsCard.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.string,
    image: PropTypes.string,
    source: PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
      PropTypes.string,
    ]),
    publishedAt: PropTypes.string,
    time: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

