import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';
import UserRole from '../Hooks/UserRole';

const VendorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = UserRole();
 
    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'rider') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default VendorRoute;