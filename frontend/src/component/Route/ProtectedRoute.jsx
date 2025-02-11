import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBullseye } from 'react-icons/fa';

const ProtectedRoute = ({ component: Component, isAdmin, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return <div>Loading...</div>; // Optional: Show a loading state until user data is available
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;  // Renders child routes if authenticated
};

export default ProtectedRoute;
