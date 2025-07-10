import React from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const ProfilePage = () => {
  const { accessToken, refreshToken } = useAuth();

  const getProfile = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/profile', {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      console.log(res.data);
      alert(`Hello ${res.data.user.username} | Role: ${res.data.user.role}`);
    } catch (err) {
      if (err.response.status === 401) {
        const newToken = await refreshToken();
        const retry = await axios.get('http://localhost:4000/api/profile', {
          headers: { Authorization: `Bearer ${newToken}` },
          withCredentials: true,
        });
        console.log("this is retry console",retry.data);
        alert(`Hello ${retry.data.user.username} | Role: ${retry.data.user.role}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <button
        onClick={getProfile}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Load Profile Info
      </button>
    </div>
  );
};

export default ProfilePage;
