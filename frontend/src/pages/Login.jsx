import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Redirect if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home'); // Or any page you want to navigate to when already logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store JWT in localStorage
      localStorage.setItem('role', response.data.role); // Store role in localStorage
      navigate('/home'); // Redirect to the dashboard after successful login
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600">Login</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:border-blue-500"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:border-blue-500"
          required
        />
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-3 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        
        {message && <p className="mt-2 text-center text-red-500">{message}</p>}
        
        <p className="text-center text-gray-600">
          Dont have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Create an account
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
