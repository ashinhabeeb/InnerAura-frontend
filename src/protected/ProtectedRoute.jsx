import React from 'react';
import { Navigate } from 'react-router-dom';

// Custom ProtectedRoute component that checks if the user is authenticated
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("token"); // Example: Check if a token exists

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  return children; // Allow access to the children components (e.g., AllTracks, MyPlaylist)
};

export default ProtectedRoute;
