// components/layouts/Sidebar.jsx
import React from 'react';
import {
    HomeIcon,
    ChartBarIcon,
    UsersIcon,
    ShoppingBagIcon,
    CogIcon,
    UserCircleIcon,
    DocumentChartBarIcon,
    CreditCardIcon,
    HeartIcon,
    BellIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ currentView, setCurrentView, userRole, sidebarOpen, setSidebarOpen }) => {
    const navigation = {
        admin: [
            { name: 'Dashboard', icon: HomeIcon, view: 'dashboard' },
            { name: 'Analytics', icon: ChartBarIcon, view: 'analytics' },
            { name: 'Users', icon: UsersIcon, view: 'users' },
            { name: 'Products', icon: ShoppingBagIcon, view: 'products' },
            { name: 'Settings', icon: CogIcon, view: 'settings' },
            { name: 'Profile', icon: UserCircleIcon, view: 'profile' },
        ],
        user: [
            { name: 'Dashboard', icon: HomeIcon, view: 'dashboard' },
            { name: 'My Profile', icon: UserCircleIcon, view: 'profile' },
            { name: 'Orders', icon: ShoppingBagIcon, view: 'orders' },
            { name: 'Wishlist', icon: HeartIcon, view: 'wishlist' },
            { name: 'Settings', icon: CogIcon, view: 'settings' },
        ],
        seller: [
            { name: 'Dashboard', icon: HomeIcon, view: 'dashboard' },
            { name: 'Products', icon: ShoppingBagIcon, view: 'products' },
            { name: 'Orders', icon: DocumentChartBarIcon, view: 'orders' },
            { name: 'Analytics', icon: ChartBarIcon, view: 'analytics' },
            { name: 'Earnings', icon: CreditCardIcon, view: 'earnings' },
            { name: 'Profile', icon: UserCircleIcon, view: 'profile' },
        ],
        buyer: [
            { name: 'Dashboard', icon: HomeIcon, view: 'dashboard' },
            { name: 'Browse', icon: ShoppingBagIcon, view: 'browse' },
            { name: 'Orders', icon: DocumentChartBarIcon, view: 'orders' },
            { name: 'Wishlist', icon: HeartIcon, view: 'wishlist' },
            { name: 'Notifications', icon: BellIcon, view: 'notifications' },
            { name: 'Profile', icon: UserCircleIcon, view: 'profile' },
        ]
    };

    const currentNav = navigation[userRole] || navigation.user;

    return (
        <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-purple-900 to-purple-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex items-center justify-center h-16 px-4 bg-purple-900">
                    <h1 className="text-xl font-bold text-white">Dashboard Pro</h1>
                </div>

                {/* Profile Quick View */}
                <div className="p-4 border-b border-purple-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {userRole === 'admin' ? 'JD' : userRole === 'seller' ? 'MS' : userRole === 'buyer' ? 'EB' : 'SU'}
                        </div>
                        <div>
                            <p className="text-white font-medium text-sm">
                                {userRole === 'admin' ? 'John Admin' : userRole === 'seller' ? 'Mike Seller' : userRole === 'buyer' ? 'Emily Buyer' : 'Sarah User'}
                            </p>
                            <p className="text-purple-300 text-xs capitalize">{userRole}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mt-4 px-4">
                    <ul className="space-y-2">
                        {currentNav.map((item) => (
                            <li key={item.name}>
                                <button
                                    onClick={() => {
                                        setCurrentView(item.view);
                                        setSidebarOpen(false);
                                    }}
                                    className={`
                    w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${currentView === item.view
                                            ? 'bg-white text-purple-700 shadow-lg'
                                            : 'text-purple-200 hover:bg-purple-700 hover:text-white'
                                        }
                  `}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Quick Profile Action */}
                <div className="absolute bottom-4 left-4 right-4">
                    <button
                        onClick={() => setCurrentView('profile')}
                        className="w-full bg-white bg-opacity-10 hover:bg-opacity-20 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                        <UserCircleIcon className="h-4 w-4" />
                        <span>View Full Profile</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;