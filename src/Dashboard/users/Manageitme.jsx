import React, { useState, useEffect } from "react";

const Manageiteme = () => {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('userWatchlist');
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error('Error parsing watchlist from localStorage:', error);
        setWatchlist([]);
      }
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const removeFromWatchlist = (productId) => {
    setWatchlist(watchlist.filter((product) => product.id !== productId));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
      {watchlist.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No items in your watchlist yet</p>
          <p className="text-sm text-gray-400 mt-2">Visit product details and click "Add to Watchlist" to add items here</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">{watchlist.length} item(s) in your watchlist</p>
          <div className="grid gap-4">
            {watchlist.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{product.product_name}</h3>
                    <p className="text-sm text-gray-600">ID: {product.id}</p>
                  </div>
                  <button
                    onClick={() => removeFromWatchlist(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Manageiteme;