import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const role = localStorage.getItem('role'); // Get the role from localStorage

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove role as well during logout
    navigate('/login'); // Redirect to login after logout
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white flex items-center justify-between py-4 px-6 font-medium">
      {/* Logo and brand name */}
      <Link to="/" className="text-lg font-semibold p-2 flex items-center">
        Loan App
      </Link>
      
      {/* Mobile menu icon */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} aria-label="Toggle Menu">
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Links for desktop & mobile */}
      <div className={`md:flex md:items-center ${isMobileMenuOpen ? "block" : "hidden"} md:block space-y-4 md:space-y-0`}>
        {token ? (
          <>
            {/* Conditional links based on role */}
            <Link to="/profile" className="block md:inline mr-4 text-white hover:text-gray-300">Profile</Link>
            {role === 'customer' && <Link to="/dashboard" className="block md:inline mr-4 text-white hover:text-gray-300">Dashboard</Link>}
            {role === 'admin' ? (
              <Link to="/adminloanlist" className="block md:inline mr-4 text-white hover:text-gray-300">Admin Loan List</Link>
            ) : (
              <Link to="/loanlist" className="block md:inline mr-4 text-white hover:text-gray-300">Loan List</Link>
            )}
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="block md:inline bg-red-500 text-white px-4 py-2 rounded mt-4 md:mt-0 hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          // Show login/signup links if no token
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
