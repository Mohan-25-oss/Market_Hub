import React, { createContext, useContext, useState, useMemo } from 'react';

const initialUsers = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", role: "Manager", status: "suspended", createdAt: "2025-01-01", lastActive: "2025-06-01", avatar: "SJ" },
    { id: 2, name: "Mike Chen", email: "mike.chen@example.com", role: "Viewer", status: "active", createdAt: "2025-02-15", lastActive: "2025-07-20", avatar: "MC" },
    { id: 3, name: "Emma Davis", email: "emma.d@example.com", role: "Editor", status: "pending", createdAt: "2025-03-10", lastActive: "2025-07-18", avatar: "ED" },
    { id: 4, name: "Alex Rodriguez", email: "alex.r@example.com", role: "Editor", status: "active", createdAt: "2025-04-05", lastActive: "2025-07-22", avatar: "AR" },
    { id: 5, name: "Priya Patel", email: "priya.p@example.com", role: "Manager", status: "pending", createdAt: "2025-05-20", lastActive: "2025-07-15", avatar: "PP" },
    { id: 6, name: "James Wilson", email: "james.w@example.com", role: "Admin", status: "active", createdAt: "2025-01-15", lastActive: "2025-07-23", avatar: "JW" },
];

// Role options with colors
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

const AllUsersContext = createContext();

export function UserProvider({ children }) {
    const [users, setUsers] = useState(initialUsers);
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

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = roleFilter === "All" || user.role === roleFilter;
            const matchesStatus = statusFilter === "All" || user.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, searchTerm, roleFilter, statusFilter]);

    const stats = useMemo(() => ({
        total: users.length,
        active: users.filter(u => u.status === "active").length,
        pending: users.filter(u => u.status === "pending").length,
        suspended: users.filter(u => u.status === "suspended").length,
        admins: users.filter(u => u.role === "Admin").length,
    }), [users]);

    // Show notification
    const showNotification = (message, type = "success") => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
    };

    // Status toggle
    const toggleStatus = (userId) => {
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
        setUsers(prev => prev.map(u =>
            u.id === userId ? { ...u, role: newRole } : u
        ));
        showNotification("User role updated successfully");
    };

    // Delete user
    const initiateDelete = (user) => {
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

    const value = {
        users,
        setUsers,
        filteredUsers,
        stats,
        searchTerm,
        setSearchTerm,
        roleFilter,
        setRoleFilter,
        statusFilter,
        setStatusFilter,
        showDeleteModal,
        setShowDeleteModal,
        userToDelete,
        setUserToDelete,
        showEditModal,
        setShowEditModal,
        editingUser,
        setEditingUser,
        showCreateModal,
        setShowCreateModal,
        newUser,
        setNewUser,
        notification,
        showNotification,
        toggleStatus,
        updateRole,
        initiateDelete,
        confirmDelete,
        initiateEdit,
        saveEdit,
        createNewUser,
        getStatusColor,
        getRoleColor,
        roleOptions,
        statusOptions
    };

    return (
        <AUserContext.Provider value={value}>
            {children}
        </AUserContext.Provider>
    );
}

export const useUsers = () => {
    const context = useContext(AllUsersContext);
    if (!context) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
};