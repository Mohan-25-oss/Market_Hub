import React, { useState } from "react";

const BlogPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const faqs = [
        { 
            question: "What is FlowerChat?", 
            answer: "FlowerChat is a premium online flower delivery platform that connects local florists with customers. We offer fresh, beautiful floral arrangements for all occasions with same-day delivery in most areas.",
            category: "general",
            icon: "🌸"
        },
        { 
            question: "How do I book a flower?", 
            answer: "Simply browse our category page, select your desired flower arrangement, customize your order, and complete the booking process through our intuitive modal interface. You'll receive instant confirmation and tracking details.",
            category: "ordering",
            icon: "💐"
        },
        { 
            question: "Can I pay online?", 
            answer: "Yes! We offer secure online payments through Stripe, supporting all major credit cards, digital wallets, and bank transfers. All transactions are encrypted and protected for your security.",
            category: "payments",
            icon: "💳"
        },
        { 
            question: "How do I become a seller?", 
            answer: "Join our florist network by signing up as a seller. Complete your profile, add your beautiful floral creations to your dashboard, and start receiving orders. We provide marketing support and customer management tools.",
            category: "selling",
            icon: "🏪"
        },
        { 
            question: "What is your delivery area?", 
            answer: "We currently deliver to all major metropolitan areas and are expanding rapidly. Enter your zip code during checkout to check availability. Same-day delivery available for orders placed before 2 PM.",
            category: "delivery",
            icon: "🚚"
        },
        { 
            question: "Can I customize my flower arrangement?", 
            answer: "Absolutely! You can customize colors, add-ons, vase options, and include personalized messages. Our florists work to bring your vision to life while maintaining quality and freshness.",
            category: "customization",
            icon: "🎨"
        },
        { 
            question: "What is your refund policy?", 
            answer: "We offer a 100% satisfaction guarantee. If you're not happy with your order, contact us within 24 hours for a full refund or replacement. Damaged items are replaced immediately.",
            category: "policies",
            icon: "🔄"
        },
        { 
            question: "Do you offer subscription services?", 
            answer: "Yes! Our flower subscription service delivers fresh arrangements weekly, bi-weekly, or monthly. Perfect for offices, restaurants, or regular home decoration. Cancel or pause anytime.",
            category: "subscriptions",
            icon: "📦"
        }
    ];

    const categories = [
        { id: "all", name: "All Questions", icon: "📚", count: faqs.length },
        { id: "general", name: "General", icon: "ℹ️", count: faqs.filter(faq => faq.category === "general").length },
        { id: "ordering", name: "Ordering", icon: "🛒", count: faqs.filter(faq => faq.category === "ordering").length },
        { id: "payments", name: "Payments", icon: "💰", count: faqs.filter(faq => faq.category === "payments").length },
        { id: "delivery", name: "Delivery", icon: "🚛", count: faqs.filter(faq => faq.category === "delivery").length },
        { id: "selling", name: "Selling", icon: "👨‍💼", count: faqs.filter(faq => faq.category === "selling").length }
    ];

    const [activeCategory, setActiveCategory] = useState("all");

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const filteredFAQs = faqs.filter(faq => {
        const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                        Help Center
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Find answers to common questions about FlowerChat - your trusted flower delivery platform
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 pl-14 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg shadow-lg"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <span className="text-2xl text-gray-400">🔍</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Categories Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg pl-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <span className="text-2xl mr-2">📑</span>
                                Categories
                            </h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                                            activeCategory === category.id
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                                : 'text-gray-700 hover:bg-purple-50'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xl">{category.icon}</span>
                                            <span className="font-medium text-left">{category.name}</span>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            activeCategory === category.id
                                                ? 'bg-white/20 text-white'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {category.count}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Quick Support */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-3">Need more help?</h4>
                                <div className="space-y-2">
                                    <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors">
                                        <span className="text-xl">💬</span>
                                        <span>Live Chat</span>
                                    </button>
                                    <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors">
                                        <span className="text-xl">📞</span>
                                        <span>Call Support</span>
                                    </button>
                                    <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors">
                                        <span className="text-xl">📧</span>
                                        <span>Email Us</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Content */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-gray-900">
                                Frequently Asked Questions
                                <span className="text-purple-600 ml-2">({filteredFAQs.length})</span>
                            </h2>
                        </div>

                        {filteredFAQs.length > 0 ? (
                            <div className="space-y-4">
                                {filteredFAQs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                    >
                                        <button
                                            onClick={() => toggleFAQ(index)}
                                            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-xl">
                                                    {faq.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                                        {faq.question}
                                                    </h3>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-semibold">
                                                            {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`transform transition-transform duration-300 ${
                                                activeIndex === index ? 'rotate-180' : ''
                                            }`}>
                                                <span className="text-2xl text-purple-500">▼</span>
                                            </div>
                                        </button>
                                        
                                        <div className={`transition-all duration-300 overflow-hidden ${
                                            activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                            <div className="p-6 pt-0 border-t border-gray-100">
                                                <p className="text-gray-600 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                                {activeIndex === index && (
                                                    <div className="flex space-x-3 mt-4">
                                                        <button className="flex items-center space-x-2 text-sm text-purple-600 hover:text-purple-700">
                                                            <span>👍</span>
                                                            <span>Helpful</span>
                                                        </button>
                                                        <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700">
                                                            <span>👎</span>
                                                            <span>Not Helpful</span>
                                                        </button>
                                                        <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700">
                                                            <span>📋</span>
                                                            <span>Share</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">❓</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">No questions found</h3>
                                <p className="text-gray-500 mb-6">
                                    Try adjusting your search or browse different categories
                                </p>
                                <button 
                                    onClick={() => {
                                        setSearchTerm('');
                                        setActiveCategory('all');
                                    }}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

                        {/* Still Need Help Section */}
                        <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center">
                            <h3 className="text-2xl font-black mb-4">Still have questions?</h3>
                            <p className="text-purple-100 text-lg mb-6">
                                Our support team is here to help you 24/7
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center space-x-2">
                                    <span>💬</span>
                                    <span>Start Live Chat</span>
                                </button>
                                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-colors flex items-center justify-center space-x-2">
                                    <span>📞</span>
                                    <span>Call Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;