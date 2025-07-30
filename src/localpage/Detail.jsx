//mport { Modal } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mymodal from '../modal/Mymodal'; // Adjust the import path as necessary

const Detail = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate user role (replace with your auth logic)
  const role = 'user'; // Change to 'admin' or 'vendor' to test button disabling

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('API response:', data); // <-- Add this line
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Simple handlers
  const handleWatchlist = () => {
    alert('Added to watchlist!');
  };

  const handleBuyProduct = () => {
    alert('Redirecting to payment...');
    // window.location.href = 'https://your-payment-url.com';
  };
  const closeModal = () => {
    setIsOpen(false)
  }


  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div style={{ maxWidth: 500, margin: '30px auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
      <h2>🏪 {product.market_name}</h2>
      <img src={product.product_image} alt={product.product_name} style={{ width: '100%', height: 200, objectFit: 'cover', marginBottom: 16 }} />
      <div>📅 {product.date}</div>
      <div style={{ fontWeight: 'bold', margin: '8px 0' }}>{product.emoji} {product.product_name} — {product.price}</div>
      <div>👨‍🌾 Vendor: {product.vendor_info?.name} ({product.vendor_info?.role})</div>
      <div>Contact: {product.vendor_info?.contact}</div>
      <div>
        <strong>User Reviews:</strong>
        <ul>
          {product.user_reviews?.map((review, idx) => (
            <li key={idx}>
              <b>{review.user}:</b> {review.comment} ({review.rating}⭐)
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        <button
          disabled={role === 'admin' || role === 'vendor'}
          onClick={handleWatchlist}
        >
          ⭐ Add to Watchlist
        </button>
        <button 
        onClick={handleBuyProduct}
        >
          🛒 Buy Product
        </button>
        <Mymodal
    product={product}
            closeModal={closeModal}
          //  isOpen={isOpen}
            fetchproduct={product}
        />
      </div>
    </div>
  );
};

export default Detail;