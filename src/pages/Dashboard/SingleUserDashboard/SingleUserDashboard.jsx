import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../../context/AppContext/AppContext";

const SingleUserDashboard = () => {
    const { user } = useContext(AppContext);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        axios.get(`http://localhost:5000/dashboard/stats/${user.email}`)
            .then(res => {
                setStats(res.data.stats || {});
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setStats({});
                setLoading(false);
            });
    }, [user]);

    if (loading) return <p>Loading...</p>;
    if (!stats) return <p>No stats found</p>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || "User"}</h1>

            {user?.role === "admin" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-100 rounded shadow">Total Users: {stats.totalUsers || 0}</div>
                    <div className="p-4 bg-blue-100 rounded shadow">Total Sellers: {stats.totalSellers || 0}</div>
                    <div className="p-4 bg-blue-100 rounded shadow">Total Buyers: {stats.totalBuyers || 0}</div>
                </div>
            )}

            {user?.role === "seller" && (
                <div>
                    <h2 className="text-2xl font-semibold mt-4">My Products</h2>
                    <ul>
                        {(stats.myProducts || []).map(p => (
                            <li key={p._id}>{p.name} - ${p.price}</li>
                        ))}
                    </ul>
                    <p>Total Sales: {stats.totalSales || 0}</p>
                </div>
            )}

            {user?.role === "buyer" && (
                <div>
                    <h2 className="text-2xl font-semibold mt-4">My Orders</h2>
                    <ul>
                        {(stats.myOrders || []).map(o => (
                            <li key={o._id}>{o.productId} - {o.status}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SingleUserDashboard;
