import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Myadvertisement = () => {
  // Sample data - in a real app, this would come from an API
  const [ads, setAds] = useState([
    {
      id: 1,
      title: 'Summer Sale - 50% Off',
      description: 'Massive summer sale on all products. Limited time offer!',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1020&q=80',
      status: 'approved'
    },

  ]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

  const openEditModal = (ad) => {
    setSelectedAd(ad);
    setEditFormData({
      title: ad.title,
      description: ad.description,
      status: ad.status
    });
    setEditModalOpen(true);
  };

  const openDeleteModal = (ad) => {
    setSelectedAd(ad);
    setDeleteModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    if (!editFormData.title.trim() || !editFormData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Update the ad in the state
    setAds(ads.map(ad => 
      ad.id === selectedAd.id 
        ? { ...ad, ...editFormData } 
        : ad
    ));
    
    setEditModalOpen(false);
    toast.success('Advertisement updated successfully!');
  };

  const handleDelete = () => {
    setAds(ads.filter(ad => ad.id !== selectedAd.id));
    setDeleteModalOpen(false);
    toast.success('Advertisement deleted successfully!');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Advertisements</h2>
      
      {ads.length === 0 ? (
        <div className="bg-white p-6 rounded shadow-md text-center">
          <i className="fas fa-ad text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">No advertisements yet</h3>
          <p className="text-gray-600">Create your first advertisement to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Ad Title</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map(ad => (
                <tr key={ad.id} className="border-t">
                  <td className="py-3 px-4">{ad.title}</td>
                  <td className="py-3 px-4">{ad.description}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      ad.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : ad.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {ad.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(ad)}
                        className="bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(ad)}
                        className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-md w-full max-w-md">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Edit Advertisement</h3>
            </div>
            <form onSubmit={handleUpdate} className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ad Title *</label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Short Description *</label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-md w-full max-w-md">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Delete Advertisement</h3>
            </div>
            <div className="p-4">
              <p>Are you sure you want to delete the advertisement "<strong>{selectedAd?.title}</strong>"? This action cannot be undone.</p>
            </div>
            <div className="p-4 border-t flex justify-end space-x-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Myadvertisement;