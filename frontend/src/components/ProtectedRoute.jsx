import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes


const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    // If there's no token, redirect to login page
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    // If the role is not authorized, redirect to Not Found page
    return <Navigate to="/notfound" />;
  }

  return <Outlet />; // Render the protected route if role is allowed
};

// Add PropTypes validation
ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, // expected 'allowedRoles' to be an array of strings
};

export default ProtectedRoute;
