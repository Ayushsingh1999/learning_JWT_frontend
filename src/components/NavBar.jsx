import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();

  console.log("this is user==>>",user)

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      {/* Left side nav links */}
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        {user && (
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
        )}
        {user?.role === 'admin' && (
          <Link to="/admin" className="hover:underline">
            Admin Dashboard
          </Link>
        )}
      </div>

      {/* Right side auth actions */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* Profile circle */}
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full uppercase font-bold">
              {user.username[0]}
            </div>

            {/* Logout button */}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
