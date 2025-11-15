import React, { useState, useEffect } from 'react';

const SingleUserDashboard = () => {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+880 1XXX-XXXXXX",
        location: "Dhaka, Bangladesh",
        joinDate: "2023-01-15",
        totalProducts: 12,
        soldProducts: 4,
        rating: 4.8
    });

    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({
        totalViews: 1247,
        totalLikes: 89,
        responseRate: 95,
        avgResponseTime: "2.3 hours"
    });

    // Sample products data
    useEffect(() => {
        const sampleProducts = [
            {
                id: 1,
                name: "iPhone 13 Pro",
                price: "85000",
                condition: "excellent",
                status: "available",
                location: "Dhaka",
                category: "Electronics",
                dateAdded: "2024-01-15",
                views: 124,
                likes: 12,
                image: "https://images.unsplash.com/photo-1632661674596-618e45e56d61?w=400&h=300&fit=crop"
            },
            {
                id: 2,
                name: "Sony WH-1000XM4",
                price: "18500",
                condition: "good",
                status: "sold",
                location: "Chittagong",
                category: "Electronics",
                dateAdded: "2024-01-10",
                views: 89,
                likes: 8,
                image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop"
            },
            {
                id: 3,
                name: "MacBook Pro 2022",
                price: "125000",
                condition: "excellent",
                status: "available",
                location: "Dhaka",
                category: "Electronics",
                dateAdded: "2024-01-08",
                views: 156,
                likes: 15,
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop"
            },
            {
                id: 4,
                name: "Canon EOS R6",
                price: "185000",
                condition: "excellent",
                status: "available",
                location: "Sylhet",
                category: "Electronics",
                dateAdded: "2024-01-05",
                views: 78,
                likes: 6,
                image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop"
            }
        ];
        setProducts(sampleProducts);
    }, []);

    const availableProducts = products.filter(p => p.status === 'available');
    const soldProducts = products.filter(p => p.status === 'sold');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-600 hover:text-gray-900">
                                <i className="fas fa-bell text-lg"></i>
                            </button>
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                JD
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* User Profile Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                JD
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                                <p className="text-gray-600">{user.email}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <i 
                                                key={i}
                                                className={`fas fa-star ${i < Math.floor(user.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            ></i>
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">({user.rating})</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <i className="fas fa-edit mr-2"></i>
                                Edit Profile
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                <i className="fas fa-cog mr-2"></i>
                                Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900">{user.totalProducts}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <i className="fas fa-box text-blue-600 text-xl"></i>
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-sm text-green-600">
                                <i className="fas fa-arrow-up mr-1"></i>
                                12% from last month
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Products Sold</p>
                                <p className="text-2xl font-bold text-gray-900">{user.soldProducts}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <i className="fas fa-tag text-green-600 text-xl"></i>
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-sm text-green-600">
                                <i className="fas fa-arrow-up mr-1"></i>
                                8% from last month
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Views</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <i className="fas fa-eye text-purple-600 text-xl"></i>
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-sm text-green-600">
                                <i className="fas fa-arrow-up mr-1"></i>
                                23% from last month
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.responseRate}%</p>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <i className="fas fa-comment text-orange-600 text-xl"></i>
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-sm text-gray-600">
                                Avg. time: {stats.avgResponseTime}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {['overview', 'products', 'analytics', 'messages', 'reviews'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                                        activeTab === tab
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Recent Activity */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                                    <div className="space-y-3">
                                        {[
                                            { action: 'added', product: 'iPhone 13 Pro', time: '2 hours ago' },
                                            { action: 'sold', product: 'Sony Headphones', time: '1 day ago' },
                                            { action: 'updated', product: 'MacBook Pro', time: '2 days ago' },
                                            { action: 'received', review: '5-star review', time: '3 days ago' }
                                        ].map((activity, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <i className="fas fa-bell text-blue-600 text-sm"></i>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-900">
                                                        You {activity.action} {activity.product || activity.review}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                                        <h4 className="font-semibold mb-2">Sales Performance</h4>
                                        <p className="text-3xl font-bold mb-2">৳{user.soldProducts * 25000}</p>
                                        <p className="text-blue-100">Total revenue from sales</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                                        <h4 className="font-semibold mb-2">Success Rate</h4>
                                        <p className="text-3xl font-bold mb-2">
                                            {Math.round((user.soldProducts / user.totalProducts) * 100)}%
                                        </p>
                                        <p className="text-green-100">Products sold vs listed</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'products' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">My Products</h3>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        <i className="fas fa-plus mr-2"></i>
                                        Add New Product
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <div key={product.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                            <img 
                                                src={product.image} 
                                                alt={product.name}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        product.status === 'available' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {product.status}
                                                    </span>
                                                </div>
                                                <p className="text-lg font-bold text-blue-600 mb-2">৳{product.price}</p>
                                                <div className="flex justify-between text-sm text-gray-600 mb-3">
                                                    <span>{product.condition}</span>
                                                    <span>{product.location}</span>
                                                </div>
                                                <div className="flex justify-between text-sm text-gray-500">
                                                    <span>
                                                        <i className="fas fa-eye mr-1"></i>
                                                        {product.views}
                                                    </span>
                                                    <span>
                                                        <i className="fas fa-heart mr-1"></i>
                                                        {product.likes}
                                                    </span>
                                                    <span>{product.dateAdded}</span>
                                                </div>
                                                <div className="flex space-x-2 mt-4">
                                                    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                                                        Edit
                                                    </button>
                                                    <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                                                        View
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics Overview</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                                        <h4 className="font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Conversion Rate', value: '12.5%', change: '+2.1%' },
                                                { label: 'Avg. Price', value: '৳45,200', change: '+5.3%' },
                                                { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.2' },
                                                { label: 'Return Rate', value: '2.1%', change: '-0.5%' }
                                            ].map((metric, index) => (
                                                <div key={index} className="flex justify-between items-center">
                                                    <span className="text-gray-600">{metric.label}</span>
                                                    <div className="text-right">
                                                        <span className="font-semibold text-gray-900">{metric.value}</span>
                                                        <span className={`ml-2 text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                                            {metric.change}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                                        <h4 className="font-semibold text-gray-900 mb-4">Top Performing Products</h4>
                                        <div className="space-y-3">
                                            {products.slice(0, 3).map((product, index) => (
                                                <div key={product.id} className="flex items-center space-x-3">
                                                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                                        {index + 1}
                                                    </span>
                                                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-900">{product.name}</p>
                                                        <p className="text-sm text-gray-600">{product.views} views</p>
                                                    </div>
                                                    <span className="font-semibold text-blue-600">৳{product.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'messages' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Messages</h3>
                                <div className="bg-white border border-gray-200 rounded-xl">
                                    {[
                                        { name: 'Sarah Johnson', product: 'iPhone 13 Pro', message: 'Is this still available?', time: '2 min ago', unread: true },
                                        { name: 'Mike Chen', product: 'MacBook Pro', message: 'Can you do ৳110,000?', time: '1 hour ago', unread: false },
                                        { name: 'Emma Wilson', product: 'Canon EOS R6', message: 'When can I come see it?', time: '3 hours ago', unread: false }
                                    ].map((msg, index) => (
                                        <div key={index} className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${msg.unread ? 'bg-blue-50' : ''}`}>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                    {msg.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-semibold text-gray-900">{msg.name}</h4>
                                                        <span className="text-sm text-gray-500">{msg.time}</span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm">{msg.product}</p>
                                                    <p className="text-gray-900 mt-1">{msg.message}</p>
                                                </div>
                                                {msg.unread && (
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Reviews</h3>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Sarah Johnson', rating: 5, comment: 'Great seller! Product was exactly as described and delivery was fast.', product: 'iPhone 13 Pro', date: '2024-01-10' },
                                        { name: 'Mike Chen', rating: 4, comment: 'Good communication and smooth transaction. Would buy again!', product: 'Sony Headphones', date: '2024-01-08' },
                                        { name: 'Emma Wilson', rating: 5, comment: 'Excellent condition and very professional. Highly recommended!', product: 'MacBook Pro', date: '2024-01-05' }
                                    ].map((review, index) => (
                                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                                    <p className="text-sm text-gray-600">{review.product}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <i 
                                                            key={i}
                                                            className={`fas fa-star ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        ></i>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-700 mb-2">{review.comment}</p>
                                            <p className="text-sm text-gray-500">{review.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleUserDashboard;