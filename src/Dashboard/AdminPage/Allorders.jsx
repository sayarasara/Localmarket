import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Allorders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadAllOrders();
    }, []);

    const loadAllOrders = () => {
        try {
            setIsLoading(true);
            
            // Try multiple possible storage keys
            const possibleKeys = [
                'userOrders',
                'orders', 
                'allOrders',
                'productOrders',
                'cartOrders',
                'marketplaceOrders'
            ];

            let allFoundOrders = [];

            possibleKeys.forEach(key => {
                try {
                    const storedData = localStorage.getItem(key);
                    if (storedData) {
                        const parsedData = JSON.parse(storedData);
                        if (Array.isArray(parsedData)) {
                            allFoundOrders = [...allFoundOrders, ...parsedData];
                        }
                    }
                } catch (error) {
                    console.warn(`Error reading from ${key}:`, error);
                }
            });

            // Also check for keys that might contain order data
            Object.keys(localStorage).forEach(key => {
                if (key.toLowerCase().includes('order') || key.toLowerCase().includes('cart')) {
                    try {
                        const storedData = localStorage.getItem(key);
                        if (storedData) {
                            const parsedData = JSON.parse(storedData);
                            if (Array.isArray(parsedData)) {
                                allFoundOrders = [...allFoundOrders, ...parsedData];
                            }
                        }
                    } catch (error) {
                        console.warn(`Error reading from ${key}:`, error);
                    }
                }
            });

            // Remove duplicates based on order ID or unique identifier
            const uniqueOrders = allFoundOrders.filter((order, index, self) =>
                index === self.findIndex((o) => (
                    o._id === order._id || 
                    o.orderId === order.orderId ||
                    (o.productId === order.productId && o.orderDate === order.orderDate)
                ))
            );

            console.log("Loaded orders:", uniqueOrders);
            setAllOrders(uniqueOrders);
            
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch {
            return 'Invalid Date';
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'shipped': return 'bg-blue-100 text-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const updateOrderStatus = (orderId, newStatus) => {
        const updatedOrders = allOrders.map(order => 
            order._id === orderId || order.orderId === orderId 
                ? { ...order, status: newStatus }
                : order
        );
        
        setAllOrders(updatedOrders);
        
        // Save back to localStorage
        localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <div className="mt-4 text-lg text-gray-600">Loading orders...</div>
                </div>
            </div>
        );
    }

    if (allOrders.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">All Orders</h1>
                    <div className="text-lg text-gray-600 mb-2">No orders found in the system</div>
                    <p className="text-sm text-gray-500">
                        Orders will appear here once they are placed by customers.
                    </p>
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg max-w-md mx-auto">
                        <p className="text-sm text-yellow-800">
                            💡 <strong>Note:</strong> Make sure your order placement system is saving orders to localStorage with the key 'userOrders'
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">📊 All Orders</h1>
            
            {/* Order Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{allOrders.length}</div>
                    <div className="text-sm text-blue-800">Total Orders</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">
                        ${allOrders.reduce((total, order) => total + (parseFloat(order.totalAmount || order.price || 0)), 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-green-800">Total Revenue</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                        {allOrders.filter(order => order.status === 'pending').length}
                    </div>
                    <div className="text-sm text-yellow-800">Pending Orders</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                        {allOrders.filter(order => order.status === 'delivered').length}
                    </div>
                    <div className="text-sm text-purple-800">Delivered Orders</div>
                </div>
            </div>

            {/* All Orders Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Info</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {allOrders.map((order, index) => (
                            <tr key={order._id || order.orderId || index} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                            📦
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {order.product_name || order.productName || 'Unknown Product'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Qty: {order.quantity || 1}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">
                                        {order.customerName || order.userName || order.vendor_name || 'N/A'}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {order.customerEmail || order.userEmail || order.vendor_email || ''}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-green-600">
                                        ${parseFloat(order.totalAmount || order.price || order.amount || 0).toFixed(2)}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">
                                        {formatDate(order.orderDate || order.date || order.createdAt)}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <select 
                                        value={order.status || 'pending'}
                                        onChange={(e) => updateOrderStatus(order._id || order.orderId, e.target.value)}
                                        className={`text-xs rounded-full px-3 py-1 font-medium ${getStatusColor(order.status)} border-none focus:ring-2 focus:ring-blue-500`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-2">
                                        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                            🔍 View
                                        </button>
                                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                            ✏️ Edit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allorders;