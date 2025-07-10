import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:4000/api/register', { username, password }, { withCredentials: true });
      alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Signup failed!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

        <input
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
