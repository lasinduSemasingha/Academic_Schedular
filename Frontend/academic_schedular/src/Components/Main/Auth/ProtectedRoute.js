// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from './auth'; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
