import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import UserRole from "../Hooks/UserRole";
import { Link } from "react-router";


const MyParcels = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth(); // Get current user
    const [role] = UserRole(); // Get user role

    // Fetch orders from your backend API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                // You'll need to implement this endpoint in your backend
                const response = await fetch('https://local-market-server-self.vercel.app/products', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching orders:', err);
                
                // Fallback: Check localStorage for watchlist items
                const watchlist = JSON.parse(localStorage.getItem('userWatchlist') || '[]');
                setOrders(watchlist);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    // Function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-lg">📦 Loading your orders...</div>
            </div>
        );
    }

    if (error && orders.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-center text-red-600">
                    <div className="text-2xl mb-4">⚠️</div>
                    <div className="text-lg">Error loading orders</div>
                    <p className="text-sm mt-2">{error}</p>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-center">
                    <div className="text-4xl mb-4">📦</div>
                    <div className="text-lg text-gray-600">No orders found</div>
                    <p className="text-sm text-gray-500 mt-2">
                        {role === 'admin' || role === 'vendor' 
                            ? 'No orders available in the system.'
                            : 'Your order list is empty. Start shopping to see your orders here!'
                        }
                    </p>
                    {role === 'user' && (
                        <Link 
                            to="/products" 
                            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            🛒 Start Shopping
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">📦 All Products List</h1>
            
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
                    <div className="text-sm text-blue-800">Total Orders</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">
                        ${orders.reduce((total, order) => total + (parseFloat(order.price) || 0), 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-green-800">Total Value</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                        {new Set(orders.map(order => order.market_name)).size}
                    </div>
                    <div className="text-sm text-purple-800">Different Markets</div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Market
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order, index) => (
                            <tr key={order._id || index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {order.product_image && (
                                            <img 
                                                src={order.product_image} 
                                                alt={order.product_name}
                                                className="w-12 h-12 rounded-md object-cover mr-3"
                                            />
                                        )}
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {order.product_name || 'Unknown Product'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                ID: {order._id || order.id || 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{order.market_name || 'Unknown Market'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-green-600">
                                        {order.price ? `$${parseFloat(order.price).toFixed(2)}` : 'N/A'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {formatDate(order.date || order.order_date || order.date_added)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        order.status === 'delivered' 
                                            ? 'bg-green-100 text-green-800'
                                            : order.status === 'shipped'
                                            ? 'bg-blue-100 text-blue-800'
                                            : order.status === 'cancelled'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {order.status || 'pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link
                                        to={`/Datacard/detail/${order._id || order.id}`}
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        🔍 View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Export/Print Options */}
            <div className="mt-6 flex justify-end space-x-4">
                
            </div>
        </div>
    );
};

export default MyParcels;