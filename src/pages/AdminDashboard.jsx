import React from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { accessToken, refreshToken } = useAuth();

  const getTotalUsers = async () => {
    try {
      console.log("access in side admin",accessToken)
      const res = await axios.get('http://localhost:4000/api/admin/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      alert(`Total Users: ${res.data.totalUsers}`);
    } catch (err) {
      if (err.response.status === 401) {
        const newToken = await refreshToken();
        const retry = await axios.get('http://localhost:4000/api/admin/user', {
          headers: { Authorization: `Bearer ${newToken}` },
          withCredentials: true,
        });
        alert(`Total Users: ${retry.data.totalUsers}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-50">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={getTotalUsers}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Get Total Users
      </button>
    </div>
  );
};

export default AdminDashboard;
