import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext/AppContext";

const Dashboard = () => {
    const { user } = useContext(AppContext);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchStats = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/dashboard/stats/${user.email}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setStats(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user]);

    if (loading) return <p className="p-4 text-center">Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard ({stats.role})</h1>

            {/* Admin Cards */}
            {stats.role === "admin" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="font-semibold">Total Users</h2>
                        <p className="text-2xl">{stats.stats.totalUsers}</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="font-semibold">Total Sellers</h2>
                        <p className="text-2xl">{stats.stats.totalSellers}</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="font-semibold">Total Buyers</h2>
                        <p className="text-2xl">{stats.stats.totalBuyers}</p>
                    </div>
                </div>
            )}

            {/* Seller Cards */}
            {stats.role === "seller" && (
                <div className="space-y-6">
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="font-semibold mb-2">My Products</h2>
                        {stats.stats.myProducts.length === 0 ? (
                            <p>No products yet</p>
                        ) : (
                            <ul>
                                {stats.stats.myProducts.map(p => (
                                    <li key={p._id}>{p.name} - ${p.price}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="font-semibold">Total Sales</h2>
                        <p className="text-2xl">{stats.stats.totalSales}</p>
                    </div>
                </div>
            )}

            {/* Buyer Cards */}
            {stats.role === "buyer" && (
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="font-semibold mb-2">My Orders</h2>
                    {stats.stats.myOrders.length === 0 ? (
                        <p>No orders yet</p>
                    ) : (
                        <ul>
                            {stats.stats.myOrders.map(o => (
                                <li key={o._id}>Order ID: {o._id} - Product ID: {o.productId}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
