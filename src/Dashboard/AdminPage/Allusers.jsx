
import { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import AllusersModal from './AllusersModal';
import { useQuery } from '@tanstack/react-query';

const Allusers = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all users
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/users');
      return data;
    }
  });

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>
      
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${
                    user.role === 'admin' ? 'badge-primary' :
                    user.role === 'vendor' ? 'badge-secondary' :
                    'badge-neutral'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge ${
                    user.status === 'verified' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {user.status || 'pending'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => openModal(user)}
                    className="btn btn-sm btn-outline"
                  >
                    Edit Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <AllusersModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={closeModal}
          refetchUsers={refetch}
        />
      )}
    </div>
  );
};

export default Allusers;
