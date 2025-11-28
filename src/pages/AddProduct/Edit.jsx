// src/pages/EditProduct/EditProduct.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [form, setForm] = useState({
        name: "",
        price: "",
        condition: "",
        mobile: "",
        location: "",
        category: "",
        purchaseYear: "",
        description: "",
        extraInfo: "",
        status: "available"
    });
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [imagesToRemove, setImagesToRemove] = useState([]);
    const [errors, setErrors] = useState({});

    // Available categories and conditions
    const categories = ["Electronics", "Furniture", "Clothing", "Books", "Sports", "Vehicles", "Real Estate", "Jobs", "Services", "Other"];
    const conditions = ["Brand New", "Like New", "Excellent", "Good", "Fair", "For Parts"];

    // Fetch product data
    const fetchProduct = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Please login to edit product");
                navigate("/login");
                return;
            }

            console.log("Fetching product with ID:", id);

            const response = await fetch(`http://localhost:5000/seller/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Product data:", data);

            if (data.success && data.product) {
                const product = data.product;
                setForm({
                    name: product.name || "",
                    price: product.price || "",
                    condition: product.condition || "",
                    mobile: product.mobile || "",
                    location: product.location || "",
                    category: product.category || "",
                    purchaseYear: product.purchaseYear || "",
                    description: product.description || "",
                    extraInfo: product.extraInfo || "",
                    status: product.status || "available"
                });
                setExistingImages(product.images || []);
            } else {
                toast.error(data.message || "Failed to fetch product");
            }
        } catch (error) {
            console.error("Fetch product error:", error);
            toast.error("Failed to load product: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleInputChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => {
            const isValidType = file.type.startsWith('image/');
            const isValidSize = file.size <= 5 * 1024 * 1024;

            if (!isValidType) {
                toast.error(`${file.name} is not a valid image file`);
                return false;
            }
            if (!isValidSize) {
                toast.error(`${file.name} is too large (max 5MB)`);
                return false;
            }
            return true;
        });

        setImages(prev => [...prev, ...validFiles].slice(0, 6));
    };

    const removeNewImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (imagePath) => {
        setExistingImages(prev => prev.filter(img => img !== imagePath));
        setImagesToRemove(prev => [...prev, imagePath]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();

            // Append form data
            Object.keys(form).forEach(key => {
                if (form[key] !== undefined && form[key] !== null) {
                    formData.append(key, form[key]);
                }
            });

            // Append new images
            images.forEach(img => formData.append("images", img));

            // Append images to remove
            if (imagesToRemove.length > 0) {
                formData.append("removeImages", JSON.stringify(imagesToRemove));
            }

            // Replace all images if new images are uploaded
            if (images.length > 0) {
                formData.append("replaceImages", "false");
            }

            const response = await fetch(`http://localhost:5000/seller/products/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Product updated successfully!");
                navigate("/dashboard/sellerDashboard");
            } else {
                toast.error(data.message || "Failed to update product");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to update product");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-black bg-gray-50 py-8">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                        <Link
                            to="/dashboard/sellerDashboard"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price (₹) *
                            </label>
                            <input
                                type="number"
                                value={form.price}
                                onChange={(e) => handleInputChange("price", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                min="0"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                value={form.category}
                                onChange={(e) => handleInputChange("category", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Condition */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Condition *
                            </label>
                            <select
                                value={form.condition}
                                onChange={(e) => handleInputChange("condition", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select condition</option>
                                {conditions.map((condition) => (
                                    <option key={condition} value={condition}>
                                        {condition}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Location *
                            </label>
                            <input
                                type="text"
                                value={form.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mobile Number *
                            </label>
                            <input
                                type="tel"
                                value={form.mobile}
                                onChange={(e) => handleInputChange("mobile", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                pattern="[0-9]{10}"
                                placeholder="10-digit mobile number"
                            />
                        </div>

                        {/* Purchase Year */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Purchase Year
                            </label>
                            <input
                                type="number"
                                value={form.purchaseYear}
                                onChange={(e) => handleInputChange("purchaseYear", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1900"
                                max={new Date().getFullYear()}
                                placeholder="e.g., 2023"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                value={form.status}
                                onChange={(e) => handleInputChange("status", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="available">Available</option>
                                <option value="sold">Sold</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                value={form.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                placeholder="Describe your product in detail..."
                            />
                        </div>

                        {/* Extra Information */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Extra Information
                            </label>
                            <textarea
                                value={form.extraInfo}
                                onChange={(e) => handleInputChange("extraInfo", e.target.value)}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Any additional details about the product..."
                            />
                        </div>

                        {/* Existing Images */}
                        {existingImages.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Images
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {existingImages.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={`http://localhost:5000${image}`}
                                                alt={`Product ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(image)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* New Images Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Add New Images (Max 6 images total)
                            </label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                You can upload up to {6 - existingImages.length - images.length} more images
                            </p>
                            {images.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`New ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeNewImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={updating}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
                        >
                            {updating ? "Updating Product..." : "Update Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Edit;