import React from 'react';
//import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import UserRole from '../Hooks/UserRole';

const VendorRoute = ({ children }) => {
  const [role, isRoleLoading] = UserRole()
  const location = useLocation()
  console.log(location)
  console.log('I was here, in VendorRoute')
  if (isRoleLoading) return <div>Loading...</div>;
  if (role === 'vendor') return children;
  // If role is null or not vendor, navigate to home
  return <Navigate to='/' replace='true' />
}

export default VendorRoute;