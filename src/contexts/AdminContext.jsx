// src/contexts/AdminContext.jsx

import React, { createContext,  useState, useEffect } from 'react';
import useAdmin from '../Dashboard/AdminPage/useAdmin';

const AdminContext = createContext();


const MyComponent = () => {
  const Admin = useAdmin();}


// Create a custom hook to access the AdminContext
//export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch users and products from your backend
    fetch('/api/users').then(res => res.json()).then(setUsers);
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  const updateUserRole = (userId, role) => {
    // Call backend to update user role
    fetch(`/api/users/${userId}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role })
    }).then(() => {
      setUsers(users => users.map(u => u.id === userId ? { ...u, role } : u));
    });
  };

  const approveProduct = (productId) => {
    // Call backend to approve product
    fetch(`/api/products/${productId}/approve`, { method: 'POST' })
      .then(() => {
        setProducts(products => products.map(p => p.id === productId ? { ...p, status: 'approved' } : p));
      });
  };

  return (
    <AdminContext.Provider value={{ users, products, updateUserRole, approveProduct }}>
      {children}
    </AdminContext.Provider>
  );
};
export default MyComponent;