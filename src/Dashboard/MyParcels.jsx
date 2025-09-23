import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router";


const MyParcels = () => {
    const [orders, setOrders] = useState([]);
   const { user} = useAuth()
   

   const getOrdersKey = () => {
        return user ? `orders_${user.email}` : 'orders_guest';
    };

    // Fetch user orders from localStorage
    useEffect(() => {
        const ordersKey = getOrdersKey();
        const storedOrders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
        
        // Filter to show only current user's orders
        const userOrders = storedOrders.filter(order => 
            order.userEmail === (user?.email || 'guest')
        );
        setOrders(userOrders);
    }, [user]);


    // useEffect(() => {
    //     const storedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    //     setOrders(storedOrders);
    // }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'shipped': return 'bg-blue-100 text-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (orders.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-center">
                    <div className="text-4xl mb-4">📦</div>
                    <div className="text-lg text-gray-600">No orders yet</div>
                    <p className="text-sm text-gray-500 mt-2">
                        You haven't placed any orders yet.
                    </p>
                    <Link
                        to="/products" 
                        className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        🛒 Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">📦 My Orders</h1>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div style={{ width: 48, height: 48, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, borderRadius: 4 }}>
                                            📦
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {order.product_name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Qty: {order.quantity || 1}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">{order.market_name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-green-600">
                                        ${parseFloat(order.totalAmount || order.price || 0).toFixed(2)}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">
                                        {formatDate(order.orderDate)}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status || 'pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        to={`/Datacard/detail/${order.productId || order._id}`}
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        🔍 View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;