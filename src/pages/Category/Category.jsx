// CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

// Comprehensive sample products for all categories
const sampleProducts = [
    // Electronics
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        name: "MacBook Pro 2023",
        location: "Dhaka, Bangladesh",
        resalePrice: 1250,
        originalPrice: 2000,
        yearsOfUse: 1,
        postedAt: "2024-01-15",
        seller: { name: "TechGuru", verified: true, rating: 4.8 },
        category: "electronics",
        condition: "Excellent",
        description: "Like new condition with original box and accessories. Rarely used for light work.",
        features: ["16GB RAM", "512GB SSD", "M2 Chip", "Original Box"],
        likes: 24,
        views: 156
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        name: "iPhone 15 Pro",
        location: "Chittagong, Bangladesh",
        resalePrice: 850,
        originalPrice: 1200,
        yearsOfUse: 0.5,
        postedAt: "2024-01-12",
        seller: { name: "MobileExpert", verified: true, rating: 4.9 },
        category: "electronics",
        condition: "Like New",
        description: "Perfect condition with 98% battery health. All accessories included.",
        features: ["256GB", "Titanium", "5G", "Face ID"],
        likes: 42,
        views: 289
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        name: "Sony WH-1000XM4",
        location: "Sylhet, Bangladesh",
        resalePrice: 180,
        originalPrice: 350,
        yearsOfUse: 1,
        postedAt: "2024-01-10",
        seller: { name: "AudioMaster", verified: false, rating: 4.5 },
        category: "electronics",
        condition: "Good",
        description: "Great noise cancellation headphones with minimal wear.",
        features: ["Noise Cancelling", "30hr Battery", "Touch Control"],
        likes: 18,
        views: 134
    },
    // Fashion
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        name: "Nike Air Jordan 1",
        location: "Khulna, Bangladesh",
        resalePrice: 120,
        originalPrice: 180,
        yearsOfUse: 0.3,
        postedAt: "2024-01-08",
        seller: { name: "SneakerHead", verified: true, rating: 4.8 },
        category: "fashion",
        condition: "Like New",
        description: "Limited edition sneakers, worn only twice. Original box included.",
        features: ["Size 9", "Limited Edition", "Original Box"],
        likes: 56,
        views: 324
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        name: "Ray-Ban Aviator",
        location: "Rajshahi, Bangladesh",
        resalePrice: 80,
        originalPrice: 150,
        yearsOfUse: 1,
        postedAt: "2024-01-05",
        seller: { name: "StyleIcon", verified: false, rating: 4.3 },
        category: "fashion",
        condition: "Good",
        description: "Classic aviator sunglasses with minor scratches on case.",
        features: ["Polarized", "UV Protection", "Original Case"],
        likes: 23,
        views: 167
    },
    // Furniture
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        name: "Leather Sofa Set",
        location: "Dhaka, Bangladesh",
        resalePrice: 450,
        originalPrice: 800,
        yearsOfUse: 2,
        postedAt: "2024-01-03",
        seller: { name: "HomeDecor", verified: true, rating: 4.6 },
        category: "furniture",
        condition: "Excellent",
        description: "Premium leather sofa set in perfect condition. 3-seater + 2 armchairs.",
        features: ["Genuine Leather", "3+2 Set", "Comfortable"],
        likes: 34,
        views: 198
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        name: "Wooden Dining Table",
        location: "Chittagong, Bangladesh",
        resalePrice: 200,
        originalPrice: 400,
        yearsOfUse: 1,
        postedAt: "2024-01-01",
        seller: { name: "FurnitureWorld", verified: true, rating: 4.7 },
        category: "furniture",
        condition: "Like New",
        description: "Solid wood dining table with 6 chairs. Minimal use.",
        features: ["Solid Wood", "6 Chairs", "Expandable"],
        likes: 28,
        views: 145
    },
    // Books
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        name: "Programming Books Collection",
        location: "Dhaka, Bangladesh",
        resalePrice: 50,
        originalPrice: 120,
        yearsOfUse: 1,
        postedAt: "2023-12-28",
        seller: { name: "BookWorm", verified: true, rating: 4.9 },
        category: "books",
        condition: "Excellent",
        description: "Collection of programming books including JavaScript, Python, and React.",
        features: ["5 Books", "Like New", "Latest Editions"],
        likes: 45,
        views: 223
    },
    // Vehicles
    {
        id: 9,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        name: "Honda Civic 2020",
        location: "Dhaka, Bangladesh",
        resalePrice: 18500,
        originalPrice: 25000,
        yearsOfUse: 3,
        postedAt: "2023-12-25",
        seller: { name: "AutoExpert", verified: true, rating: 4.8 },
        category: "vehicles",
        condition: "Excellent",
        description: "Well maintained Honda Civic with low mileage and full service history.",
        features: ["Low Mileage", "Full Service", "Excellent Condition"],
        likes: 67,
        views: 456
    }
];

