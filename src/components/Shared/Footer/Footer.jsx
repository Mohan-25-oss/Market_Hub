// Footer.jsx
import React, { useState } from 'react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    // Footer links data
    const footerLinks = {
        marketplace: {
            title: "Marketplace",
            links: [
                { name: "All Categories", href: "#" },
                { name: "Electronics", href: "#" },
                { name: "Fashion", href: "#" },
                { name: "Home & Garden", href: "#" },
                { name: "Vehicles", href: "#" },
                { name: "Sports", href: "#" }
            ]
        },
        company: {
            title: "Company",
            links: [
                { name: "About Us", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Press", href: "#" },
                { name: "Blog", href: "#" },
                { name: "Trust & Safety", href: "#" },
                { name: "Contact", href: "#" }
            ]
        },
        support: {
            title: "Support",
            links: [
                { name: "Help Center", href: "#" },
                { name: "Seller Guidelines", href: "#" },
                { name: "Buyer Guidelines", href: "#" },
                { name: "Shipping Info", href: "#" },
                { name: "Returns", href: "#" },
                { name: "FAQ", href: "#" }
            ]
        },
        legal: {
            title: "Legal",
            links: [
                { name: "Terms of Service", href: "#" },
                { name: "Privacy Policy", href: "#" },
                { name: "Cookie Policy", href: "#" },
                { name: "Disclaimer", href: "#" },
                { name: "Payment Terms", href: "#" },
                { name: "Data Protection", href: "#" }
            ]
        }
    };

    const socialLinks = [
        {
            name: "Facebook",
            icon: "📘",
            href: "#",
            color: "hover:bg-blue-500"
        },
        {
            name: "Twitter",
            icon: "🐦",
            href: "#",
            color: "hover:bg-blue-400"
        },
        {
            name: "Instagram",
            icon: "📷",
            href: "#",
            color: "hover:bg-pink-500"
        },
        {
            name: "LinkedIn",
            icon: "💼",
            href: "#",
            color: "hover:bg-blue-600"
        },
        {
            name: "YouTube",
            icon: "📺",
            href: "#",
            color: "hover:bg-red-500"
        }
    ];

    const appStores = [
        {
            name: "App Store",
            icon: "🍎",
            text: "Download on the",
            store: "App Store",
            href: "#",
            gradient: "from-gray-800 to-black"
        },
        {
            name: "Google Play",
            icon: "🤖",
            text: "Get it on",
            store: "Google Play",
            href: "#",
            gradient: "from-green-500 to-emerald-600"
        }
    ];

    return (
        <footer className="bg-gradient-to-br from-gray-900 to-purple-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Brand & Newsletter Section */}
                    <div className="space-y-6">
                        {/* Brand Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                                M
                            </div>
                            <div>
                                <h2 className="text-3xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    MarketHub
                                </h2>
                                <p className="text-purple-200 text-sm">Your Trusted Marketplace</p>
                            </div>
                        </div>

                        <p className="text-gray-300 text-lg max-w-md leading-relaxed">
                            Connecting buyers and sellers worldwide. Discover amazing deals, sell your items, 
                            and join our community of trusted users.
                        </p>

                        {/* Newsletter Subscription */}
                        <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 rounded-2xl p-6 backdrop-blur-sm border border-purple-700/30">
                            <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                            <p className="text-purple-200 mb-4">Get the latest deals and updates</p>
                            
                            {isSubscribed ? (
                                <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 text-center">
                                    <div className="flex items-center justify-center space-x-2 text-green-400">
                                        <span className="text-xl">🎉</span>
                                        <span className="font-semibold">Thank you for subscribing!</span>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 px-4 py-3 bg-white/10 border border-purple-600/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm placeholder-purple-300 text-white"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Quick Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {Object.entries(footerLinks).map(([key, section]) => (
                            <div key={key}>
                                <h3 className="text-lg font-bold mb-4 text-white border-l-4 border-purple-500 pl-3">
                                    {section.title}
                                </h3>
                                <ul className="space-y-3">
                                    {section.links.map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href={link.href}
                                                className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-1 transform flex items-center group"
                                            >
                                                <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-purple-700/30 my-12"></div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Social Links */}
                    <div className="flex flex-col items-center lg:items-start space-y-4">
                        <h4 className="font-semibold text-gray-300">Follow Us</h4>
                        <div className="flex space-x-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-lg backdrop-blur-sm border border-white/20 hover:scale-110 transform transition-all duration-300 ${social.color} hover:shadow-lg`}
                                    title={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-gray-400">
                            © 2024 <span className="text-purple-400 font-semibold">MarketHub</span>. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                            Made with ❤️ for the community
                        </p>
                    </div>

                    {/* App Stores */}
                    <div className="flex flex-col items-center lg:items-end space-y-3">
                        <h4 className="font-semibold text-gray-300">Get the App</h4>
                        <div className="flex space-x-3">
                            {appStores.map((store, index) => (
                                <a
                                    key={index}
                                    href={store.href}
                                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 hover:scale-105 transform transition-all duration-300 hover:shadow-lg min-w-[140px]"
                                >
                                    <span className="text-2xl">{store.icon}</span>
                                    <div className="text-left">
                                        <div className="text-xs text-gray-400">{store.text}</div>
                                        <div className="text-sm font-semibold text-white">{store.store}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 pt-8 border-t border-purple-700/30">
                    <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span>100% Secure Payments</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                            <span>Verified Sellers</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                            <span>Buyer Protection</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-2xl hover:scale-110 transform transition-all duration-300 hover:shadow-purple-500/50 animate-bounce">
                    💬
                </button>
            </div>

            {/* Background Decorations */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-20 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
            </div>
        </footer>
    );
};

export default Footer;