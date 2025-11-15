// NotFound.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Countdown for automatic redirect
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    // Mouse move effect for parallax
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Quick links for navigation
    const quickLinks = [
        {
            icon: '🏠',
            title: 'Home',
            description: 'Return to homepage',
            path: '/',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: '📦',
            title: 'Products',
            description: 'Browse all items',
            path: '/categories',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: '🔍',
            title: 'Search',
            description: 'Find what you need',
            path: '/search',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: '📞',
            title: 'Support',
            description: 'Get help & contact',
            path: '/contact',
            color: 'from-orange-500 to-red-500'
        }
    ];

    // Floating animation elements
    const floatingElements = [
        { icon: '🔍', size: 'w-16 h-16', position: 'top-20 left-10', delay: '0s' },
        { icon: '📱', size: 'w-12 h-12', position: 'top-40 right-20', delay: '1s' },
        { icon: '💻', size: 'w-20 h-20', position: 'bottom-40 left-20', delay: '2s' },
        { icon: '👕', size: 'w-14 h-14', position: 'bottom-20 right-32', delay: '3s' },
        { icon: '📚', size: 'w-16 h-16', position: 'top-32 left-1/4', delay: '4s' },
        { icon: '🎮', size: 'w-12 h-12', position: 'bottom-32 right-1/4', delay: '5s' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orbs */}
                <div 
                    className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-48 -left-48"
                    style={{
                        transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
                    }}
                ></div>
                <div 
                    className="absolute w-80 h-80 bg-pink-500/20 rounded-full blur-3xl -bottom-40 -right-40"
                    style={{
                        transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`
                    }}
                ></div>
                <div 
                    className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-2xl top-1/2 left-1/3"
                    style={{
                        transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`
                    }}
                ></div>

                {/* Floating Icons */}
                {floatingElements.map((element, index) => (
                    <div
                        key={index}
                        className={`absolute ${element.position} ${element.size} bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-2xl animate-float pointer-events-none`}
                        style={{
                            animationDelay: element.delay,
                            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
                        }}
                    >
                        {element.icon}
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center py-12">
                <div className="text-center w-full">
                    {/* Animated 404 Text */}
                    <div className="mb-8 relative">
                        <div className="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent relative">
                            404
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
                                404
                            </div>
                        </div>
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
                    </div>

                    {/* Error Message */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Oops! Page Not Found
                        </h1>
                        <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
                            The page you're looking for seems to have wandered off into the digital void. 
                            Don't worry, we'll help you find your way back!
                        </p>
                    </div>

                    {/* Countdown Timer */}
                    <div className="mb-12">
                        <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-purple-200">
                                Redirecting to homepage in{' '}
                                <span className="font-black text-white text-xl">{countdown}</span> seconds
                            </span>
                        </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
                        {quickLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.path}
                                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-r ${link.color} rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    {link.icon}
                                </div>
                                <h3 className="font-bold text-white text-lg mb-2">{link.title}</h3>
                                <p className="text-purple-200 text-sm">{link.description}</p>
                            </Link>
                        ))}
                    </div>

                    {/* Main CTA Button */}
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                        >
                            <span>↶</span>
                            <span>Go Back</span>
                        </button>
                        <Link
                            to="/"
                            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-3"
                        >
                            <span>🏠</span>
                            <span>Go Home</span>
                        </Link>
                    </div>

                    {/* Search Suggestion */}
                    <div className="mt-12 max-w-md mx-auto">
                        <p className="text-purple-200 mb-4">Can't find what you're looking for?</p>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search our marketplace..."
                                className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-purple-300 text-white"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                <span className="text-2xl text-purple-300">🔍</span>
                            </div>
                            <button className="absolute right-2 top-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Support Information */}
                    <div className="mt-12 pt-8 border-t border-purple-700/30">
                        <p className="text-purple-300 mb-4">Still need help?</p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors">
                                <span>📞</span>
                                <span>Contact Support</span>
                            </button>
                            <button className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors">
                                <span>💬</span>
                                <span>Live Chat</span>
                            </button>
                            <button className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors">
                                <span>📧</span>
                                <span>Email Us</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div 
                    className="absolute inset-0 bg-repeat"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        animation: 'patternMove 20s linear infinite'
                    }}
                ></div>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes patternMove {
                    0% { background-position: 0 0; }
                    100% { background-position: 60px 60px; }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default NotFound;