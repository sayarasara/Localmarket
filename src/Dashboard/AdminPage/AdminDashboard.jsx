// src/pages/AdminDashboard.jsx
import React from 'react';
import { useAdmin } from '../contexts/AdminContext';

const AdminDashboard = () => {
  const { users, products, updateUserRole, approveProduct } = useAdmin();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <section className="user-management">
        <h2>User Management</h2>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>
                  <select 
                    value={user.role} 
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="product-approval">
        <h2>Pending Products</h2>
        {products
          .filter(product => product.status === 'pending')
          .map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <button onClick={() => approveProduct(product.id)}>
                Approve
              </button>
            </div>
          ))
        }
      </section>
    </div>
  );
};

export default AdminDashboard;