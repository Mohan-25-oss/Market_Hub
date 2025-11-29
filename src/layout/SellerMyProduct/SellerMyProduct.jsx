// src/pages/SellerDashboard/SellerDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalProducts: 0,
        activeProducts: 0,
        soldProducts: 0
    });

    // Fetch seller's products
    const fetchMyProducts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Please login to view your products");
                return;
            }

            const res = await fetch("http://localhost:5000/seller/my-products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (data.success) {
                setProducts(data.products || []);
                calculateStats(data.products || []);
            } else {
                toast.error(data.message || "Failed to fetch your products");
            }
        } catch (error) {
            console.error("Fetch products error:", error);
            toast.error("Failed to load your products");
        } finally {
            setLoading(false);
        }
    };

    // Calculate statistics
    const calculateStats = (products) => {
        const total = products.length;
        const active = products.filter(p => p.status === "available").length;
        const sold = products.filter(p => p.status === "sold").length;

        setStats({
            totalProducts: total,
            activeProducts: active,
            soldProducts: sold
        });
    };

    // Delete product
    const handleDeleteProduct = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5000/seller/products/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Product deleted successfully");
                // Remove product from state
                setProducts(prev => prev.filter(p => p._id !== productId));
                fetchMyProducts(); // Refresh stats
            } else {
                toast.error(data.message || "Failed to delete product");
            }
        } catch (error) {
            console.error("Delete product error:", error);
            toast.error("Failed to delete product");
        }
    };

    // Update product status
    const handleStatusUpdate = async (productId, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5000/seller/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(`Product marked as ${newStatus}`);
                // Update product in state
                setProducts(prev =>
                    prev.map(p =>
                        p._id === productId ? { ...p, status: newStatus } : p
                    )
                );
                fetchMyProducts(); // Refresh stats
            } else {
                toast.error(data.message || "Failed to update product");
            }
        } catch (error) {
            console.error("Update status error:", error);
            toast.error("Failed to update product status");
        }
    };

    useEffect(() => {
        fetchMyProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
                        <p className="text-gray-600 mt-2">Manage your products and sales</p>
                    </div>
                    <Link
                        to="/sellerDashboard/addProduct"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Add New Product
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.activeProducts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Sold Items</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.soldProducts}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products List */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">My Products</h2>
                        <p className="text-gray-600 text-sm mt-1">
                            Manage your product listings and track their status
                        </p>
                    </div>

                    <div className="p-6">
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <span className="ml-3 text-gray-600">Loading your products...</span>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                                <p className="mt-2 text-gray-500">Get started by adding your first product to start selling.</p>
                                <div className="mt-6">
                                    <Link
                                        to="/seller/add-product"
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add Your First Product
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div key={product._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
                                        {/* Product Image */}
                                        <div className="relative">
                                            {product.images && product.images.length > 0 ? (
                                                <img
                                                    src={`http://localhost:5000${product.images[0]}`}
                                                    alt={product.name}
                                                    className="w-full h-48 object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.status === 'available'
                                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                                                    }`}>
                                                    {product.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                                                {product.name}
                                            </h3>

                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {product.description || "No description provided"}
                                            </p>

                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-xl font-bold text-blue-600">
                                                    ₹{product.price?.toLocaleString()}
                                                </span>
                                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                    {product.category}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex space-x-2 mb-3">
                                                <button
                                                    onClick={() => handleStatusUpdate(
                                                        product._id,
                                                        product.status === 'available' ? 'sold' : 'available'
                                                    )}
                                                    className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${product.status === 'available'
                                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                                        }`}
                                                >
                                                    {product.status === 'available' ? 'Mark Sold' : 'Mark Available'}
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="py-2 px-3 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            {/* Product Info */}
                                            <div className="border-t border-gray-200 pt-3">
                                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                                    <div className="flex items-center">
                                                        <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {product.condition}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {product.location}
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-2">
                                                    Added: {new Date(product.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;