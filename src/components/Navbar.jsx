import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ onSearch, onCategorySelect }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("technology");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

  const categories = [
    "technology",
    "business",
    "sports",
    "entertainment",
    "health",
    "science",
  ];

  // 🌗 Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.body.classList.toggle("dark-theme", saved === "dark");
  }, []);

  // 🌗 Toggle light/dark theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  // 🔍 Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      navigate("/");
      setIsMenuOpen(false);
    }
  };

  // 🗂️ Handle category click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategorySelect(category);
    navigate(`/category/${category}`);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={() => setActiveCategory("technology")}
        >
          🗞️ NewsFeed
        </Link>

        {/* Theme toggle button */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "🌞" : "🌙"}
        </button>

        {/* Mobile Menu */}
        <div
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav Links */}
        <div className={`nav-links ${isMenuOpen ? "show" : ""}`}>
          <ul className="category-list">
            {categories.map((category) => (
              <li
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => handleCategoryClick(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>

          {/* Search */}
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
};
