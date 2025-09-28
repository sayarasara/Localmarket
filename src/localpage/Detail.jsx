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



  // Review system states
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    user: user?.displayName || '',
    email: user?.email || ''
  });
 const getReviewsKey = () => {
    return `reviews_${id}`;
  };
 useEffect(() => {
    const reviewsKey = getReviewsKey();
    const savedReviews = JSON.parse(localStorage.getItem(reviewsKey) || '[]');
    setReviews(savedReviews);
  }, [id])
  // Review system functions
  const handleStarClick = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!newReview.comment.trim()) {
      alert('Please write a comment before submitting your review.');
      return;
    }

    const reviewToAdd = {
      ...newReview,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      user: user?.displayName || 'Anonymous',
      email: user?.email || 'anonymous@example.com'
    };

    const reviewsKey = getReviewsKey();
    const updatedReviews = [reviewToAdd, ...reviews];
    
    setReviews(updatedReviews);
    localStorage.setItem(reviewsKey, JSON.stringify(updatedReviews));
    
    setNewReview({
      rating: 5,
      comment: '',
      user: user?.displayName || '',
      email: user?.email || ''
    });
    setShowReviewForm(false);
    
    alert('✅ Thank you for your review!');
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const renderStars = (rating, interactive = false, onStarClick = null) => {
   return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => interactive && onStarClick && onStarClick(star)}
            style={{
              cursor: interactive ? 'pointer' : 'default',
              fontSize: '20px',
              color: star <= rating ? '#ffc107' : '#e4e5e9'
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };




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

// Add to orders function - save to consistent key for Allorders.jsx to find
const addToOrders = (productToAdd) => {
    // Save to user-specific key (for My Parcels page)
    const userOrdersKey = getOrdersKey();
    const existingUserOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
    
    // ALSO save to universal key (for Allorders.jsx admin view)
    const universalOrdersKey = 'userOrders';
    const existingUniversalOrders = JSON.parse(localStorage.getItem(universalOrdersKey) || '[]');
    
    const newOrder = {
        _id: Date.now().toString(),
        orderId: `ORD-${Date.now()}`,
        productId: productToAdd._id || id,
        product_name: productToAdd.product_name,
        market_name: productToAdd.market_name,
        price: productToAdd.price,
        totalAmount: productToAdd.price,
        quantity: 1,
        orderDate: new Date().toISOString(),
        status: 'pending',
        userEmail: user?.email || 'guest',
        customerName: user?.displayName || 'Guest Customer',
        customerEmail: user?.email || 'guest@example.com'
    };

    // Save to user-specific orders
    const updatedUserOrders = [...existingUserOrders, newOrder];
    localStorage.setItem(userOrdersKey, JSON.stringify(updatedUserOrders));
    
    // ALSO save to universal orders (for admin view)
    const updatedUniversalOrders = [...existingUniversalOrders, newOrder];
    localStorage.setItem(universalOrdersKey, JSON.stringify(updatedUniversalOrders));
    
    alert('✅ Order placed successfully! Check your orders in My Parcels.');
};


  // Add to orders function with user-specific key
 

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

  const averageRating = calculateAverageRating();

  return (
    <div style={{ maxWidth: 500, margin: '30px auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
      <h2>🏪 {product.market_name}</h2>
      <img src={product.product_image} alt={product.product_name} style={{ width: '100%', height: 200, objectFit: 'cover', marginBottom: 16 }} />
      <div>📅 {product.date}</div>
      <div style={{ fontWeight: 'bold', margin: '8px 0' }}>{product.emoji} {product.product_name} — {product.price}</div>
      <div>👨‍🌾 Vendor: {product.vendor_info?.name} ({product.vendor_info?.role})</div>
      <div>Contact: {product.vendor_info?.contact}</div>


      {/* Reviews Section */}
      <div style={{ marginTop: 30, borderTop: '1px solid #eee', paddingTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3>Customer Reviews</h3>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffc107' }}>
              {averageRating}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              {renderStars(parseFloat(averageRating))}
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Add Review Button */}
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {showReviewForm ? 'Cancel Review' : 'Write a Review'}
        </button>

        {/* Review Form */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px', 
            marginBottom: '20px' 
          }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Your Rating:
              </label>
              {renderStars(newReview.rating, true, handleStarClick)}
              <span style={{ marginLeft: '10px', color: '#666' }}>
                {newReview.rating} out of 5 stars
              </span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Your Review:
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Share your experience with this product..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  resize: 'vertical'
                }}
                required
              />
            </div>
            
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div>
          {reviews.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
              No reviews yet. Be the first to review this product!
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  border: '1px solid #eee',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  backgroundColor: '#fafafa'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <strong style={{ display: 'block' }}>{review.user}</strong>
                    <small style={{ color: '#666' }}>{review.email}</small>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {renderStars(review.rating)}
                    <small style={{ display: 'block', color: '#999', marginTop: '5px' }}>
                      {new Date(review.date).toLocaleDateString()}
                    </small>
                  </div>
                </div>
                <p style={{ margin: 0, lineHeight: '1.5' }}>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>




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