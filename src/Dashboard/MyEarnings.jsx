import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Offers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Sample offers data - no backend needed
    const sampleOffers = [
        {
            id: 1,
            title: 'Summer Fruit Festival',
            description: 'Enjoy 50% off on all seasonal fruits including mangoes, berries, and watermelons. Perfect for summer refreshment!',
            market: 'Fresh Market',
            discount: '50% OFF',
            validUntil: '2024-08-31',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
            category: 'fruits',
            badge: 'HOT DEAL',
            originalPrice: '$20.00',
            discountedPrice: '$10.00'
        },
        {
            id: 2,
            title: 'Lentils',
            description: 'Enjoy 20% off on all seasonal Lentils. Perfect for breakfast and tea time!',
            market: 'Dhaka City Supermarket',
            discount: '20% OFF',
            validUntil: '2024-07-20',
            image: 'https://c8.alamy.com/comp/B2K14N/dried-lentils-in-a-market-in-thanjavur-south-india-B2K14N.jpg',
            category: 'Gloosary',
            badge: 'POPULAR',
            originalPrice: '$15.00',
            discountedPrice: '$7.50'
        },
        {
            id: 3,
            title: 'Bakery Bonanza',
            description: 'Buy 2 get 1 free on all freshly baked bread, pastries, and cakes. Perfect for breakfast and tea time!',
            market: 'Bakery Corner',
            discount: 'BUY 2 GET 1',
            validUntil: '2024-07-20',
            image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop',
            category: 'bakery',
            badge: 'POPULAR',
            originalPrice: '$15.00',
            discountedPrice: '$7.50'
        },
        {
            id: 4,
            title: 'Organic Week',
            description: '20% discount on all organic vegetables and fruits. Farm fresh and chemical-free products!',
            market: 'Organic Haven',
            discount: '20% OFF',
            validUntil: '2024-07-31',
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
            category: 'organic',
            badge: 'HEALTHY',
            originalPrice: '$25.00',
            discountedPrice: '$20.00'
        },
        {
            id: 5,
            title: 'Seafood Special',
            description: 'Fresh catch of the day at 30% off. Includes fish, shrimp, crabs, and more!',
            market: 'Ocean Delights',
            discount: '30% OFF',
            validUntil: '2024-07-25',
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
            category: 'seafood',
            badge: 'FRESH',
            originalPrice: '$35.00',
            discountedPrice: '$24.50'
        },
        {
            id: 6,
            title: 'Turmeric',
            description: 'Get 15% off on fresh turmeric. Fresh from local farms!',
            market: 'Spice Bazaa',
            discount: '15% OFF',
            validUntil: '2024-07-28',
            image: 'https://i.pinimg.com/736x/da/92/12/da921204fcaed8787b3ff78f458bf676.jpg',
            category: 'dairy',
            badge: 'FRESH',
            originalPrice: '$18.00',
            discountedPrice: '$15.30'
        },
        {
            id: 7,
            title: 'Meat Madness',
            description: 'Special prices on premium cuts of beef, chicken, and lamb. Perfect for weekend BBQ!',
            market: 'Prime Cuts',
            discount: '25% OFF',
            validUntil: '2024-07-22',
            image: 'https://c8.alamy.com/comp/E4GC0K/sides-of-beef-hanging-in-the-refrigerator-at-hopcott-meats-a-shop-E4GC0K.jpg',
            category: 'meat',
            badge: 'PREMIUM',
            originalPrice: '$40.00',
            discountedPrice: '$30.00'
        }



    ];

    // Filter offers based on search and category
    const filteredOffers = sampleOffers.filter(offer => {
        const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             offer.market.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    // Categories for filter
    const categories = ['all', 'fruits', 'bakery', 'organic', 'seafood', 'dairy', 'meat'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        🎁 Exclusive Offers
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover amazing deals and discounts from your favorite local markets. 
                        No login required - browse all offers freely!
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                🔍 Search Offers
                            </label>
                            <input
                                type="text"
                                placeholder="Search by title, market, or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                🏷️ Filter by Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filteredOffers.map(offer => (
                        <div key={offer.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            {/* Offer Image */}
                            <div className="relative">
                                <img 
                                    src={offer.image} 
                                    alt={offer.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        offer.badge === 'HOT DEAL' ? 'bg-red-500 text-white' :
                                        offer.badge === 'POPULAR' ? 'bg-blue-500 text-white' :
                                        offer.badge === 'HEALTHY' ? 'bg-green-500 text-white' :
                                        'bg-purple-500 text-white'
                                    }`}>
                                        {offer.badge}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-md">
                                    <span className="text-2xl font-bold text-green-600">{offer.discount}</span>
                                </div>
                            </div>

                            {/* Offer Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{offer.title}</h3>
                                <p className="text-gray-600 mb-4 text-sm">{offer.description}</p>
                                
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-semibold text-gray-700">🏪 {offer.market}</span>
                                    <span className="text-sm text-gray-500">📅 Valid until: {offer.validUntil}</span>
                                </div>

                                {/* Price Section */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl font-bold text-green-600">{offer.discountedPrice}</span>
                                        <span className="text-lg text-gray-400 line-through">{offer.originalPrice}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                                        {offer.category.toUpperCase()}
                                    </span>
                                </div>

                                {/* Action Button */}
                                <Link
                                    to="/Datacard"
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 block text-center"
                                >
                                    🛒 Shop Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredOffers.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No offers found</h3>
                        <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                            }}
                            className="bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Stats Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Shop With Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="text-4xl mb-2">🚚</div>
                            <h4 className="font-semibold text-gray-800 mb-2">Free Delivery</h4>
                            <p className="text-gray-600">On orders above $50</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-2">⭐</div>
                            <h4 className="font-semibold text-gray-800 mb-2">Best Quality</h4>
                            <p className="text-gray-600">Fresh from local markets</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-2">💝</div>
                            <h4 className="font-semibold text-gray-800 mb-2">Daily Offers</h4>
                            <p className="text-gray-600">New deals every day</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offers;