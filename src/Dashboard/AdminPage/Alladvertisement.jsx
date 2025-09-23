import React, { useState, useEffect } from "react";

const Alladvertisement = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('pending');

  // Load all ads from localStorage
  useEffect(() => {
    const loadAds = () => {
      try {
        const storedAds = JSON.parse(localStorage.getItem('vendorAdvertisements') || '[]');
        setAds(storedAds);
      } catch (error) {
        console.error('Error loading ads:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAds();
  }, []);

  const openStatusModal = (ad) => {
    setSelectedAd(ad);
    setSelectedStatus(ad.status);
    setStatusModalOpen(true);
  };

  const openDeleteModal = (ad) => {
    setSelectedAd(ad);
    setDeleteModalOpen(true);
  };

  const handleStatusChange = () => {
    const updatedAds = ads.map(ad => 
      ad.id === selectedAd.id 
        ? { ...ad, status: selectedStatus } 
        : ad
    );
    
    setAds(updatedAds);
    localStorage.setItem('vendorAdvertisements', JSON.stringify(updatedAds));
    setStatusModalOpen(false);
    alert('Status updated successfully!');
  };

  const handleDelete = () => {
    const updatedAds = ads.filter(ad => ad.id !== selectedAd.id);
    setAds(updatedAds);
    localStorage.setItem('vendorAdvertisements', JSON.stringify(updatedAds));
    setDeleteModalOpen(false);
    alert('Advertisement deleted successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return '✅';
      case 'rejected': return '❌';
      default: return '⏳';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">📢 Loading all advertisements...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📢 All Advertisements</h1>
          <p className="text-gray-600">Admin view - Manage all vendor advertisements</p>
        </div>

        {ads.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">📢</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No advertisements found</h3>
            <p className="text-gray-500">Vendors haven't created any advertisements yet</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-blue-600">{ads.length}</div>
                <div className="text-sm text-gray-600">Total Ads</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-green-600">
                  {ads.filter(ad => ad.status === 'approved').length}
                </div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {ads.filter(ad => ad.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-2xl font-bold text-red-600">
                  {ads.filter(ad => ad.status === 'rejected').length}
                </div>
                <div className="text-sm text-gray-600">Rejected</div>
              </div>
            </div>

            {/* Ads Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ad Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {ads.map(ad => (
                      <tr key={ad.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{ad.vendor_name}</div>
                            <div className="text-sm text-gray-500">{ad.vendor_email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{ad.title}</div>
                          <div className="text-sm text-gray-600 max-w-xs truncate">{ad.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <img src={ad.image} alt={ad.title} className="w-16 h-16 object-cover rounded-md" />
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(ad.status)}`}>
                            {getStatusIcon(ad.status)} {ad.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openStatusModal(ad)}
                              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                            >
                              📊 Status
                            </button>
                            <button
                              onClick={() => openDeleteModal(ad)}
                              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Status Modal */}
            {statusModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-md w-full max-w-md">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">📊 Update Status</h3>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Advertisement</label>
                      <p className="font-semibold">{selectedAd?.title}</p>
                      <p className="text-sm text-gray-600">by {selectedAd?.vendor_name}</p>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="approved">✅ Approved</option>
                        <option value="rejected">❌ Rejected</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-4 border-t flex justify-end space-x-2">
                    <button
                      onClick={() => setStatusModalOpen(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleStatusChange}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Modal */}
            {deleteModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-md w-full max-w-md">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">🗑️ Delete Advertisement</h3>
                  </div>
                  <div className="p-4">
                    <p>Are you sure you want to delete this advertisement?</p>
                    <p className="font-semibold mt-2">"{selectedAd?.title}"</p>
                    <p className="text-sm text-gray-600">by {selectedAd?.vendor_name}</p>
                  </div>
                  <div className="p-4 border-t flex justify-end space-x-2">
                    <button
                      onClick={() => setDeleteModalOpen(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Alladvertisement;