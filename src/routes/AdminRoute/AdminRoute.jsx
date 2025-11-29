import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext/AppContext';
import useAdmin from '../../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const { user, authLoading } = useContext(AppContext);
    const { isAdmin, loading: adminLoading } = useAdmin(user?.email);

    if (authLoading || adminLoading) {
        return <p>Loading...</p>;
    }
    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (!isAdmin) {
        return 
        // <p>Access Denied. Admins only.</p>;
    }

    return children;
};

export default AdminRoute;
