import { useEffect, useState } from "react";
import axios from "axios";

const UserSuggestionHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://gift-platform.onrender.com/api/ai/admin/user-suggestions/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
    };
    fetchHistory();
  }, [userId]);

  return (
    <div>
      <h3>Suggestion History</h3>
      {history.length === 0 ? (
        <p>No suggestions yet.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item._id}>
              <strong>Prompt:</strong> {item.prompt} <br />
              <strong>Suggestion:</strong> {item.suggestion} <br />
              <em>{new Date(item.createdAt).toLocaleString()}</em>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSuggestionHistory;
