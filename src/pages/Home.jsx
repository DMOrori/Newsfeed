import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { generateNews } from "../utils/generateNews";
import "./Home.css";

export default function Home({ searchQuery, category: initialCategory }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(initialCategory || "technology");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    setCategory(initialCategory || "technology");
  }, [initialCategory]);
  const API_URL = "https://newsapi.org/v2/top-headlines";

  const categories = [
    "technology",
    "business",
    "sports",
    "health",
    "science",
    "entertainment",
    "world",
  ];

  // 📰 Fetch category-based news
  const fetchCategoryNews = useCallback(
    async (selectedCategory, showRefresh = false) => {
      try {
        if (showRefresh) setIsRefreshing(true);
        setLoading(!showRefresh);
        setError(null);

        // Clear old articles before fetching fresh news
        if (!showRefresh) setArticles([]);

        let liveArticles = [];

        if (NEWS_API_KEY) {
          const { data } = await axios.get(API_URL, {
            params: {
              country: "us",
              category: selectedCategory,
              pageSize: 20,
              apiKey: NEWS_API_KEY,
              t: Date.now(), // 🔹 cache-busting
            },
          });

          if (data.status === "ok" && data.articles.length > 0) {
            liveArticles = data.articles
              .filter((a) => a.urlToImage)
              .map((a, i) => ({
                id: a.url || i,
                title: a.title || "Untitled Article",
                content: a.description || a.content || "Click to read the full story.",
                category:
                  selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1),
                image: a.urlToImage,
                time: new Date(a.publishedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                source: a.source?.name || "Unknown Source",
                url: a.url || "#",
              }));
          }
        }

        // Fallback mock news if API fails
        if (liveArticles.length === 0) {
          liveArticles = Array.from({ length: 16 }, () => generateNews(selectedCategory))
            .filter((n) => n.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        // Remove duplicates by URL or title, then shuffle
        const seenKeys = new Set();
        const unique = liveArticles.filter((article) => {
          const key = article.url || article.title || article.id;
          if (seenKeys.has(key)) return false;
          seenKeys.add(key);
          return true;
        });

        setArticles(unique.sort(() => 0.5 - Math.random()).slice(0, 8));

        setLastUpdated(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } catch (err) {
        console.error("❌ News fetch failed:", err);
        setError("Unable to load live news. Showing sample headlines instead.");
        const mock = Array.from({ length: 8 }, () => generateNews(category));
        setArticles(mock);
      } finally {
        setLoading(false);
        setTimeout(() => setIsRefreshing(false), 1000);
      }
    },
    [NEWS_API_KEY]
  );

  // 🔍 Fetch search results when query changes
  useEffect(() => {
    if (!searchQuery) return;

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: searchQuery,
            sortBy: "publishedAt",
            language: "en",
            pageSize: 20,
            apiKey: NEWS_API_KEY,
            t: Date.now(),
          },
        });

        if (data.status === "ok" && data.articles.length > 0) {
          const results = data.articles.map((a, i) => ({
            id: a.url || i,
            title: a.title || "Untitled Article",
            content: a.description || a.content || "Click to read full story.",
            category: "Search",
            image: a.urlToImage,
            time: new Date(a.publishedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            source: a.source?.name || "Unknown Source",
            url: a.url || "#",
          }));

          setArticles(results);
        } else {
          setArticles([]);
          setError("No articles found for your search.");
        }
      } catch (err) {
        console.error("❌ Search failed:", err);
        setError("Unable to fetch search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, NEWS_API_KEY]);

  // 🔁 Fetch category news if no search active
  useEffect(() => {
    if (!searchQuery) {
      fetchCategoryNews(category);
    }
  }, [category, searchQuery, fetchCategoryNews]);

  // ⏰ Auto-refresh every 5 minutes (category mode only)
  useEffect(() => {
    if (searchQuery) return;
    const interval = setInterval(() => {
      fetchCategoryNews(category, true);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [category, searchQuery, fetchCategoryNews]);

  // 🗑️ Clear news function
  const clearNews = () => {
    setArticles([]);
    setLastUpdated(null);
  };

  return (
    <div className="home-container">
      {/* 🧭 Header Bar */}
      <div className="category-bar">
        <h1 className="category-bar-title">
          {searchQuery
            ? `🔍 Search results for "${searchQuery}"`
            : `📰 ${category.charAt(0).toUpperCase() + category.slice(1)} Headlines`}
        </h1>

        {!searchQuery && (
          <div className="category-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cat === category ? "active" : ""}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
            <button onClick={clearNews} className="clear-btn">
              🗑️ Clear News
            </button>
          </div>
        )}
      </div>

      {/* 🕒 Timestamp */}
      {!searchQuery && lastUpdated && (
        <p
          className={`last-updated ${isRefreshing ? "pulse" : ""}`}
          title="Auto-refreshes every 5 minutes"
        >
          Last updated at <strong>{lastUpdated}</strong>
        </p>
      )}

      {/* 📰 Feed */}
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <p className="status-text warning">{error}</p>
      ) : articles.length === 0 ? (
        <p className="status-text">No articles found.</p>
      ) : (
        <div className="news-grid">
          {articles.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      )}
    </div>
  );
}

