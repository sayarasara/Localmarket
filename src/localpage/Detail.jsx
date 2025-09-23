//import { Modal } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserRole from '../Hooks/UserRole';
import useAuth from '../Hooks/useAuth';

//import useAuth from '../Hooks/useAuth';

const Detail = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
    const { user } = useAuth()
  const [role] = UserRole();



  const getWatchlistKey = () => {
    return user ? `watchlist_${user.email}` : 'watchlist_guest';
  };

  // User-specific orders key
  const getOrdersKey = () => {
    return user ? `orders_${user.email}` : 'orders_guest';
  };


  // Add to watchlist function with user-specific key
  const addToWatchlist = (productToAdd) => {
    const watchlistKey = getWatchlistKey();
    const existingWatchlist = JSON.parse(localStorage.getItem(watchlistKey) || '[]');

    const isAlreadyInWatchlist = existingWatchlist.some(item => item._id === productToAdd._id);

    if (!isAlreadyInWatchlist) {
      const updatedWatchlist = [...existingWatchlist, {
        _id: productToAdd._id,
        product_name: productToAdd.product_name,
        market_name: productToAdd.market_name,
        product_image: productToAdd.product_image,
        date_added: new Date().toLocaleDateString(),
        userEmail: user?.email || 'guest', // Store which user added it
        ...productToAdd
      }];
      localStorage.setItem(watchlistKey, JSON.stringify(updatedWatchlist));
      alert('✅ Added to your watchlist! Check your watchlist in the Dashboard.');
    } else {
      alert('ℹ️ Product is already in your watchlist!');
    }
  };

  const handleWatchlist = () => {
    if (product) {
      addToWatchlist({
        _id: product._id || id,
        product_name: product.product_name,
        market_name: product.market_name,
        product_image: product.product_image,
        ...product
      });
    }
  };

  // Add to orders function with user-specific key
  const addToOrders = (productToAdd) => {
    const ordersKey = getOrdersKey();
    const existingOrders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
    
    const newOrder = {
      _id: Date.now().toString(),
      productId: productToAdd._id || id,
      product_name: productToAdd.product_name,
      market_name: productToAdd.market_name,
      price: productToAdd.price,
      totalAmount: productToAdd.price,
      quantity: 1,
      orderDate: new Date().toISOString(),
      status: 'pending',
      userEmail: user?.email || 'guest' // Store which user placed the order
    };

    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));
    alert('✅ Order placed successfully! Check your orders in My Parcels.');
  };

  const handleBuyProduct = () => {
    if (product) {
      addToOrders(product);
    }
  };

  useEffect(() => {
    // For demo purposes, create a simple product object
    const demoProduct = {
      _id: id,
      product_name: `Product ${id}`,
      market_name: `Market ${id}`,
      price: 10.99,
      date: new Date().toISOString().split('T')[0],
      emoji: "📦",
      vendor_info: {
        name: `Vendor ${id}`,
        role: "vendor",
        contact: "vendor@example.com"
      },
      user_reviews: [
        { user: "Customer", comment: "Great product!", rating: 5 }
      ]
    };
    
    setProduct(demoProduct);
    setLoading(false);
  }, [id]);



  useEffect(() => {
    fetch(`https://local-market-server-self.vercel.app/products/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('API response:', data); // <-- Add this line
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);


const navigate =useNavigate();
  const handleProduct = () => {
    navigate('/payment');
    alert('Redirecting to payment...');
    // window.location.href = 'https://your-payment-url.com';
  };
//  const closeModal = () => {
//    setIsOpen(false)
//  }


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
        <button className='btn bg-slate-400'
          disabled={role === 'admin' || role === 'vendor'}
          onClick={handleWatchlist}
        >
          ⭐ Add to Watchlist
        </button>
        <button className='btn bg-slate-400'
        onClick={handleBuyProduct}
        >
          Order
        </button>
        <button
        onClick={handleProduct}
        >
          🛒 Buy Product
        </button>
      </div>
    </div>
  );
};

export default Detail;