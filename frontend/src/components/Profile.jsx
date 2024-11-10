import { useState, useEffect } from 'react';
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (!token) throw new Error('No token found');

        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data.message || error.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-blue-700">Profile</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <p className="text-lg sm:text-xl font-medium"><strong>Username:</strong> {user.username}</p>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-medium"><strong>Email:</strong> {user.email}</p>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-medium"><strong>Role:</strong> {user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
