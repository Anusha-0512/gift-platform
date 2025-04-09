// src/pages/LandingPage.jsx
import "../styles/LandingPage.css"; // ✅ import the CSS file

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h2>🎁 Find the Perfect Gift</h2>
        <p>
          Our AI-powered platform helps you discover personalized gift ideas for every occasion.
        </p>
        <a href="/register" className="landing-btn">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
