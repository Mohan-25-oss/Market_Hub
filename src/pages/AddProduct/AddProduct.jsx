// src/pages/AddProduct/AddProduct.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        condition: "",
        mobile: "",
        location: "",
        category: "",
        purchaseYear: "",
        description: "",
        extraInfo: ""
    });

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Available categories
    const categories = [
        "Electronics",
        "Furniture",
        "Clothing",
        "Books",
        "Sports",
        "Vehicles",
        "Real Estate",
        "Jobs",
        "Services",
        "Other"
    ];

    // Available conditions
    const conditions = [
        "Brand New",
        "Like New",
        "Excellent",
        "Good",
        "Fair",
        "For Parts"
    ];

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = "Product name is required";
        if (!form.price || form.price <= 0) newErrors.price = "Valid price is required";
        if (!form.condition) newErrors.condition = "Condition is required";
        if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required";
        if (!form.location.trim()) newErrors.location = "Location is required";
        if (!form.category) newErrors.category = "Category is required";
        if (images.length === 0) newErrors.images = "At least one image is required";
        if (images.length > 6) newErrors.images = "Maximum 6 images allowed";

        // Mobile number validation
        const mobileRegex = /^[0-9+\-\s()]{10,}$/;
        if (form.mobile && !mobileRegex.test(form.mobile)) {
            newErrors.mobile = "Please enter a valid mobile number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // Validate file types and sizes
        const validFiles = files.filter(file => {
            const isValidType = file.type.startsWith('image/');
            const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB

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

        setImages(prev => [...prev, ...validFiles].slice(0, 6)); // Limit to 6 images
        setErrors(prev => ({ ...prev, images: "" }));
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors before submitting");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to add products");
            navigate("/login");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            // Append form data
            Object.keys(form).forEach(key => {
                if (form[key]) {
                    formData.append(key, form[key]);
                }
            });

            // Append images
            images.forEach(img => formData.append("images", img));

            const res = await fetch("http://localhost:5000/seller/add-product", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Product Added Successfully!");

                // Reset form
                setForm({
                    name: "",
                    price: "",
                    condition: "",
                    mobile: "",
                    location: "",
                    category: "",
                    purchaseYear: "",
                    description: "",
                    extraInfo: ""
                });
                setImages([]);
                setErrors({});

                // Redirect to seller dashboard after 2 seconds
                setTimeout(() => {
                    navigate("/dashboard/sellerDashboard");
                }, 2000);
            } else {
                toast.error(data.message || "Failed to add product");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-black bg-gray-50 py-8">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                        <p className="text-gray-600 mt-2">List your item for sale</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                placeholder="Enter product name"
                                value={form.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Price and Condition */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={form.price}
                                    onChange={(e) => handleInputChange("price", e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? "border-red-500" : "border-gray-300"
                                        }`}
                                    min="0"
                                    step="0.01"
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Condition *
                                </label>
                                <select
                                    value={form.condition}
                                    onChange={(e) => handleInputChange("condition", e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.condition ? "border-red-500" : "border-gray-300"
                                        }`}
                                >
                                    <option value="">Select condition</option>
                                    {conditions.map(condition => (
                                        <option key={condition} value={condition}>
                                            {condition}
                                        </option>
                                    ))}
                                </select>
                                {errors.condition && <p className="text-red-500 text-sm mt-1">{errors.condition}</p>}
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Number *
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Enter mobile number"
                                    value={form.mobile}
                                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.mobile ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your location"
                                    value={form.location}
                                    onChange={(e) => handleInputChange("location", e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.location ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                            </div>
                        </div>

                        {/* Category and Purchase Year */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    value={form.category}
                                    onChange={(e) => handleInputChange("category", e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? "border-red-500" : "border-gray-300"
                                        }`}
                                >
                                    <option value="">Select category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Purchase Year
                                </label>
                                <input
                                    type="number"
                                    placeholder="e.g., 2023"
                                    value={form.purchaseYear}
                                    onChange={(e) => handleInputChange("purchaseYear", e.target.value)}
                                    min="1900"
                                    max={new Date().getFullYear()}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Describe your product in detail..."
                                value={form.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Extra Information */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Extra Information
                            </label>
                            <textarea
                                rows="3"
                                placeholder="Any additional details, features, or specifications..."
                                value={form.extraInfo}
                                onChange={(e) => handleInputChange("extraInfo", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Images *
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer bg-blue-50 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
                                >
                                    Choose Images
                                </label>
                                <p className="text-sm text-gray-500 mt-2">
                                    Upload up to 6 images (max 5MB each)
                                </p>
                                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                            </div>

                            {/* Image Preview */}
                            {images.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-700 mb-2">
                                        Selected images ({images.length}/6):
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-4 rounded-md text-white font-medium ${loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    } transition-colors`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding Product...
                                    </span>
                                ) : (
                                    "Add Product"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}