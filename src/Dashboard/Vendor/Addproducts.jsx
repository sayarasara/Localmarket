import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";


const Addproducts = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  console.log('token in the context', user.accessToken)

  // Form state
  const [formData, setFormData] = useState({
    market_name: '',
    product_name: '',
    product_image: '',
    user_email: user?.email || '', // This would come from auth context
    user_name: '',      // This would come from auth context
    price: '',
    date: '',
  
  });

  // Form validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);


  // Handle input changes
  const handleChange = (e) => {
e.preventDefault();

//console.log(data);

  

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Simple validation
    const newErrors = {};
    if (!formData.market_name) newErrors.market_name = 'Title is required';
    if (!formData.cover_photo) newErrors.cover_photo = 'Cover photo URL is required';
    if (!formData.    product_name
 || isNaN(formData.    product_name
)) newErrors.    product_name
 = 'Valid amount of product is required';
    if (!formData.product_image) newErrors.product_image = 'Vendor is required';
    if (!formData.date) newErrors.date = 'Overview is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    console.log(formData)
    try {
      // In a real app, you would send this to your backend API
      await axios.post('', {
        title: formData.market_name,
        coverPhoto: formData.cover_photo,
        totalAmount: parseInt(formData.    product_name),
        author: formData.product_image,
        category: formData.book_category,
       
        overview: formData.date,
        addedBy: user.email,
        user_email: user.email,
      });

      setSubmitSuccess(true);
      // Reset form
      setFormData({
        market_name: '',
        cover_photo: '',
        product_name: '',
        product_image: '',
        user_email: '',
        user_name: '',
        price: '',
        date: '',
      });

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding book:', error);
      setErrors({ submit: 'Failed to add book. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-green-100' style={styles.container}>
      <h2 style={styles.heading}>Add New Product</h2>
      
      {submitSuccess && (
        <div style={styles.successMessage}>
          Product added successfully!
        </div>
      )}

      {errors.submit && (
        <div style={styles.errorMessage}>
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Book Title */}
        <div className='' style={styles.formGroup}>
          <label style={styles.label}>
            Book Title:
            <input
              type="text"
              name="market_name"
              value={formData.market_name}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          {errors.market_name && <span style={styles.error}>{errors.market_name}</span>}
        </div>

        {/* Cover Photo URL */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Cover Photo URL:
            <input
              type="url"
              name="cover_photo"
              value={formData.cover_photo}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          {errors.cover_photo && <span style={styles.error}>{errors.cover_photo}</span>}
        </div>

        {/* Total Pages */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Amount of Product:
            <input
              type="number"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              style={styles.input}
              min="10tk"
            />
          </label>
          {errors.    product_name
 && <span style={styles.error}>{errors.    product_name
}</span>}
        </div>

        {/* Author */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Market Name:
            <input
              type="text"
              name="product_image"
              value={formData.product_image}
              onChange={handleChange} 
              style={styles.input}
            />
          </label>
          {errors.product_image && <span style={styles.error}>{errors.product_image}</span>}
        </div>

        {/* User Email (Read Only) ----------------------------------------------------------------*/}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Your Email
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              readOnly
              style={{ ...styles.input, backgroundColor: '#f5f5f5' }}
            />
          </label>
        </div>

        {/* User Name (Read Only) */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Your Name :
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
            onChange={handleChange}
              style={{ ...styles.input, backgroundColor: '#f5f5f5' }}
            />
          </label>
        </div>

        {/* Category Dropdown */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Category:
            <select
              name="book_category"
              value={formData.book_category}
              onChange={handleChange}
              style={styles.select}
            >
              {/*{categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}*/}
            </select>
          </label>
        </div>

        {/* Reading Status Dropdown */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Reading Status:
            <select
              name="reading_status"
              value={formData.reading_status}
              onChange={handleChange}
              style={styles.select}
            >
           {/*   {readingStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}*/}
            </select>
          </label>
        </div>


        {/* Submit Button */}
        <button 
          type="submit" 
          style={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Book...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    background: 'rgba(7, 88, 142, 0.14)',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontWeight: 'bold',
    fontSize: '2rem',
    letterSpacing: '1px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  label: {
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    marginTop: '6px'

  },
  select: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: 'white'
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    resize: 'vertical'
  },
  submitButton: {
    padding: '12px 20px',
    backgroundColor: '#81bde7ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    ':hover': {
      backgroundColor: '#8ccaeaff'
    },
    ':disabled': {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed'
    }
  },
  error: {
    color: 'red',
    fontSize: '14px'
  },
  errorMessage: {
    backgroundColor: '#ffebee',
    color: '#d32f2f',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px',
    border: '1px solid #ef9a9a'
  },
  successMessage: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px',
    border: '1px solid #a5d6a7'
  }
};

export default Addproducts;