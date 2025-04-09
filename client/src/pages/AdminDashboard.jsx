import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, [token]);

  const handleViewSuggestions = async (userId) => {
    try {
      const res = await API.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setSelectedSuggestions(res.data);
      setActiveUserId(userId);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
      setSelectedSuggestions([]);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await API.delete(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== userId));
      if (activeUserId === userId) {
        setSelectedSuggestions([]);
        setActiveUserId(null);
      }
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleViewSuggestions(u._id)} style={{ fontSize: "12px", marginRight: "6px" }}>
                  View Suggestion history of user
                </button>
                <button onClick={() => handleDelete(u._id)} style={{ fontSize: "12px", backgroundColor: "crimson", color: "white", border: "none", borderRadius: "4px", padding: "4px 8px" }}>
                  Delete the user
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {activeUserId && (
        <div className="suggestions-box" style={{ marginTop: "20px" }}>
          <h3>Gift Suggestions for User ID: {activeUserId}</h3>
          {selectedSuggestions.length > 0 ? (
            <ul>
              {selectedSuggestions.map((s, i) => (
                <li key={i}>
                  <strong>Prompt:</strong> {s.prompt}<br />
                  <strong>Suggestion:</strong> {s.suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <p>No suggestions found for this user.</p>
          )}
        </div>
      )}
    </div>
  );
}
