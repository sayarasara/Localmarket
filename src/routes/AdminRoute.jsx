import React, { Children } from 'react';
import { Navigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import UserRole from '../Hooks/UserRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = UserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;