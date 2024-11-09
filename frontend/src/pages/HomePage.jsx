
import { Link } from 'react-router-dom';

const HomePage = () => {
  const role = localStorage.getItem('role'); // Get the role from localStorage

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Loan App</h1>
      <p className="text-lg mb-6">A platform to manage your loans easily and efficiently.</p>
      
      {/* Show different content based on the role */}
      {role === 'customer' && (
        <div>
          <Link to="/dashboard" className="bg-green-500 text-white px-4 py-2 rounded-md">
            Go to Dashboard
          </Link>
        </div>
      )}
      {role === 'admin' && (
        <div>
          <Link to="/adminloanlist" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">
            View Admin Loan List
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
