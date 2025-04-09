import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-purple-600">GiftHub</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-purple-600">Home</Link>
        <Link to="/login" className="text-gray-700 hover:text-purple-600">Login</Link>
        <Link to="/register" className="text-gray-700 hover:text-purple-600">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
