import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoanForm from './LoanForm';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT to check role
      if (decoded.role !== 'customer') {
        navigate('/login');
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [navigate]);

  return (
    <div className="p-8">
      {isAuthenticated ? (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">Welcome to your Dashboard</h1>
          <LoanForm />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
