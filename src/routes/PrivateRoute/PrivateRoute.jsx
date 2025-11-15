// PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Replace this with your real authentication logic
const isAuthenticated = () => {
    // Example: check localStorage token
    return localStorage.getItem("token") ? true : false;
};

const PrivateRoute = ({ children }) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        // Redirect to login and preserve the location they were trying to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
