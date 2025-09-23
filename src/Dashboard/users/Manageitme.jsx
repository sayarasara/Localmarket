import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";




const Manageiteme = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user

  // User-specific watchlist key
  const getWatchlistKey = () => {
    return user ? `watchlist_${user.email}` : 'watchlist_guest';
  };

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    loadWatchlist();
  }, [user] ); // Reload when user changes

  const loadWatchlist = () => {
    const watchlistKey = getWatchlistKey();
    const savedWatchlist = localStorage.getItem(watchlistKey);
    
    if (savedWatchlist) {
      try {
        const parsedWatchlist = JSON.parse(savedWatchlist);
        // Filter to show only current user's items
        const userWatchlist = parsedWatchlist.filter(item => 
          item.userEmail === (user?.email || 'guest')
        );
        setWatchlist(userWatchlist);
      } catch (error) {
        console.error('Error parsing watchlist from localStorage:', error);
        setWatchlist([]);
      }
    } else {
      setWatchlist([]);
    }
  };

  const openRemoveConfirmation = (product) => {
    setItemToRemove(product);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setItemToRemove(null);
  };

  const removeFromWatchlist = () => {
    if (!itemToRemove) return;

    const watchlistKey = getWatchlistKey();
    const savedWatchlist = JSON.parse(localStorage.getItem(watchlistKey) || '[]');
    
    // Remove the item
    const updatedWatchlist = savedWatchlist.filter((product) => product._id !== itemToRemove._id);
    
    // Save back to localStorage
    localStorage.setItem(watchlistKey, JSON.stringify(updatedWatchlist));
    
    // Update state
    setWatchlist(updatedWatchlist.filter(item => 
      item.userEmail === (user?.email || 'guest')
    ));
    
    setShowConfirmModal(false);
    setItemToRemove(null);
    
    alert('✅ Item removed from your watchlist successfully!');
  };

  const navigateToProducts = () => {
    navigate('/Datacard');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Watchlist</h2>
      
      {user && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            👤 Viewing watchlist for: <strong>{user.email}</strong>
          </p>
        </div>
      )}
      
      {watchlist.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg mb-2">
            {user ? 'Your watchlist is empty' : 'No items in watchlist'}
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Visit product details and click "Add to Watchlist" to add items here
          </p>
          <button
            onClick={navigateToProducts}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              {watchlist.length} item(s) in your watchlist
            </p>
            <button
              onClick={navigateToProducts}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors text-sm"
            >
              ➕ Add More Products
            </button>
          </div>
          
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {watchlist.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div style={{ width: 48, height: 48, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                        {product.emoji || '📦'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.product_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {product.market_name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {product.date_added || product.date || new Date().toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openRemoveConfirmation(product)}
                          className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded text-sm transition-colors"
                        >
                          ❌ Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && itemToRemove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Removal</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to remove "{itemToRemove.product_name}" from your watchlist?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeConfirmModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={removeFromWatchlist}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
              >
                Confirm Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manageiteme;