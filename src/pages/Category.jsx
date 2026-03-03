import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import "./Category.css";
import { generateNews } from "../utils/generateNews";

const API_URL = "https://newsapi.org/v2/top-headlines";

export default function Category() {
  const { name } = useParams(); // e.g., "sports", "business", etc.
  const [newsFeed, setNewsFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * ✅ Capitalizes category names safely
   */
  const formatCategory = (category) => {
    if (!category || typeof category !== "string") return "Category";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    /**
     * 🔍 Fetches category-specific news from NewsAPI
     * Falls back to generated mock data if live data fails or is unavailable.
     */
    async function fetchCategoryNews() {
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
        let fetchedArticles = [];

        if (apiKey) {
          const response = await fetch(
            `${API_URL}?country=us&category=${name}&pageSize=12&apiKey=${apiKey}`
          );
          const data = await response.json();

          // ✅ Normalize live NewsAPI data into your app's structure
          if (data.status === "ok" && data.articles.length > 0) {
            fetchedArticles = data.articles.map((article, index) => ({
              id: article.url || index,
              title: article.title || "Untitled",
              content:
                article.description ||
                article.content ||
                "No description available.",
              category: formatCategory(name),
              image:
                article.urlToImage ||
                "https://via.placeholder.com/800x450?text=No+Image",
              time: article.publishedAt
                ? new Date(article.publishedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A",
              // ✅ Keep source as an object to match NewsAPI + NewsCard expectations
              source: article.source || { name: "Unknown Source" },
              url: article.url || "#",
            }));
          } else {
            console.warn("⚠️ No articles found for this category.");
          }
        } else {
          console.warn("⚠️ Missing API key. Using mock data instead.");
        }

        // ✅ Fallback if API fails or returns no articles
        if (fetchedArticles.length === 0) {
          console.warn("⚙️ Falling back to generated mock news...");
          fetchedArticles = Array.from({ length: 10 }, generateNews).filter(
            (item) =>
              item.category.toLowerCase() === (name || "").toLowerCase()
          );
        }

        // ✅ Update state only if component is still mounted
        if (isMounted) {
          setNewsFeed(fetchedArticles);
          setLoading(false);
        }
      } catch (err) {
        console.error("❌ Error fetching news:", err);
        if (isMounted) {
          setError("Unable to fetch live news. Showing sample data instead.");
          const mock = Array.from({ length: 10 }, generateNews);
          setNewsFeed(mock);
          setLoading(false);
        }
      }
    }

    fetchCategoryNews();

    return () => {
      isMounted = false; // cleanup to prevent memory leaks
    };
  }, [name]);

  // 🌀 Loading State
  if (loading)
    return <Loader message={`Fetching latest ${formatCategory(name)} news...`} />;

  return (
    <div className="home-container">
      {/* 🔖 Category Header */}
      <header className="category-header">
        <h2 className="category-bar-title">{formatCategory(name)} News</h2>
        <p className="category-subtext">
          Stay updated with the latest {name?.toLowerCase() || "category"} headlines — powered
          by NewsAPI.
        </p>
      </header>

      {/* ⚠️ Error Message */}
      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}

      {/* 📰 News Grid */}
      <div className="news-grid">
        {newsFeed.map((item) => (
          <NewsCard key={item.id || Math.random()} news={item} />
        ))}
      </div>

      {/* 🕳️ Empty State */}
      {newsFeed.length === 0 && (
        <div className="no-results">
          <p>No articles available for {formatCategory(name)} right now.</p>
          <p>Try another category or check back later.</p>
        </div>
      )}
    </div>
  );
}

