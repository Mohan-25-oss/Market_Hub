import React, { useState, useMemo, useEffect } from "react";

// Enhanced initial data
const initialUsers = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", role: "Manager", status: "suspended", createdAt: "2025-01-01", lastActive: "2025-06-01", avatar: "SJ" },
    { id: 2, name: "Mike Chen", email: "mike.chen@example.com", role: "Viewer", status: "active", createdAt: "2025-02-15", lastActive: "2025-07-20", avatar: "MC" },
    { id: 3, name: "Emma Davis", email: "emma.d@example.com", role: "Editor", status: "pending", createdAt: "2025-03-10", lastActive: "2025-07-18", avatar: "ED" },
    { id: 4, name: "Alex Rodriguez", email: "alex.r@example.com", role: "Editor", status: "active", createdAt: "2025-04-05", lastActive: "2025-07-22", avatar: "AR" },
    { id: 5, name: "Priya Patel", email: "priya.p@example.com", role: "Manager", status: "pending", createdAt: "2025-05-20", lastActive: "2025-07-15", avatar: "PP" },
    { id: 6, name: "James Wilson", email: "james.w@example.com", role: "Admin", status: "active", createdAt: "2025-01-15", lastActive: "2025-07-23", avatar: "JW" },
];

// Role options with colors and permissions
const roleOptions = [
    { value: "Viewer", label: "Viewer", color: "bg-blue-100 text-blue-800 border-blue-200", description: "Can view content only" },
    { value: "Editor", label: "Editor", color: "bg-purple-100 text-purple-800 border-purple-200", description: "Can edit and create content" },
    { value: "Manager", label: "Manager", color: "bg-green-100 text-green-800 border-green-200", description: "Can manage team members" },
    { value: "Admin", label: "Admin", color: "bg-red-100 text-red-800 border-red-200", description: "Full system access" },
];

// Status options
const statusOptions = [
    { value: "active", label: "Active", color: "bg-green-100 text-green-800 border-green-200", icon: "🟢" },
    { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: "🟡" },
    { value: "suspended", label: "Suspended", color: "bg-red-100 text-red-800 border-red-200", icon: "🔴" },
];

// Mock authentication hook
const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Simulate user login - in real app, this would come from your auth system
        const adminUser = initialUsers.find(user => user.role === "Admin");
        setCurrentUser(adminUser);
    }, []);

    const isAdmin = currentUser?.role === "Admin";

    return { currentUser, isAdmin };
};

