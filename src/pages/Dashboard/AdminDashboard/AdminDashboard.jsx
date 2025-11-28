// src/pages/AdminDashboard/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/users", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setUsers(data.users || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
            toast.error("All fields are required!");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/users/admin-create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newUser),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("User created successfully!");
                setNewUser({ name: "", email: "", password: "", role: "user" });
                fetchUsers();
            } else {
                toast.error(data.message || "Failed to create user");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to create user");
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const res = await fetch(`http://localhost:5000/users/${userId}/role`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role: newRole }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Role updated successfully");
                fetchUsers();
            } else {
                toast.error(data.message || "Failed to update role");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update role");
        }
    };

    // ---------------- Delete user ----------------
    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const res = await fetch(`http://localhost:5000/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (data.success) {
                toast.success("User deleted successfully");
                fetchUsers();
            } else {
                toast.error(data.message || "Failed to delete user");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete user");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* Create User Form */}
            <div className="mb-6 bg-white p-6 rounded shadow-md w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">Create New User</h2>
                <form onSubmit={handleCreateUser} className="space-y-3">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="user">User</option>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Create User
                    </button>
                </form>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto bg-white rounded shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4">All Users</h2>
                {loading ? (
                    <p>Loading users...</p>
                ) : users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 border-b">#</th>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Role</th>
                                <th className="py-2 px-4 border-b">Change Role</th>
                                <th className="py-2 px-4 border-b">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">{user.role}</td>
                                    <td className="py-2 px-4 border-b">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className="px-2 py-1 border rounded"
                                        >
                                            <option value="user">User</option>
                                            <option value="buyer">Buyer</option>
                                            <option value="seller">Seller</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
