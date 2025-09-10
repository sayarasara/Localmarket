import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addadvertisement = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    status: 'pending'
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (!formData.image) {
      toast.error('Please upload an image');
      return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Advertisement data:', formData);
    
    // Show success message
    toast.success('Advertisement created successfully!');
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      image: null,
      status: 'pending'
    });
    setImagePreview(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Advertisement</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ad Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter advertisement title"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Short Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter a short description"
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Image Upload *</label>
          <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
              required
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <i className="fas fa-cloud-upload-alt text-blue-500 text-2xl mb-2"></i>
              <p>Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </label>
          </div>
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="max-h-40 rounded" />
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Advertisement
        </button>
      </form>
      
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
  );
};

export default Addadvertisement;