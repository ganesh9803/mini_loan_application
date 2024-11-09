import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Profile from './components/Profile';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute component
import HomePage from './pages/HomePage';
import AdminLoanList from './pages/AdminDashboard';
import LoanList from './pages/LoanList';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/adminloanlist" element={<AdminLoanList />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
          <Route path="/loanlist" element={<LoanList />} />
        </Route>

        {/* If no route matches, redirect to NotFound page */}
        <Route path="/notfound" element={<NotFound />} />

        {/* Redirect any unknown route to NotFound page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
