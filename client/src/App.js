import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage"; // Optional
import Dashboard from './pages/Dashboard'; // <-- Make sure this component exists
import AdminDashboard from './pages/AdminDashboard';
import CoreDashboard from './pages/CoreDashboard';
import GiftForm from './pages/GiftForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* <-- Add this */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/core-dashboard" element={<CoreDashboard />} />
      <Route path="/gift-form" element={<GiftForm />} />
      </Routes>
    </Router>
  );
}

export default App;
