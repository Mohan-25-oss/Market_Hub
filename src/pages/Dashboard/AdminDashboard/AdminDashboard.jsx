import React, { useState } from "react";
import { CheckCircle, Trash2, UserCheck } from "lucide-react";

const AdminDashboard = () => {
    const [sellers, setSellers] = useState([
        { id: 1, name: "Rahim Uddin", email: "rahim@seller.com", verified: false },
        { id: 2, name: "Karim Ali", email: "karim@seller.com", verified: true },
    ]);

    const [buyers, setBuyers] = useState([
        { id: 1, name: "Sumaiya Akter", email: "sumaiya@buyer.com" },
        { id: 2, name: "Rafiq Hasan", email: "rafiq@buyer.com" },
    ]);

    const verifySeller = (id) => {
        setSellers((prev) =>
            prev.map((s) => (s.id === id ? { ...s, verified: true } : s))
        );
    };

    const deleteSeller = (id) => {
        setSellers((prev) => prev.filter((s) => s.id !== id));
    };

    const deleteBuyer = (id) => {
        setBuyers((prev) => prev.filter((b) => b.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                🛠️ Admin Dashboard
            </h1>

            {/* Sellers Section */}
            <div className="bg-white text-black shadow rounded-2xl p-6 mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Sellers</h2>
                <table className="min-w-full border rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Email</th>
                            <th className="py-2 px-4 text-left">Status</th>
                            <th className="py-2 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller) => (
                            <tr key={seller.id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-4">{seller.name}</td>
                                <td className="py-2 px-4">{seller.email}</td>
                                <td className="py-2 px-4">
                                    {seller.verified ? (
                                        <span className="text-green-600 font-semibold flex items-center gap-1">
                                            <CheckCircle size={16} /> Verified
                                        </span>
                                    ) : (
                                        <span className="text-yellow-600">Unverified</span>
                                    )}
                                </td>
                                <td className="py-2 px-4 flex justify-center gap-3">
                                    {!seller.verified && (
                                        <button
                                            onClick={() => verifySeller(seller.id)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                                        >
                                            <UserCheck size={16} /> Verify
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteSeller(seller.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Buyers Section */}
            <div className="bg-white text-black shadow rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Buyers</h2>
                <table className="min-w-full border rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">Name</th>
                            <th className="py-2 px-4 text-left">Email</th>
                            <th className="py-2 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyers.map((buyer) => (
                            <tr key={buyer.id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-4">{buyer.name}</td>
                                <td className="py-2 px-4">{buyer.email}</td>
                                <td className="py-2 px-4 text-center">
                                    <button
                                        onClick={() => deleteBuyer(buyer.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 mx-auto"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
