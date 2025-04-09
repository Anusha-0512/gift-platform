import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Correct import
import "../styles/Register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [role, setRole] = useState("core"); // default to 'user'

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Register button clicked!");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
        role,
      }, {
        //withCredentials: true // ✅ Enables cookie/credentials support
      });

      console.log("Registered successfully:", res.data);
      navigate("/login"); // ✅ Redirect after success
    } catch (err) {
      console.error("Registration failed:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create an Account</h2>
        <form onSubmit={handleRegister} className="register-form">

        <div>
  <label>Role</label>
  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    required
  >
    <option value="core">User</option>
    <option value="admin">Admin</option>
  </select>
</div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>


          <button type="submit" className="register-btn">Register</button>
        </form>
        <p className="register-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