const Category = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (id) {
            // Filter products by category
            const filteredProducts = sampleProducts.filter(
                product => product.category === id
            );
            setProducts(filteredProducts);
        } else {
            // Show all products if no category specified
            setProducts(sampleProducts);
        }
    }, [id]);

    // Filter and sort products
    const filteredAndSortedProducts = products
        .filter(product => {
            if (filter === "verified" && !product.seller.verified) return false;
            if (filter === "excellent" && product.condition !== "Excellent") return false;
            if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.resalePrice - b.resalePrice;
                case "price-high":
                    return b.resalePrice - a.resalePrice;
                case "popular":
                    return b.likes - a.likes;
                default:
                    return new Date(b.postedAt) - new Date(a.postedAt);
            }
        });

    const openModal = (product) => setSelectedProduct(product);
    const closeModal = () => setSelectedProduct(null);

    const getConditionColor = (condition) => {
        const colors = {
            "Excellent": "bg-gradient-to-r from-green-500 to-emerald-500",
            "Like New": "bg-gradient-to-r from-blue-500 to-cyan-500",
            "Good": "bg-gradient-to-r from-yellow-500 to-orange-500",
            "Fair": "bg-gradient-to-r from-orange-500 to-red-500"
        };
        return colors[condition] || "bg-gray-500";
    };

    const getCategoryGradient = () => {
        const gradients = {
            "electronics": "from-purple-500 to-pink-500",
            "fashion": "from-blue-500 to-teal-500",
            "furniture": "from-orange-500 to-red-500",
            "books": "from-green-500 to-emerald-500",
            "vehicles": "from-indigo-500 to-purple-500"
        };
        return gradients[id] || "from-blue-500 to-purple-500";
    };

    const getCategoryTitle = () => {
        if (!id) return "All Products";
        const titles = {
            "electronics": "Electronics",
            "fashion": "Fashion & Accessories",
            "furniture": "Furniture & Home",
            "books": "Books & Education",
            "vehicles": "Vehicles & Transport"
        };
        return titles[id] || `${id} Products`;
    };

    const getCategoryDescription = () => {
        if (!id) return "Discover amazing pre-loved items at unbeatable prices";
        const descriptions = {
            "electronics": "Find the latest gadgets and electronics at great prices",
            "fashion": "Discover trendy fashion items and accessories",
            "furniture": "Quality furniture for your home and office",
            "books": "Educational books and learning materials",
            "vehicles": "Reliable vehicles and transportation options"
        };
        return descriptions[id] || `Discover amazing pre-loved ${id} items at unbeatable prices`;
    };

    return (
        <div className="min-h-screen text-black bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header Section */}
            <div className={`bg-gradient-to-r ${getCategoryGradient()} text-white py-12 px-6`}>
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-black mb-4 drop-shadow-lg">
                        {getCategoryTitle()}
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        {getCategoryDescription()}
                    </p>
                    <div className="flex justify-center space-x-4 mt-6">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                            <span className="font-semibold">{filteredAndSortedProducts.length} Products Available</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                            <span className="font-semibold">Quality Guaranteed</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters Section */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search products by name, brand, or features..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 pl-12 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-lg"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Filters and Sorting */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                filter === "all" 
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" 
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            All Products
                        </button>
                        <button
                            onClick={() => setFilter("verified")}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                filter === "verified" 
                                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg" 
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            Verified Sellers
                        </button>
                        <button
                            onClick={() => setFilter("excellent")}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                filter === "excellent" 
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg" 
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            Excellent Condition
                        </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600 font-semibold">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white border-2 border-gray-200 rounded-xl px-4 py-3 font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="popular">Most Popular</option>
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600 text-lg">
                        Showing <span className="font-bold text-blue-600">{filteredAndSortedProducts.length}</span> products
                        {searchTerm && (
                            <span> for "<span className="font-bold text-purple-600">{searchTerm}</span>"</span>
                        )}
                        {filter !== "all" && (
                            <span> with <span className="font-bold text-green-600">{filter}</span> filter</span>
                        )}
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredAndSortedProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer transform hover:-translate-y-2"
                        >
                            {/* Product Image with Overlay */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className={`${getConditionColor(product.condition)} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
                                        {product.condition}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <span className="bg-black/60 text-white px-2 py-1 rounded-full text-sm backdrop-blur-sm">
                                        ❤️ {product.likes}
                                    </span>
                                    <span className="bg-black/60 text-white px-2 py-1 rounded-full text-sm backdrop-blur-sm">
                                        👁️ {product.views}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h2 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {product.name}
                                    </h2>
                                    <div className="flex items-center">
                                        {product.seller.verified && (
                                            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-bold ml-2">
                                                ✓ Verified
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-4 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    {product.location}
                                </p>

                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-2xl font-black text-green-600">
                                            ${product.resalePrice}
                                        </p>
                                        <p className="text-gray-400 line-through text-sm">
                                            ${product.originalPrice}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">You Save</p>
                                        <p className="text-lg font-bold text-red-500">
                                            ${product.originalPrice - product.resalePrice}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>Used: {product.yearsOfUse} year(s)</span>
                                    <span>{formatDistanceToNow(new Date(product.postedAt), { addSuffix: true })}</span>
                                </div>

                                {/* Seller Info */}
                                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {product.seller.name.charAt(0)}
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-semibold text-gray-900 text-sm">
                                                {product.seller.name}
                                            </p>
                                            <div className="flex items-center">
                                                <div className="flex text-yellow-400 text-xs">
                                                    {"★".repeat(Math.floor(product.seller.rating))}
                                                    {"☆".repeat(5 - Math.floor(product.seller.rating))}
                                                </div>
                                                <span className="text-gray-500 text-xs ml-1">
                                                    {product.seller.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => openModal(product)}
                                    className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredAndSortedProducts.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-32 h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">📦</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Products Found</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">
                            {searchTerm 
                                ? `No products found matching "${searchTerm}". Try different search terms or clear filters.`
                                : filter !== "all"
                                ? `No products found with ${filter} filter. Try different filters.`
                                : "There are currently no products available in this category. Check back later!"
                            }
                        </p>
                        {(searchTerm || filter !== "all") && (
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setFilter("all");
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                            >
                                Clear All Filters
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Enhanced Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
                        <button
                            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors z-10"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Product Images */}
                            <div className="relative">
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    className="w-full h-96 object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className={`${getConditionColor(selectedProduct.condition)} text-white px-4 py-2 rounded-full font-bold shadow-lg`}>
                                        {selectedProduct.condition}
                                    </span>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-8">
                                <h2 className="text-3xl font-black text-gray-900 mb-4">
                                    {selectedProduct.name}
                                </h2>
                                
                                <div className="flex items-center mb-6">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                                            {selectedProduct.seller.name.charAt(0)}
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-semibold text-gray-900">
                                                {selectedProduct.seller.name}
                                            </p>
                                            <div className="flex items-center">
                                                <div className="flex text-yellow-400">
                                                    {"★".repeat(Math.floor(selectedProduct.seller.rating))}
                                                    {"☆".repeat(5 - Math.floor(selectedProduct.seller.rating))}
                                                </div>
                                                <span className="text-gray-500 text-sm ml-2">
                                                    {selectedProduct.seller.rating}
                                                </span>
                                                {selectedProduct.seller.verified && (
                                                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-bold ml-2">
                                                        ✓ Verified Seller
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-600">Resale Price</p>
                                        <p className="text-2xl font-black text-green-600">${selectedProduct.resalePrice}</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-600">You Save</p>
                                        <p className="text-2xl font-black text-red-500">
                                            ${selectedProduct.originalPrice - selectedProduct.resalePrice}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Original Price:</span>
                                        <span className="text-gray-400 line-through">${selectedProduct.originalPrice}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Location:</span>
                                        <span className="font-semibold">{selectedProduct.location}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Years of Use:</span>
                                        <span className="font-semibold">{selectedProduct.yearsOfUse} year(s)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Posted:</span>
                                        <span className="font-semibold">
                                            {formatDistanceToNow(new Date(selectedProduct.postedAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-bold text-gray-900 mb-3">Product Description</h4>
                                    <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                                    
                                    <h4 className="font-bold text-gray-900 mb-3">Product Features</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProduct.features.map((feature, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                                        onClick={() => {
                                            alert(`Booked ${selectedProduct.name}!`);
                                            closeModal();
                                        }}
                                    >
                                        Book Now
                                    </button>
                                    <button className="px-6 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:from-gray-200 hover:to-gray-300 transition-all duration-300">
                                        ❤️ Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;