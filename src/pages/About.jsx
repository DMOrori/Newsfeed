import React from "react";
import "./About.css";

export default function About() {
  return (
    <section className="about-page">
      <div className="about-container">
        {/* Logo/Title */}
        <h1 className="about-heading">
          📰 FlashFeed <span className="highlight">News</span>
        </h1>

        {/* Subtitle */}
        <p className="about-subtitle">
          Your trusted hub for real-time, customizable, and intelligent news updates.
        </p>

        {/* Description */}
        <div className="about-content">
          <p>
            <strong>FlashFeed</strong> delivers fresh headlines using live data
            powered by <span className="tech-highlight">NewsAPI</span>. The
            platform demonstrates <strong>real-time content fetching</strong>,
            <strong> dynamic category filters</strong>, and a{" "}
            <strong>component-based React design</strong> that ensures a
            seamless and responsive user experience across devices.
          </p>

          <p>
            Every line of code reflects a focus on clarity, efficiency, and
            accessibility — combining <strong>modern web practices</strong> with
            a clean, intuitive interface that helps readers stay informed
            effortlessly.
          </p>

          <p className="developer-credit">
            Developed by <strong>Derrick Maebar</strong> — a passionate web
            developer dedicated to crafting fast, elegant, and user-centered
            applications.
          </p>
        </div>

        {/* Call to Action */}
        <div className="about-cta">
          <a
            href="https://newsapi.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-link"
          >
            Learn More About NewsAPI →
          </a>
        </div>
      </div>
    </section>
  );
}
