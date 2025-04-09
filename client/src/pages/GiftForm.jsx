import { useState } from "react";
import axios from "axios";
import "../styles/GiftForm.css";

export default function GiftForm() {
  const [occasion, setOccasion] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [relationship, setRelationship] = useState("");
  const [interests, setInterests] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [prompt, setPrompt] = useState(""); // Store the prompt for reuse
  const [showMoreButton, setShowMoreButton] = useState(false);

  const generatePrompt = () => {
    return `Suggest a friendly, personalized and thoughtful gift for a ${age}-year-old ${gender} for the occasion of ${occasion}. The person is my ${relationship} and is interested in ${interests}. Take into account dressing style and age-appropriate preferences.`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPrompt = generatePrompt();
    setPrompt(newPrompt); // Save prompt to reuse later
    await fetchRecommendation(newPrompt);
  };

  const fetchRecommendation = async (currentPrompt) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://gift-platform.onrender.com/api/ai/recommendations",
        { prompt: currentPrompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Recommendation received:", response.data.suggestion);
      setRecommendation(response.data.suggestion);
      setShowMoreButton(true); // Show "Give Me More Suggestions"
    } catch (err) {
      console.error("❌ Error fetching recommendation:", err);
      alert("Failed to get recommendations");
    }
  };

  const handleMoreSuggestions = async () => {
    if (prompt) {
      await fetchRecommendation(prompt);
    }
  };

  return (
    <div className="gift-form-container">
      <h2>Get Personalized Gift Ideas 🎁</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Occasion</label>
          <input
            type="text"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Relationship</label>
          <input
            type="text"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Interests</label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Recommendation</button>
      </form>

      {recommendation && (
        <div className="recommendation-box">
          <h3>🎉 Recommended Gift:</h3>
          <p>{recommendation}</p>
        </div>
      )}

      {showMoreButton && (
        <div className="more-suggestions-button">
          <button onClick={handleMoreSuggestions}>Give Me More Suggestions</button>
        </div>
      )}
    </div>
  );
}
