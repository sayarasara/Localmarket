// src/hooks/useAdmin.js
import { useState, useEffect } from 'react';

const useAdmin = () => {
  const [adminData, setAdminData] = useState({
    users: [],
    products: [],
    advertisements: [],
    orders: [],
    isLoading: false,
    error: null
  });

  // Fetch data from your in-memory backend
  const fetchData = async (endpoint) => {
    try {
      setAdminData(prev => ({ ...prev, isLoading: true }));
      const response = await fetch(`/api/admin/${endpoint}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      setAdminData(prev => ({ ...prev, [endpoint]: data, isLoading: false }));
    } catch (error) {
      setAdminData(prev => ({ ...prev, error: error.message, isLoading: false }));
    }
  };

  // Update user role
  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ role: newRole })
      });
      
      if (!response.ok) throw new Error('Failed to update role');
      
      // Refresh users list
      fetchData('users');
    } catch (error) {
      setAdminData(prev => ({ ...prev, error: error.message }));
    }
  };

  // Initialize admin (first-time setup)
  const initializeAdmin = async (email, password, secret) => {
    try {
      const response = await fetch('/api/admin/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, secret })
      });
      
      if (!response.ok) throw new Error('Admin initialization failed');
      
      return await response.json();
    } catch (error) {
      setAdminData(prev => ({ ...prev, error: error.message }));
      throw error;
    }
  };

  // Load data on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData('users');
      fetchData('products');
    }
  }, []);

  return {
    ...adminData,
    fetchData,
    updateUserRole,
    initializeAdmin
  };
};

export default useAdmin;