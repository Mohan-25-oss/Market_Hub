// ExtraSection.jsx
import React, { useState, useEffect } from 'react';

const ExtraSection = () => {
    const [activeTab, setActiveTab] = useState('features');
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [stats, setStats] = useState([
        { value: 0, target: 10000, label: 'Happy Customers', suffix: '+' },
        { value: 0, target: 5000, label: 'Products Sold', suffix: '+' },
        { value: 0, target: 95, label: 'Success Rate', suffix: '%' },
        { value: 0, target: 24, label: 'Support Hours', suffix: '/7' }
    ]);

    // Features data
    const features = [
        {
            icon: '🚀',
            title: 'Fast Delivery',
            description: 'Get your products delivered within 24 hours in major cities',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: '🛡️',
            title: 'Secure Payment',
            description: '100% secure payment gateway with money-back guarantee',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: '⭐',
            title: 'Quality Assurance',
            description: 'Every product is verified for quality and authenticity',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: '💬',
            title: '24/7 Support',
            description: 'Round-the-clock customer support for all your queries',
            color: 'from-orange-500 to-red-500'
        },
        {
            icon: '🔄',
            title: 'Easy Returns',
            description: '30-day return policy with no questions asked',
            color: 'from-indigo-500 to-purple-500'
        },
        {
            icon: '💰',
            title: 'Best Prices',
            description: 'Guaranteed best prices with price match promise',
            color: 'from-yellow-500 to-orange-500'
        }
    ];

    // Testimonials data
    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Premium Buyer',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            comment: 'Amazing platform! Found exactly what I needed at half the price. The verification process gave me complete peace of mind.',
            rating: 5
        },
        {
            name: 'Mike Chen',
            role: 'Tech Enthusiast',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            comment: 'Sold my old laptop within hours! The process was smooth and the support team was incredibly helpful.',
            rating: 5
        },
        {
            name: 'Emma Wilson',
            role: 'Fashion Blogger',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            comment: 'Love the quality of products here. Everything is exactly as described with great photos and honest descriptions.',
            rating: 4
        }
    ];

    // FAQ data
    const faqs = [
        {
            question: 'How does the verification process work?',
            answer: 'Our team manually verifies each product and seller to ensure authenticity and quality standards.'
        },
        {
            question: 'What is your return policy?',
            answer: 'We offer a 30-day return policy for all products. If you are not satisfied, you can return the product for a full refund.'
        },
        {
            question: 'How long does delivery take?',
            answer: 'Delivery typically takes 1-3 business days in major cities and 3-7 days in other areas.'
        },
        {
            question: 'Are the products brand new?',
            answer: 'We offer both brand new and pre-loved products. Each product clearly states its condition in the description.'
        }
    ];

    // Animate statistics
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prevStats => 
                prevStats.map(stat => ({
                    ...stat,
                    value: stat.value < stat.target ? 
                        Math.min(stat.value + Math.ceil(stat.target / 50), stat.target) : 
                        stat.value
                }))
            );
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        Why Choose Us?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover the features that make us the preferred choice for thousands of buyers and sellers
                    </p>
                </div>

                {/* Statistics Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                    {stat.value}{stat.suffix}
                                </div>
                                <div className="text-gray-600 font-semibold">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white rounded-2xl p-2 shadow-lg inline-flex">
                        {[
                            { id: 'features', label: 'Features', icon: '⭐' },
                            { id: 'testimonials', label: 'Testimonials', icon: '💬' },
                            { id: 'faq', label: 'FAQ', icon: '❓' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                                    activeTab === tab.id
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                <span className="text-xl">{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Features Tab */}
                    {activeTab === 'features' && (
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                                    >
                                        {/* Background Gradient Effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                                        
                                        <div className="relative z-10">
                                            <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                                                {feature.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Testimonials Tab */}
                    {activeTab === 'testimonials' && (
                        <div className="p-12">
                            <div className="relative max-w-4xl mx-auto">
                                {/* Testimonial Cards */}
                                <div className="relative h-80">
                                    {testimonials.map((testimonial, index) => (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-all duration-500 transform ${
                                                index === currentTestimonial
                                                    ? 'opacity-100 translate-x-0 scale-100'
                                                    : index < currentTestimonial
                                                    ? 'opacity-0 -translate-x-20 scale-95'
                                                    : 'opacity-0 translate-x-20 scale-95'
                                            }`}
                                        >
                                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl">
                                                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                                                    {/* Customer Image */}
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={testimonial.image}
                                                            alt={testimonial.name}
                                                            className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                                                        />
                                                    </div>
                                                    
                                                    {/* Testimonial Content */}
                                                    <div className="flex-1 text-center md:text-left">
                                                        <div className="flex justify-center md:justify-start mb-4">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span
                                                                    key={i}
                                                                    className={`text-2xl ${
                                                                        i < testimonial.rating
                                                                            ? 'text-yellow-400'
                                                                            : 'text-gray-300'
                                                                    }`}
                                                                >
                                                                    ★
                                                                </span>
                                                            ))}
                                                        </div>
                                                        
                                                        <blockquote className="text-xl text-gray-700 italic mb-6 leading-relaxed">
                                                            "{testimonial.comment}"
                                                        </blockquote>
                                                        
                                                        <div>
                                                            <div className="font-bold text-gray-900 text-lg">
                                                                {testimonial.name}
                                                            </div>
                                                            <div className="text-purple-600 font-semibold">
                                                                {testimonial.role}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Testimonial Navigation Dots */}
                                <div className="flex justify-center space-x-3 mt-8">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentTestimonial(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                index === currentTestimonial
                                                    ? 'bg-purple-600 scale-125'
                                                    : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FAQ Tab */}
                    {activeTab === 'faq' && (
                        <div className="p-8">
                            <div className="max-w-4xl mx-auto space-y-6">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="group bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200"
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                                                Q{index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                                                    {faq.question}
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Help Section */}
                            <div className="max-w-4xl mx-auto mt-12">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-center text-white shadow-2xl">
                                    <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                                    <p className="text-blue-100 mb-6 text-lg">
                                        Our support team is here to help you 24/7
                                    </p>
                                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                                        <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
                                            📞 Contact Support
                                        </button>
                                        <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-colors">
                                            💬 Live Chat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 text-white shadow-2xl">
                        <h3 className="text-4xl font-black mb-4">
                            Ready to Get Started?
                        </h3>
                        <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust us for their buying and selling needs
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg text-lg">
                                🛍️ Start Shopping
                            </button>
                            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-emerald-600 transition-colors text-lg">
                                💰 Start Selling
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtraSection;