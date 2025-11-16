// components/layouts/Header.jsx
import React, { useState } from 'react';
import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';

const Header = ({ user, sidebarOpen, setSidebarOpen, userRole, setUserRole }) => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const roleColors = {
        admin: 'bg-red-500',
        user: 'bg-blue-500',
        seller: 'bg-green-500',
        buyer: 'bg-purple-500'
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 z-10">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Left Section */}
                <div className="flex items-center">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    <h1 className="ml-2 text-xl font-semibold text-gray-800 capitalize">
                        {userRole} Dashboard
                    </h1>

                    <span className={`ml-3 px-2 py-1 text-xs rounded-full text-white ${roleColors[userRole]}`}>
                        {userRole}
                    </span>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    {/* Role Switcher - For Demo Only */}
                    <select
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="seller">Seller</option>
                        <option value="buyer">Buyer</option>
                    </select>

                    {/* Notifications */}
                    <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                        <BellIcon className="h-6 w-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                            className="flex items-center space-x-3 p-1 rounded-lg hover:bg-gray-100"
                        >
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.avatar}
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                            </div>
                        </button>

                        {showProfileDropdown && (
                            <ProfileDropdown
                                user={user}
                                onClose={() => setShowProfileDropdown(false)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;