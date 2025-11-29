// PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext/AppContext"; // ❗ AppContext নয়, useApp ব্যবহার করুন

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, authLoading } = useApp();

    // যদি Firebase এখনো user লোড করছে → স্পিনার দেখাতে পারেন
    if (authLoading) {
        return <p>Loading...</p>;
    }

    // যদি লগইন না থাকে → signin-এ পাঠানো হবে
    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    // যদি লগইন থাকে → children রেন্ডার হবে
    return children;
    
};

export default PrivateRoute;
