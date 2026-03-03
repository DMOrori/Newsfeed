import React, { useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import About from "./pages/About";
import Loader from "./components/Loader";
import "./App.css";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("technology");

  const handleSearch = (query) => setSearchQuery(query.trim());
  const handleCategorySelect = (category) => setSelectedCategory(category);

  return (
    <>
      <Navbar onSearch={handleSearch} onCategorySelect={handleCategorySelect} />

      <main className="app-main">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={<Home searchQuery={searchQuery} category={selectedCategory} />}
            />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/about" element={<About />} />
            <Route path="/us-news" element={<Home category="general" />} />
            <Route path="/weather" element={<Loader />} />
            <Route path="/investigations" element={<Category name="investigations" />} />

            <Route
              path="*"
              element={
                <div className="not-found">
                  <h1>404</h1>
                  <p>Page not found.</p>
                  <a href="/" className="back-home">
                    ← Go Back Home
                  </a>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}


