import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Myadvertisement = () => {
  const [ads, setAds] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

  // Load ads from localStorage on component mount
  useEffect(() => {
    loadAdsFromLocalStorage();
  }, []);

  const loadAdsFromLocalStorage = () => {
    try {
      const storedAds = JSON.parse(localStorage.getItem('vendorAdvertisements') || '[]');
      setAds(storedAds);
    } catch (error) {
      console.error('Error loading ads from localStorage:', error);
      toast.error('Error loading advertisements');
    }
  };

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
    
    // Update in localStorage
    const updatedAds = ads.map(ad => 
      ad.id === selectedAd.id 
        ? { ...ad, ...editFormData } 
        : ad
    );
    
    // Save to localStorage
    localStorage.setItem('vendorAdvertisements', JSON.stringify(updatedAds));
    
    // Update state
    setAds(updatedAds);
    setEditModalOpen(false);
    toast.success('Advertisement updated successfully!');
  };

  const handleDelete = () => {
    const updatedAds = ads.filter(ad => ad.id !== selectedAd.id);
    
    // Update localStorage
    localStorage.setItem('vendorAdvertisements', JSON.stringify(updatedAds));
    
    // Update state
    setAds(updatedAds);
    setDeleteModalOpen(false);
    toast.success('Advertisement deleted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 My Advertisements</h1>
          <p className="text-gray-600">Manage your advertising campaigns</p>
        </div>
        
        {ads.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-6xl mb-4">📢</div>
            <h3 className="text-xl font-semibold mb-2">No advertisements yet</h3>
            <p className="text-gray-600 mb-4">Create your first advertisement to get started</p>
            <a 
              href="/addadvertisement" 
              className="bg-blue-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-blue-600 inline-block"
            >
              Create Advertisement
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-4 px-6 text-left">Ad Title</th>
                  <th className="py-4 px-6 text-left">Description</th>
                  <th className="py-4 px-6 text-left">Status</th>
                  <th className="py-4 px-6 text-left">Created Date</th>
                  <th className="py-4 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ads.map(ad => (
                  <tr key={ad.id} className="border-t hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium">{ad.title}</td>
                    <td className="py-4 px-6 max-w-md truncate">{ad.description}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ad.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : ad.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {new Date(ad.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(ad)}
                          className="bg-blue-500 text-white py-2 px-4 rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(ad)}
                          className="bg-red-500 text-white py-2 px-4 rounded text-sm hover:bg-red-600 transition-colors"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold">Edit Advertisement</h3>
              </div>
              <form onSubmit={handleUpdate} className="p-6">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Ad Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Description *</label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Status</label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="approved">✅ Approved</option>
                    <option value="rejected">❌ Rejected</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-blue-600 transition-colors"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-red-600">Delete Advertisement</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700">
                  Are you sure you want to delete the advertisement 
                  "<strong>{selectedAd?.title}</strong>"? This action cannot be undone.
                </p>
              </div>
              <div className="p-6 border-t flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-red-600 transition-colors"
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
    </div>
  );
};

export default Myadvertisement;