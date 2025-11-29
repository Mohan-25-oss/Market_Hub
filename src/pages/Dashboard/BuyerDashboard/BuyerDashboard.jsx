import React, { useEffect, useState } from "react";
import axios from "axios";

const BuyerDashboard = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem("token"); // JWT

    const ORDERS_PER_PAGE = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch profile
                const profileRes = await axios.get("/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(profileRes.data.user || {});

                // Fetch buyer's orders with pagination
                const ordersRes = await axios.get("/orders/my-orders", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const allOrders = Array.isArray(ordersRes.data.orders)
                    ? ordersRes.data.orders
                    : [];

                setOrders(allOrders);
                setTotalPages(Math.ceil(allOrders.length / ORDERS_PER_PAGE));
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                setError("Dashboard data আনতে সমস্যা হয়েছে");
                setOrders([]);
                setUser({});
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchData();
        else setLoading(false);
    }, [token]);

    // Filter orders by search and status
    const filteredOrders = orders
        .filter(
            (order) =>
                order.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.sellerName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(
            (order) => statusFilter === "all" || order.status === statusFilter
        );

    // Pagination
    const startIndex = (page - 1) * ORDERS_PER_PAGE;
    const paginatedOrders = filteredOrders.slice(
        startIndex,
        startIndex + ORDERS_PER_PAGE
    );

    if (loading) return <div className="p-6">Loading dashboard...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Buyer Dashboard</h1>

            {user && (
                <div className="mb-6 p-4 bg-gray-100 rounded">
                    <h2 className="text-xl font-semibold">Profile Info</h2>
                    <p><strong>Name:</strong> {user.name || "N/A"}</p>
                    <p><strong>Email:</strong> {user.email || "N/A"}</p>
                    <p><strong>Role:</strong> {user.role || "N/A"}</p>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded flex-1"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            <h2 className="text-2xl font-semibold mb-2">My Orders</h2>

            {paginatedOrders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paginatedOrders.map((order) => (
                        <div
                            key={order._id}
                            className="p-4 border rounded shadow-sm bg-white"
                        >
                            <h3 className="text-lg font-bold">
                                {order.productName || "Unnamed Product"}
                            </h3>
                            <p><strong>Seller:</strong> {order.sellerName || "Unknown"}</p>
                            <p><strong>Price:</strong> ${order.price || 0}</p>
                            <p><strong>Status:</strong> {order.status || "Pending"}</p>
                            <p>
                                <strong>Ordered At:</strong>{" "}
                                {order.createdAt
                                    ? new Date(order.createdAt).toLocaleString()
                                    : "N/A"}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center items-center gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BuyerDashboard;
