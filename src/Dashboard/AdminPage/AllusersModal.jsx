
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const AllusersModal = ({ user, isOpen, onClose, refetchUsers }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [updatedRole, setUpdatedRole] = useState(user?.role || '');

  useEffect(() => {
    if (user) {
      setUpdatedRole(user.role);
    }
  }, [user]);

const mutation = useMutation({
  mutationFn: async (role) => {
    const { data } = await axiosSecure.patch(
      `/user/role/update/${user.email}`,
      { role }
    );
    return data;
  },
  onSuccess: (data) => {
    console.log('Update successful:', data);
    toast.success(data.message || 'User Role Updated Successfully');
    queryClient.invalidateQueries(['users']);
    refetchUsers();
    onClose();
  },
  onError: (error) => {
    console.log('Update error:', error);
    toast.error(error.response?.data?.error || 'Failed to update user role');
  },
});



  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(updatedRole);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Edit User Role</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full my-3">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              value={user.email}
              className="input input-bordered w-full"
              disabled
            />
          </div>

          <div className="form-control w-full my-3">
            <label className="label">
              <span className="label-text">Current Role</span>
            </label>
            <input
              type="text"
              value={user.role}
              className="input input-bordered w-full"
              disabled
            />
          </div>

          <div className="form-control w-full my-3">
            <label className="label">
              <span className="label-text">New Role</span>
            </label>
            <select
              value={updatedRole}
              onChange={(e) => setUpdatedRole(e.target.value)}
              className="select select-bordered w-full"
              required
            >
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Updating...' : 'Update Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllusersModal;