export default function AllUserManagement() {
    const [users, setUsers] = useState(initialUsers);
    const [selectedTab, setSelectedTab] = useState("All Users");
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "Viewer", status: "pending" });
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });

    const { currentUser, isAdmin } = useAuth();

    // Show notification
    const showNotification = (message, type = "success") => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
    };

    // Filter users based on search and filters
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = roleFilter === "All" || user.role === roleFilter;
            const matchesStatus = statusFilter === "All" || user.status === statusFilter;

            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, searchTerm, roleFilter, statusFilter]);

    // Statistics
    const stats = useMemo(() => ({
        total: users.length,
        active: users.filter(u => u.status === "active").length,
        pending: users.filter(u => u.status === "pending").length,
        suspended: users.filter(u => u.status === "suspended").length,
        admins: users.filter(u => u.role === "Admin").length,
    }), [users]);

    // Status toggle with proper cycle
    const toggleStatus = (userId) => {
        if (!isAdmin) {
            showNotification("Admin access required to modify user status", "error");
            return;
        }

        setUsers(prev =>
            prev.map(u => {
                if (u.id === userId) {
                    const statusCycle = { active: "pending", pending: "suspended", suspended: "active" };
                    return { ...u, status: statusCycle[u.status] };
                }
                return u;
            })
        );
        showNotification("User status updated successfully");
    };

    // Role update
    const updateRole = (userId, newRole) => {
        if (!isAdmin) {
            showNotification("Admin access required to modify user roles", "error");
            return;
        }

        setUsers(prev => prev.map(u =>
            u.id === userId ? { ...u, role: newRole } : u
        ));
        showNotification("User role updated successfully");
    };

    // Delete user with confirmation modal
    const initiateDelete = (user) => {
        if (!isAdmin) {
            showNotification("Admin access required to delete users", "error");
            return;
        }

        if (user.role === "Admin") {
            showNotification("Cannot delete admin users", "error");
            return;
        }

        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
        showNotification("User deleted successfully");
    };

    // Edit user
    const initiateEdit = (user) => {
        if (!isAdmin) {
            showNotification("Admin access required to edit users", "error");
            return;
        }
        setEditingUser({ ...user });
        setShowEditModal(true);
    };

    const saveEdit = () => {
        setUsers(prev => prev.map(u =>
            u.id === editingUser.id ? editingUser : u
        ));
        setShowEditModal(false);
        setEditingUser(null);
        showNotification("User updated successfully");
    };

    // Create new user
    const createNewUser = () => {
        if (!isAdmin) {
            showNotification("Admin access required to create users", "error");
            return;
        }

        const user = {
            ...newUser,
            id: Math.max(...users.map(u => u.id)) + 1,
            createdAt: new Date().toISOString().split('T')[0],
            lastActive: new Date().toISOString().split('T')[0],
            avatar: newUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
        };

        setUsers(prev => [...prev, user]);
        setShowCreateModal(false);
        setNewUser({ name: "", email: "", role: "Viewer", status: "pending" });
        showNotification("User created successfully");
    };

    // Get status color
    const getStatusColor = (status) => {
        const statusObj = statusOptions.find(s => s.value === status);
        return statusObj?.color || "bg-gray-100 text-gray-800 border-gray-200";
    };

    // Get role color
    const getRoleColor = (role) => {
        const roleObj = roleOptions.find(r => r.value === role);
        return roleObj?.color || "bg-gray-100 text-gray-800 border-gray-200";
    };

    // If not admin, show access denied
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
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                        Retry Authentication
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

            {/* CENTERED HEADER AT THE TOP */}
            <div className="max-w-7xl mx-auto mb-8 text-center">
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
                                            <span className="font-bold">{currentUser?.avatar}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{currentUser?.name}</p>
                                            <p className="text-blue-100 text-sm">Administrator</p>
                                        </div>
                                    </div>
                                </div>

                                <nav className="space-y-2">
                                    {[
                                        { name: "All Users", icon: "👥", badge: stats.total },
                                        { name: "Active Users", icon: "🟢", badge: stats.active },
                                        { name: "Pending Review", icon: "🟡", badge: stats.pending },
                                        { name: "User Analytics", icon: "📊" },
                                        { name: "Settings", icon: "⚙️" },
                                    ].map((item) => (
                                        <button
                                            key={item.name}
                                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${selectedTab === item.name
                                                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                                                    : "text-gray-600 hover:bg-white hover:shadow-lg hover:border hover:border-gray-200/50"
                                                }`}
                                            onClick={() => setSelectedTab(item.name)}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <span className="text-lg">{item.icon}</span>
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                            {item.badge !== undefined && (
                                                <span className={`px-2 py-1 rounded-full text-xs ${selectedTab === item.name
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
                                    className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-200 transform hover:scale-105"
                                >
                                    + Create New User
                                </button>
                            </div>
                        </div>

                        {/* MAIN CONTENT */}
                        <div className="flex-1 p-6 lg:p-8">
                            {/* HEADER WITH FILTERS */}
                            <div className="mb-8">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{selectedTab}</h2>
                                        <p className="text-gray-600 mt-1">
                                            {filteredUsers.length} of {users.length} users
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search users..."
                                                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80 bg-white/50 backdrop-blur-sm"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* FILTERS */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    <select
                                        className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm"
                                        value={roleFilter}
                                        onChange={(e) => setRoleFilter(e.target.value)}
                                    >
                                        <option value="All">All Roles</option>
                                        {roleOptions.map(role => (
                                            <option key={role.value} value={role.value}>{role.label}</option>
                                        ))}
                                    </select>

                                    <select
                                        className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="All">All Status</option>
                                        {statusOptions.map(status => (
                                            <option key={status.value} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* USERS TABLE */}
                                <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200/50">
                                            <thead className="bg-gray-50/50">
                                                <tr>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200/50">
                                                {filteredUsers.map((user) => (
                                                    <tr key={user.id} className="hover:bg-white/70 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                                                                    {user.avatar}
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <select
                                                                className={`text-sm font-semibold px-3 py-2 rounded-xl border ${getRoleColor(user.role)} focus:ring-2 focus:ring-blue-500`}
                                                                value={user.role}
                                                                onChange={(e) => updateRole(user.id, e.target.value)}
                                                            >
                                                                {roleOptions.map(role => (
                                                                    <option key={role.value} value={role.value}>{role.label}</option>
                                                                ))}
                                                            </select>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <button
                                                                className={`text-sm font-semibold px-4 py-2 rounded-xl border transition-all ${getStatusColor(user.status)} hover:shadow-md`}
                                                                onClick={() => toggleStatus(user.id)}
                                                            >
                                                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors border border-blue-200"
                                                                    onClick={() => initiateEdit(user)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="text-red-600 hover:text-red-800 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors border border-red-200"
                                                                    onClick={() => initiateDelete(user)}
                                                                    disabled={user.role === "Admin"}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {filteredUsers.length === 0 && (
                                        <div className="text-center py-16">
                                            <div className="text-6xl mb-4">🔍</div>
                                            <div className="text-gray-400 text-lg mb-2">No users found</div>
                                            <div className="text-sm text-gray-500">Try adjusting your search or filters</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODALS */}
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full transform animate-scale-in">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete User</h3>
                        <p className="text-gray-600 text-center mb-6">
                            Are you sure you want to delete <span className="font-semibold">{userToDelete?.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex justify-center space-x-3">
                            <button
                                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium shadow-lg shadow-red-500/25"
                                onClick={confirmDelete}
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && editingUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full transform animate-scale-in">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Edit User</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                                    value={editingUser.name}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                />
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
                                onClick={() => setShowEditModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium shadow-lg shadow-blue-500/25"
                                onClick={saveEdit}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create User Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full transform animate-scale-in">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Create New User</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    placeholder="Enter email address"
                                />
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
                        <div className="flex justify-center space-x-3 mt-8">
                            <button
                                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                                onClick={() => setShowCreateModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium shadow-lg shadow-green-500/25"
                                onClick={createNewUser}
                                disabled={!newUser.name || !newUser.email}
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