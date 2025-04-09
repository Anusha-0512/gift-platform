// src/pages/CoreDashboard.jsx
import { useNavigate } from "react-router-dom";
import "../styles/CoreDashboard.css";

export default function CoreDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToGiftForm = () => {
    navigate("/gift-form");
  };

  return (
    <div className="core-dashboard">
      <h2>Welcome, Core User 🎁</h2>
      <p>Explore personalized gift ideas with our AI-powered assistant.</p>

      <div className="core-actions">
        <button onClick={goToGiftForm} className="core-btn">Get Gift Recommendation</button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
}
