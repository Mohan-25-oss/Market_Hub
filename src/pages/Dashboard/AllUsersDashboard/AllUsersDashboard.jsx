import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/Auth';
import { useUsers } from '../context/UserContext';

export default function AllUsersDashboard() {
    const { currentUser, isAdmin, loading } = useAuth();
    const {
        stats,
        showCreateModal,
        setShowCreateModal,
        showDeleteModal,
        confirmDelete,
        setShowDeleteModal,
        userToDelete,
        showEditModal,
        saveEdit,
        setShowEditModal,
        editingUser,
        setEditingUser,
        createNewUser,
        newUser,
        setNewUser,
        notification,
        roleOptions,
        statusOptions
    } = useUsers();

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    // Get current tab from route
    const currentTab = React.useMemo(() => {
        const path = location.pathname;
        if (path.includes('/allusers') || path === '/') return "All Users";
        if (path.includes('/activeusers')) return "Active Users";
        if (path.includes('/pendingusers')) return "Pending Review";
        if (path.includes('/analytics')) return "User Analytics";
        if (path.includes('/settings')) return "Settings";
        return "All Users";
    }, [location.pathname]);

    // Navigation items with routes
    const navItems = [
        { name: "All Users", icon: "👥", badge: stats.total, path: "/allusers" },
        { name: "Active Users", icon: "🟢", badge: stats.active, path: "/activeusers" },
        { name: "Pending Review", icon: "🟡", badge: stats.pending, path: "/pendingusers" },
        { name: "User Analytics", icon: "📊", path: "/analytics" },
        { name: "Settings", icon: "⚙️", path: "/settings" },
    ];

    // Form validation
    const validateForm = (user, isEdit = false) => {
        const newErrors = {};
        if (!user.name?.trim()) newErrors.name = 'Name is required';
        if (!user.email?.trim()) newErrors.email = 'Email is required';
        if (user.email && !/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        return newErrors;
    };

    const handleCreateUser = () => {
        const formErrors = validateForm(newUser);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setErrors({});
        createNewUser();
    };

    const handleSaveEdit = () => {
        const formErrors = validateForm(editingUser, true);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setErrors({});
        saveEdit();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
                    <p className="text-gray-600 mb-6">
                        You need administrator privileges to access the User Management dashboard.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-6">
            {/* NOTIFICATION */}
            {notification.show && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border-l-4 ${notification.type === "error"
                        ? "bg-red-50 border-red-500 text-red-700"
                        : "bg-green-50 border-green-500 text-green-700"
                    } transition-all duration-300 transform translate-x-0`}>
                    <div className="flex items-center">
                        <span className="font-medium">{notification.message}</span>
                    </div>
                </div>
            )}

            {/* CENTERED HEADER */}
            <div className="max-w-7xl mx-auto mb-8 text-center ml-60">
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm border border-white/20 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            User Management
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manage your team members and permissions
                        </p>
                    </div>
                </div>

                {/* STATISTICS CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    {[
                        { label: "Total Users", value: stats.total, color: "from-blue-500 to-blue-600", icon: "👥" },
                        { label: "Active", value: stats.active, color: "from-green-500 to-green-600", icon: "🟢" },
                        { label: "Pending", value: stats.pending, color: "from-yellow-500 to-yellow-600", icon: "🟡" },
                        { label: "Suspended", value: stats.suspended, color: "from-red-500 to-red-600", icon: "🔴" },
                        { label: "Admins", value: stats.admins, color: "from-purple-500 to-purple-600", icon: "👑" },
                    ].map((stat, index) => (
                        <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className="text-2xl">{stat.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MAIN DASHBOARD */}
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* SIDEBAR */}
                        <div className="lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-200/50 bg-gradient-to-b from-white to-gray-50/50">
                            <div className="p-6">
                                {/* Current User Info */}
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 text-white mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                            <span className="font-bold">{currentUser?.avatar || "👤"}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{currentUser?.name || "Admin User"}</p>
                                            <p className="text-blue-100 text-sm">Administrator</p>
                                        </div>
                                    </div>
                                </div>

                                <nav className="space-y-2">
                                    {navItems.map((item) => (
                                        <button
                                            key={item.name}
                                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${currentTab === item.name
                                                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                                                    : "text-gray-600 hover:bg-white hover:shadow-lg hover:border hover:border-gray-200/50"
                                                }`}
                                            onClick={() => navigate(item.path)}
                                            aria-current={currentTab === item.name ? "page" : undefined}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <span className="text-lg">{item.icon}</span>
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                            {item.badge !== undefined && (
                                                <span className={`px-2 py-1 rounded-full text-xs ${currentTab === item.name
                                                        ? "bg-white/20 text-white"
                                                        : "bg-gray-100 text-gray-600"
                                                    }`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </nav>

                                {/* Create User Button */}
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="w-full mt-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-200 transform hover:scale-105"
                                    aria-label="Create new user"
                                >
                                    + Create New User
                                </button>
                            </div>
                        </div>

                        {/* MAIN CONTENT */}
                        <div className="flex-1 p-6 lg:p-8">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

            {/* MODALS */}
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-user-title"
                >
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full transform transition-all duration-200 scale-95 animate-in">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3 id="delete-user-title" className="text-xl font-bold text-gray-900 text-center mb-2">Delete User</h3>
                        <p className="text-gray-600 text-center mb-6">
                            Are you sure you want to delete <span className="font-semibold">{userToDelete?.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex justify-center space-x-3">
                            <button
                                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                                onClick={() => setShowDeleteModal(false)}
                                aria-label="Cancel deletion"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium shadow-lg shadow-red-500/25"
                                onClick={confirmDelete}
                                aria-label="Confirm user deletion"
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && editingUser && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="edit-user-title"
                >
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full transform transition-all duration-200 scale-95 animate-in">
                        <h3 id="edit-user-title" className="text-xl font-bold text-gray-900 mb-6 text-center">Edit User</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 ${errors.name ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    value={editingUser.name}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 ${errors.email ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                                        value={editingUser.role}
                                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                    >
                                        {roleOptions.map(role => (
                                            <option key={role.value} value={role.value}>{role.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                                        value={editingUser.status}
                                        onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status.value} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-3 mt-8">
                            <button
                                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                                onClick={() => {
                                    setShowEditModal(false);
                                    setErrors({});
                                }}
                                aria-label="Cancel editing"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium shadow-lg shadow-blue-500/25"
                                onClick={handleSaveEdit}
                                aria-label="Save user changes"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create User Modal */}
            {showCreateModal && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="create-user-title"
                >
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full transform transition-all duration-200 scale-95 animate-in">
                        <h3 id="create-user-title" className="text-xl font-bold text-gray-900 mb-6 text-center">Create New User</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 ${errors.name ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    placeholder="Enter full name"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 ${errors.email ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    placeholder="Enter email address"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    >
                                        {roleOptions.map(role => (
                                            <option key={role.value} value={role.value}>{role.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                                        value={newUser.status}
                                        onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status.value} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-3 mt-8]">
                            <button
                                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setErrors({});
                                }}
                                aria-label="Cancel user creation"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleCreateUser}
                                disabled={!newUser.name || !newUser.email}
                                aria-label="Create new user"
                            >
                                Create User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}