// Dashboard.jsx
import React, { useState } from 'react';
import {
    BellIcon,
    ChartBarIcon,
    ShoppingCartIcon,
    UsersIcon,
    CurrencyDollarIcon,
    ChartPieIcon,
    ArrowUpIcon,
    ArrowDownIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Sample data
    const stats = [
        {
            title: 'Total Revenue',
            value: '$45,231',
            change: '+12%',
            trend: 'up',
            icon: CurrencyDollarIcon,
            color: 'from-green-500 to-emerald-500'
        },
        {
            title: 'New Customers',
            value: '1,234',
            change: '+8%',
            trend: 'up',
            icon: UsersIcon,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            title: 'Sales',
            value: '12,543',
            change: '-3%',
            trend: 'down',
            icon: ShoppingCartIcon,
            color: 'from-purple-500 to-pink-500'
        },
        {
            title: 'Conversion Rate',
            value: '23.5%',
            change: '+5%',
            trend: 'up',
            icon: ChartBarIcon,
            color: 'from-orange-500 to-red-500'
        }
    ];

    const recentActivities = [
        { id: 1, user: 'John Doe', action: 'placed new order', time: '2 min ago' },
        { id: 2, user: 'Sarah Smith', action: 'completed payment', time: '5 min ago' },
        { id: 3, user: 'Mike Johnson', action: 'registered new account', time: '10 min ago' },
        { id: 4, user: 'Emily Davis', action: 'requested support', time: '15 min ago' }
    ];

    const topProducts = [
        { name: 'Premium Headphones', sales: 234, revenue: '$12,345' },
        { name: 'Smart Watch', sales: 189, revenue: '$9,876' },
        { name: 'Wireless Earbuds', sales: 156, revenue: '$7,890' },
        { name: 'Laptop Stand', sales: 143, revenue: '$4,567' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="relative p-2 text-gray-600 hover:text-gray-900">
                                <BellIcon className="h-6 w-6" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    JD
                                </div>
                                <span className="text-sm font-medium text-gray-700">John Doe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                    <div className={`flex items-center mt-2 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {stat.trend === 'up' ? (
                                            <ArrowUpIcon className="h-4 w-4 mr-1" />
                                        ) : (
                                            <ArrowDownIcon className="h-4 w-4 mr-1" />
                                        )}
                                        <span className="text-sm font-medium">{stat.change}</span>
                                        <span className="text-sm text-gray-500 ml-1">from last month</span>
                                    </div>
                                </div>
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts and Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Sales Chart */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg font-medium">
                                        Monthly
                                    </button>
                                    <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg font-medium">
                                        Quarterly
                                    </button>
                                </div>
                            </div>

                            {/* Simplified Chart */}
                            <div className="h-64 bg-gradient-to-b from-purple-50 to-pink-50 rounded-xl p-4">
                                <div className="flex items-end justify-between h-40">
                                    {[40, 60, 75, 55, 80, 65, 90, 70, 85, 60, 75, 95].map((height, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <div
                                                className={`w-6 rounded-t-lg ${index === 11
                                                        ? 'bg-gradient-to-t from-purple-600 to-pink-600'
                                                        : 'bg-gradient-to-t from-purple-400 to-pink-400'
                                                    }`}
                                                style={{ height: `${height}%` }}
                                            ></div>
                                            <span className="text-xs text-gray-500 mt-2">
                                                {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Activities */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h2>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                <span className="font-semibold">{activity.user}</span> {activity.action}
                                            </p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Content */}
                    <div className="space-y-8">
                        {/* Top Products */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Products</h2>
                            <div className="space-y-4">
                                {topProducts.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-500">{product.sales} sales</p>
                                        </div>
                                        <span className="font-semibold text-purple-600">{product.revenue}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
                            <h2 className="text-lg font-semibold mb-4">Performance Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span>Monthly Goal</span>
                                    <span className="font-semibold">85%</span>
                                </div>
                                <div className="w-full bg-purple-500 rounded-full h-2">
                                    <div className="bg-white h-2 rounded-full w-4/5"></div>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span>Customer Satisfaction</span>
                                    <span className="font-semibold">92%</span>
                                </div>
                                <div className="w-full bg-purple-500 rounded-full h-2">
                                    <div className="bg-white h-2 rounded-full w-11/12"></div>
                                </div>
                            </div>

                            <button className="w-full mt-6 bg-white text-purple-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                View Full Report
                            </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="p-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                                    Add Product
                                </button>
                                <button className="p-3 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors">
                                    New Campaign
                                </button>
                                <button className="p-3 bg-purple-50 text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition-colors">
                                    Analytics
                                </button>
                                <button className="p-3 bg-orange-50 text-orange-600 rounded-lg font-medium hover:bg-orange-100 transition-colors">
                                    Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;