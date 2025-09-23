import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";


const Addadvertisement = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    status: 'pending',
    vendor_email: user?.email || '',
    vendor_name: user?.displayName || '',
    created_at: new Date().toISOString()
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validation
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Ad title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Generate unique ID
      const adId = Date.now().toString();
      
      // Create ad object
      const advertisement = {
        id: adId,
        ...formData,
        vendor_id: user?.uid || 'vendor-' + Date.now()
      };

      // Save to localStorage
      const existingAds = JSON.parse(localStorage.getItem('vendorAdvertisements') || '[]');
      const updatedAds = [...existingAds, advertisement];
      localStorage.setItem('vendorAdvertisements', JSON.stringify(updatedAds));

      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        image: '',
        status: 'pending',
        vendor_email: user?.email || '',
        vendor_name: user?.displayName || '',
        created_at: new Date().toISOString()
      });

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating advertisement:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📢 Create Advertisement</h1>
          <p className="text-gray-600">Promote your products with attractive ads</p>
        </div>

        {submitSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            ✅ Advertisement created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {/* Vendor Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>

          {/* Ad Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📝 Ad Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter advertisement title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📋 Short Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter advertisement description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Image URL */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🖼️ Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            {formData.image && (
              <div className="mt-2">
                <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
              </div>
            )}
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📊 Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="pending">⏳ Pending</option>
              <option value="approved">✅ Approved</option>
              <option value="rejected">❌ Rejected</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : '📢 Create Advertisement'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addadvertisement;