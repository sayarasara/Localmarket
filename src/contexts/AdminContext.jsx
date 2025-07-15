// src/contexts/AdminContext.jsx

import { createContext, useContext, useState } from "react";


const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [orders, setOrders] = useState([]);

  // Create first admin user
  const initializeAdmin = (email, password) => {
    const adminUser = {
      id: 'admin-1',
      email,
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    setUsers([adminUser]);
    return adminUser;
  };

  // User management
  const updateUserRole = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  // Product management
  const approveProduct = (productId) => {
    setProducts(products.map(product =>
      product.id === productId ? { ...product, status: 'approved' } : product
    ));
  };

  // Advertisement management
  const rejectAdvertisement = (adId, reason) => {
    setAdvertisements(advertisements.map(ad =>
      ad.id === adId ? { ...ad, status: 'rejected', rejectionReason: reason } : ad
    ));
  };

  return (
    <AdminContext.Provider value={{
      users,
      products,
      advertisements,
      orders,
      initializeAdmin,
      updateUserRole,
      approveProduct,
      rejectAdvertisement
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);