import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";


const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    vendor_email: user?.email || '',
    vendor_name: user?.displayName || '',
    market_name: '',
    market_description: '',
    product_name: '',
    product_image: '',
    price: '',
    product_description: '',
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
    prices: [{ date: new Date().toISOString().split('T')[0], price: '' }]
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle price change
  const handlePriceChange = (index, field, value) => {
    const newPrices = [...formData.prices];
    newPrices[index][field] = value;
    setFormData({
      ...formData,
      prices: newPrices
    });
  };

  // Add new price entry
  const addPriceEntry = () => {
    setFormData({
      ...formData,
      prices: [...formData.prices, { date: new Date().toISOString().split('T')[0], price: '' }]
    });
  };

  // Remove price entry
  const removePriceEntry = (index) => {
    if (formData.prices.length > 1) {
      const newPrices = formData.prices.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        prices: newPrices
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validation
    const newErrors = {};
    if (!formData.market_name) newErrors.market_name = 'Market name is required';
    if (!formData.product_name) newErrors.product_name = 'Product name is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.product_image) newErrors.product_image = 'Product image is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Generate unique ID
      const productId = Date.now().toString();
      
      // Create product object
      const product = {
        id: productId,
        ...formData,
        createdAt: new Date().toISOString(),
        vendor_id: user?.uid || 'vendor-' + Date.now()
      };

      // Save to localStorage
      const existingProducts = JSON.parse(localStorage.getItem('vendorProducts') || '[]');
      const updatedProducts = [...existingProducts, product];
      localStorage.setItem('vendorProducts', JSON.stringify(updatedProducts));

      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        vendor_email: user?.email || '',
        vendor_name: user?.displayName || '',
        market_name: '',
        market_description: '',
        product_name: '',
        product_image: '',
        price: '',
        product_description: '',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        prices: [{ date: new Date().toISOString().split('T')[0], price: '' }]
      });

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🧑‍🌾 Add New Product</h1>
          <p className="text-gray-600">Submit daily price updates for your market items</p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            ✅ Product added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {/* Vendor Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📧 Vendor Email
              </label>
              <input
                type="email"
                value={formData.vendor_email}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🧑‍🌾 Vendor Name
              </label>
              <input
                type="text"
                value={formData.vendor_name}
                onChange={(e) => setFormData({...formData, vendor_name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Your name"
              />
            </div>
          </div>

          {/* Market Info */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🏪 Market Name *
            </label>
            <input
              type="text"
              name="market_name"
              value={formData.market_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter market name"
            />
            {errors.market_name && <p className="text-red-500 text-sm mt-1">{errors.market_name}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📝 Market Description
            </label>
            <textarea
              name="market_description"
              value={formData.market_description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Location, establishment details, market information..."
            />
          </div>

          {/* Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🥦 Product Name *
              </label>
              <input
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., Onion, Tomato"
              />
              {errors.product_name && <p className="text-red-500 text-sm mt-1">{errors.product_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💵 Price per Unit *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., 30"
                step="0.01"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🖼️ Product Image URL *
            </label>
            <input
              type="url"
              name="product_image"
              value={formData.product_image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="https://example.com/image.jpg"
            />
            {errors.product_image && <p className="text-red-500 text-sm mt-1">{errors.product_image}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📝 Product Description
            </label>
            <textarea
              name="product_description"
              value={formData.product_description}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Freshness, quality, special notes..."
            />
          </div>

          {/* Price History */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              💰 Price History (Optional)
            </label>
            {formData.prices.map((priceEntry, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="date"
                  value={priceEntry.date}
                  onChange={(e) => handlePriceChange(index, 'date', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  value={priceEntry.price}
                  onChange={(e) => handlePriceChange(index, 'price', e.target.value)}
                  placeholder="Price"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  step="0.01"
                />
                {formData.prices.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePriceEntry(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPriceEntry}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              ➕ Add Price Entry
            </button>
          </div>

          {/* Date */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📅 Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding Product...' : '📦 Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;