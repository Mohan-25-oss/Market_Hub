import React, { useState, useEffect } from 'react';

const SellerDashboard = () => {
    const [verified, setVerified] = useState(true);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState('add-product'); // 'add-product' or 'my-products'
    const [form, setForm] = useState({
        name: "",
        price: "",
        condition: "excellent",
        mobile: "",
        location: "",
        category: "",
        description: "",
        purchaseYear: "",
        extraInfo: "",
        images: []
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [imagePreviews, setImagePreviews] = useState([]);

    // Load products from localStorage when component mounts
    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem("sellerProducts")) || [];
        setProducts(savedProducts);
    }, []);

    // Save products to localStorage whenever products change
    useEffect(() => {
        localStorage.setItem("sellerProducts", JSON.stringify(products));
    }, [products]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Create preview URLs
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
        
        // Store files in form state
        setForm({ ...form, images: files });
    };

    const removeImage = (index) => {
        const newPreviews = [...imagePreviews];
        const newImages = [...form.images];
        
        newPreviews.splice(index, 1);
        newImages.splice(index, 1);
        
        setImagePreviews(newPreviews);
        setForm({ ...form, images: newImages });
    };

    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!verified) {
            showToastMessage("Only verified sellers can add products!");
            return;
        }

        const newProduct = {
            ...form,
            id: Date.now(),
            status: "available",
            // Convert images to base64 for storage (in real app, you'd upload to server)
            imagePreviews: imagePreviews
        };

        setProducts([...products, newProduct]);
        showToastMessage("Product added successfully!");
        
        // Reset form and redirect to My Products
        setForm({
            name: "",
            price: "",
            condition: "excellent",
            mobile: "",
            location: "",
            category: "",
            description: "",
            purchaseYear: "",
            extraInfo: "",
            images: []
        });
        setImagePreviews([]);
        
        // Redirect to My Products after 1 second
        setTimeout(() => {
            setCurrentPage('my-products');
        }, 1000);
    };

    const handleDelete = (id) => {
        setProducts(products.filter((p) => p.id !== id));
        showToastMessage("Product deleted successfully!");
    };

    const markAsSold = (id) => {
        setProducts(products.map(product => 
            product.id === id ? { ...product, status: 'sold' } : product
        ));
        showToastMessage("Product marked as sold!");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
                    <div className="flex items-center">
                        <i className="fas fa-check-circle mr-2"></i>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-black">Seller Dashboard</h1>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setCurrentPage('add-product')}
                                className={`px-4 py-2 rounded-lg font-medium ${
                                    currentPage === 'add-product' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-600 hover:text-black'
                                }`}
                            >
                                Add Product
                            </button>
                            <button
                                onClick={() => setCurrentPage('my-products')}
                                className={`px-4 py-2 rounded-lg font-medium ${
                                    currentPage === 'my-products' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-600 hover:text-black'
                                }`}
                            >
                                My Products
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                {/* Verification Status */}
                <div className="mb-6">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                        verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                        {verified ? (
                            <>
                                <i className="fas fa-check-circle mr-2"></i>
                                Verified Seller
                            </>
                        ) : (
                            <>
                                <i className="fas fa-clock mr-2"></i>
                                Verification Pending
                            </>
                        )}
                    </div>
                </div>

                {/* Add Product Section */}
                {currentPage === 'add-product' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-black mb-6">Add a Product</h2>
                            {verified ? (
                                <form onSubmit={handleAddProduct} className="space-y-6">
                                    {/* Image Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-3">Product Images</label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                id="image-upload"
                                            />
                                            <label htmlFor="image-upload" className="cursor-pointer">
                                                <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-3"></i>
                                                <p className="text-black font-medium">Click to upload images</p>
                                                <p className="text-gray-500 text-sm mt-1">Upload up to 5 images of your product</p>
                                            </label>
                                        </div>
                                        
                                        {/* Image Previews */}
                                        {imagePreviews.length > 0 && (
                                            <div className="mt-4">
                                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                                    {imagePreviews.map((preview, index) => (
                                                        <div key={index} className="relative">
                                                            <img 
                                                                src={preview} 
                                                                alt={`Preview ${index + 1}`}
                                                                className="w-full h-24 object-cover rounded-lg"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImage(index)}
                                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Product Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-2">নাম (Name)</label>
                                            <input
                                                name="name"
                                                placeholder="Product name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500"
                                            />
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-2">দাম (Price)</label>
                                            <input
                                                name="price"
                                                placeholder="Price in ৳"
                                                type="number"
                                                value={form.price}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500"
                                            />
                                        </div>

                                        {/* Condition */}
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-2">অবস্থা (Condition)</label>
                                            <select
                                                name="condition"
                                                value={form.condition}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                                            >
                                                <option value="excellent">Excellent (চমৎকার)</option>
                                                <option value="good">Good (ভাল)</option>
                                                <option value="fair">Fair (মোটামুটি)</option>
                                            </select>
                                        </div>

                                        {/* Mobile Number */}
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-2">মোবাইল (Mobile)</label>
                                            <input
                                                name="mobile"
                                                placeholder="Mobile number"
                                                value={form.mobile}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500"
                                            />
                                        </div>

                                        {/* Location */}
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-2">লোকেশন (Location)</label>
                                            <input
                                                name="location"
                                                placeholder="Your location"
                                                value={form.location}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500"
                                            />
                                        </div>

                                        {/* Category */}
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-2">বিভাগ (Category)</label>
                                            <select
                                                name="category"
                                                value={form.category}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                                            >
                                                <option value="">Select Category</option>
                                                <option value="electronics">Electronics (ইলেকট্রনিক্স)</option>
                                                <option value="furniture">Furniture (ফার্নিচার)</option>
                                                <option value="clothing">Clothing (পোশাক)</option>
                                                <option value="books">Books (বই)</option>
                                                <option value="vehicles">Vehicles (যানবাহন)</option>
                                                <option value="other">Other (অন্যান্য)</option>
                                            </select>
                                        </div>

                                        {/* Purchase Year */}
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-2">ক্রয়ের বছর (Purchase Year)</label>
                                            <input
                                                name="purchaseYear"
                                                placeholder="Year of purchase"
                                                type="number"
                                                min="2000"
                                                max="2024"
                                                value={form.purchaseYear}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500"
                                            />
                                        </div>

                                        {/* Extra Information */}
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-2">অন্যান্য তথ্য (Extra Information)</label>
                                            <input
                                                name="extraInfo"
                                                placeholder="Additional details"
                                                value={form.extraInfo}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-2">বিবরণ (Description)</label>
                                        <textarea
                                            name="description"
                                            placeholder="Product description"
                                            value={form.description}
                                            onChange={handleChange}
                                            rows="4"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="submit"
                                            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
                                        >
                                            <i className="fas fa-plus-circle mr-2"></i>
                                            Add Product
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
                                        <i className="fas fa-exclamation-triangle text-yellow-500 text-3xl mb-4"></i>
                                        <h3 className="text-lg font-semibold text-black mb-2">Verification Required</h3>
                                        <p className="text-black mb-4">
                                            You must be a verified seller to add products.
                                        </p>
                                        <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                                            Verify Account
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* My Products Section */}
                {currentPage === 'my-products' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-black">My Products</h2>
                                <div className="text-sm text-gray-600">
                                    {products.filter(p => p.status === 'available').length} available • 
                                    {products.filter(p => p.status === 'sold').length} sold
                                </div>
                            </div>

                            {products.length === 0 ? (
                                <div className="text-center py-12">
                                    <i className="fas fa-box-open text-gray-400 text-5xl mb-4"></i>
                                    <h3 className="text-xl font-medium text-black mb-2">No products yet</h3>
                                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                                        Start by adding your first product. Fill out the form to get started.
                                    </p>
                                    <button
                                        onClick={() => setCurrentPage('add-product')}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Add Your First Product
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200 bg-white"
                                        >
                                            {/* Product Images */}
                                            {product.imagePreviews && product.imagePreviews.length > 0 && (
                                                <div className="mb-4">
                                                    <img 
                                                        src={product.imagePreviews[0]} 
                                                        alt={product.name}
                                                        className="w-full h-48 object-cover rounded-lg"
                                                    />
                                                </div>
                                            )}
                                            
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-semibold text-lg text-black truncate">{product.name}</h3>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    product.status === 'available' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {product.status}
                                                </span>
                                            </div>
                                            
                                            <div className="space-y-2 mb-4">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">দাম:</span>
                                                    <span className="font-medium text-black">৳{product.price}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">অবস্থা:</span>
                                                    <span className="font-medium text-black capitalize">{product.condition}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">লোকেশন:</span>
                                                    <span className="font-medium text-black">{product.location}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">মোবাইল:</span>
                                                    <span className="font-medium text-black">{product.mobile}</span>
                                                </div>
                                                {product.purchaseYear && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">ক্রয়ের বছর:</span>
                                                        <span className="font-medium text-black">{product.purchaseYear}</span>
                                                    </div>
                                                )}
                                                {product.extraInfo && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">অন্যান্য তথ্য:</span>
                                                        <span className="font-medium text-black">{product.extraInfo}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {product.description && (
                                                <div className="mb-4">
                                                    <p className="text-sm text-black line-clamp-2">{product.description}</p>
                                                </div>
                                            )}

                                            <div className="flex space-x-2">
                                                {product.status === 'available' && (
                                                    <button
                                                        onClick={() => markAsSold(product.id)}
                                                        className="flex-1 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                                                    >
                                                        Mark as Sold
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="flex-1 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                                                >
                                                    <i className="fas fa-trash mr-1"></i>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerDashboard;