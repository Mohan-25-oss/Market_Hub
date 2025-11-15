// BannerSlider.jsx
import React, { useState, useEffect, useRef } from "react";

// Enhanced slide data with vibrant colors and themes
const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        title: "Discover Amazing Products",
        subtitle: "Find the best deals and unique items",
        gradient: "from-purple-600/60 to-pink-600/60",
        particleCount: 35,
        buttonText: "Shop Now",
        buttonColor: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        title: "Sell With Confidence",
        subtitle: "Reach thousands of potential buyers",
        gradient: "from-blue-600/60 to-cyan-600/60",
        particleCount: 28,
        buttonText: "Start Selling",
        buttonColor: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        title: "Join Our Community",
        subtitle: "Connect with buyers and sellers worldwide",
        gradient: "from-green-600/60 to-emerald-600/60",
        particleCount: 32,
        buttonText: "Join Free",
        buttonColor: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        title: "Premium Quality",
        subtitle: "Only the best products make it to our platform",
        gradient: "from-orange-600/60 to-red-600/60",
        particleCount: 30,
        buttonText: "Explore Premium",
        buttonColor: "bg-gradient-to-r from-orange-500 to-red-500"
    }
];

// Enhanced color palette with more vibrant options
const getRandomColor = () => {
    const colors = [
        "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", 
        "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
        "#F8C471", "#82E0AA", "#F1948A", "#85C1E9", "#D7BDE2"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const slideRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Clone slides for infinite loop
    const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

    const updateIndex = (newIndex) => {
        setIsTransitioning(true);
        setCurrentIndex(newIndex);
    };

    const goPrev = () => {
        if (isTransitioning) return;
        updateIndex(currentIndex - 1);
    };

    const goNext = () => {
        if (isTransitioning) return;
        updateIndex(currentIndex + 1);
    };

    // Auto-slide with hover pause
    useEffect(() => {
        if (isHovered) return;
        
        const interval = setInterval(() => goNext(), 5000);
        return () => clearInterval(interval);
    }, [currentIndex, isHovered]);

    // Infinite loop adjustment
    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex === 0) {
            setCurrentIndex(slides.length);
            slideRef.current.style.transition = "none";
            slideRef.current.style.transform = `translateX(-${slides.length * 100}%)`;
        }
        if (currentIndex === slides.length + 1) {
            setCurrentIndex(1);
            slideRef.current.style.transition = "none";
            slideRef.current.style.transform = `translateX(-100%)`;
        }
    };

    // Touch handlers
    const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
    const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
    const handleTouchEnd = () => {
        const delta = touchStartX.current - touchEndX.current;
        if (delta > 50) goNext();
        if (delta < -50) goPrev();
    };

    // Update slide transform
    useEffect(() => {
        if (slideRef.current) {
            slideRef.current.style.transition = isTransitioning
                ? "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                : "none";
            slideRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }, [currentIndex, isTransitioning]);

    // Enhanced particle system
    const renderParticles = (slide) =>
        [...Array(slide.particleCount)].map((_, i) => {
            const size = Math.random() * 8 + 3;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const duration = 4 + Math.random() * 6;
            const delay = Math.random() * 5;
            const anim = `float${i % 4} ${duration}s ${delay}s infinite`;
            const color = getRandomColor();
            const shape = Math.random() > 0.7 ? "star" : Math.random() > 0.5 ? "triangle" : "circle";
            
            return (
                <div
                    key={i}
                    className={`absolute pointer-events-none ${
                        shape === 'star' ? 'star' : shape === 'triangle' ? 'triangle' : 'rounded-full'
                    }`}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        top: `${top}%`,
                        left: `${left}%`,
                        backgroundColor: color,
                        animation: anim,
                        filter: 'blur(0.5px)',
                        opacity: 0.8
                    }}
                />
            );
        });

    return (
        <div
            className="relative w-full h-[600px] overflow-hidden group"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 opacity-20 animate-gradient-x z-0" />
            
            <div
                className="flex h-full"
                ref={slideRef}
                onTransitionEnd={handleTransitionEnd}
            >
                {extendedSlides.map((slide, idx) => (
                    <div key={idx} className="w-full flex-shrink-0 h-full relative overflow-hidden">
                        {/* Enhanced Parallax background */}
                        <div
                            className="absolute w-full h-full top-0 left-0 bg-cover bg-center transform transition-all duration-1000 ease-out"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                transform: idx === currentIndex ? "scale(1.1)" : "scale(1)",
                                filter: idx === currentIndex ? "brightness(1)" : "brightness(0.7)"
                            }}
                        />
                        
                        {/* Dynamic gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-80 transition-opacity duration-1000 ${
                            idx === currentIndex ? "opacity-80" : "opacity-60"
                        }`} />
                        
                        {/* Animated pattern overlay */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-repeat" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                animation: 'patternMove 20s linear infinite'
                            }} />
                        </div>

                        {/* Enhanced colorful particles */}
                        <div className="absolute inset-0 pointer-events-none z-10">
                            {renderParticles(slide)}
                        </div>
                        
                        {/* Enhanced captions with animations */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-20">
                            <div className="max-w-4xl space-y-6">
                                <h2
                                    className={`text-5xl md:text-6xl font-black text-white opacity-0 transform translate-y-10 transition-all duration-1000 ${
                                        idx === currentIndex ? "opacity-100 translate-y-0 animate-pulse-slow" : ""
                                    }`}
                                    style={{ 
                                        textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                                        background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    {slide.title}
                                </h2>
                                <p
                                    className={`text-xl md:text-2xl text-white opacity-0 transform translate-y-8 transition-all duration-1000 delay-300 ${
                                        idx === currentIndex ? "opacity-100 translate-y-0" : ""
                                    }`}
                                    style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
                                >
                                    {slide.subtitle}
                                </p>
                                <button
                                    className={`${slide.buttonColor} text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl opacity-0 transform translate-y-8 transition-all duration-1000 delay-500 hover:scale-110 hover:shadow-3xl ${
                                        idx === currentIndex ? "opacity-100 translate-y-0" : ""
                                    }`}
                                >
                                    {slide.buttonText}
                                    <span className="ml-2 animate-bounce">→</span>
                                </button>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div className={`absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl transition-all duration-1000 ${
                            idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        }`} />
                        <div className={`absolute bottom-20 right-20 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl transition-all duration-1000 delay-200 ${
                            idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        }`} />
                    </div>
                ))}
            </div>

            {/* Enhanced Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-30">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => updateIndex(idx + 1)}
                        className="group relative"
                    >
                        <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                            currentIndex === idx + 1 
                                ? "bg-white scale-125 shadow-glow" 
                                : "bg-white/60 hover:bg-white/80"
                        }`} />
                        <div className={`absolute -inset-2 rounded-full border-2 border-white/30 transition-all duration-300 ${
                            currentIndex === idx + 1 ? "scale-150 opacity-100" : "scale-100 opacity-0"
                        }`} />
                    </button>
                ))}
            </div>

            {/* Enhanced Arrows */}
            <button
                onClick={goPrev}
                className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white text-4xl font-bold bg-black/30 rounded-full p-4 hover:bg-black/50 hover:scale-110 transition-all duration-300 z-30 backdrop-blur-sm group"
            >
                <span className="block group-hover:-translate-x-1 transition-transform">‹</span>
            </button>
            <button
                onClick={goNext}
                className="absolute top-1/2 right-8 transform -translate-y-1/2 text-white text-4xl font-bold bg-black/30 rounded-full p-4 hover:bg-black/50 hover:scale-110 transition-all duration-300 z-30 backdrop-blur-sm group"
            >
                <span className="block group-hover:translate-x-1 transition-transform">›</span>
            </button>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-30">
                <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-5000 ease-linear"
                    style={{ 
                        width: isHovered ? '0%' : '100%',
                        animation: isHovered ? 'none' : 'progress 5s linear'
                    }}
                />
            </div>

            {/* Enhanced Animations */}
            <style jsx>{`
                @keyframes float0 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                @keyframes float1 {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-15px) scale(1.1); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    33% { transform: translateY(-10px) translateX(5px); }
                    66% { transform: translateY(-5px) translateX(-5px); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translateY(0px) skew(0deg); }
                    50% { transform: translateY(-12px) skew(5deg); }
                }
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                @keyframes patternMove {
                    0% { background-position: 0 0; }
                    100% { background-position: 60px 60px; }
                }
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }
                .star {
                    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                }
                .triangle {
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                }
                .shadow-glow {
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
                }
                .animate-gradient-x {
                    animation: gradient-x 15s ease infinite;
                    background-size: 200% 200%;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Banner;