import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext/AppContext';
import logo from "../../../assets/images/logo.png";

const Navbar = () => {
    const { user, logOut, deleteTheUser } = useContext(AppContext);
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const userRef = useRef(null);
    const categoryRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // Scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Click outside handler for dropdowns and mobile menu
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userRef.current && !userRef.current.contains(e.target)) {
                setUserDropdownOpen(false);
            }
            if (categoryRef.current && !categoryRef.current.contains(e.target)) {
                setCategoryDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target) && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [mobileMenuOpen]);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteUser = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
        try {
            await deleteTheUser();
            alert("Your account has been deleted successfully.");
            navigate("/");
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Could not delete account: " + error.message);
        }
    };

    // Desktop menu items
    const desktopMenuItems = (
        <>
            <li>
                <Link 
                    to="/" 
                    className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
                >
                    Home
                </Link>
            </li>
            <li>
                <Link 
                    to="/about" 
                    className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
                >
                    About
                </Link>
            </li>

            {/* Category Dropdown */}
            <li className="relative" ref={categoryRef}>
                <button
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                >
                    <span>Categories</span>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${categoryDropdownOpen ? 'rotate-180' : ''}`} 
                         fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
                {categoryDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-56 bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 py-3 z-50 backdrop-blur-sm">
                        <div className="px-4 py-2 border-b border-gray-100">
                            <h3 className="font-semibold text-sm text-gray-500">PRODUCT CATEGORIES</h3>
                        </div>
                        <div className="py-1">
                            <Link to="/category/electronics" className="flex items-center space-x-3 px-4 py-3 hover:bg-purple-50 transition-colors">
                                <span className="text-xl">📱</span>
                                <span className="font-medium">Electronics</span>
                            </Link>
                            <Link to="/category/fashion" className="flex items-center space-x-3 px-4 py-3 hover:bg-purple-50 transition-colors">
                                <span className="text-xl">👕</span>
                                <span className="font-medium">Fashion</span>
                            </Link>
                            <Link to="/category/books" className="flex items-center space-x-3 px-4 py-3 hover:bg-purple-50 transition-colors">
                                <span className="text-xl">📚</span>
                                <span className="font-medium">Books</span>
                            </Link>
                            <Link to="/category/home" className="flex items-center space-x-3 px-4 py-3 hover:bg-purple-50 transition-colors">
                                <span className="text-xl">🏠</span>
                                <span className="font-medium">Home & Garden</span>
                            </Link>
                            <Link to="/category/sports" className="flex items-center space-x-3 px-4 py-3 hover:bg-purple-50 transition-colors">
                                <span className="text-xl">⚽</span>
                                <span className="font-medium">Sports</span>
                            </Link>
                        </div>
                    </div>
                )}
            </li>

            <li>
                <Link 
                    to="/blog" 
                    className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
                >
                    Blog
                </Link>
            </li>
            <li>
                <Link 
                    to="/contact" 
                    className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
                >
                    Contact
                </Link>
            </li>
        </>
    );

    // Mobile menu items
    const mobileMenuItems = (
        <>
            <li>
                <Link 
                    to="/" 
                    className="block px-4 py-3 text-lg hover:bg-white/10 rounded-lg transition-all duration-300 border-b border-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    🏠 Home
                </Link>
            </li>
            <li>
                <Link 
                    to="/about" 
                    className="block px-4 py-3 text-lg hover:bg-white/10 rounded-lg transition-all duration-300 border-b border-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    ℹ️ About
                </Link>
            </li>

            {/* Mobile Category Accordion */}
            <li className="border-b border-white/10">
                <button
                    className="flex items-center justify-between w-full px-4 py-3 text-lg hover:bg-white/10 rounded-lg transition-all duration-300"
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                >
                    <span>📦 Categories</span>
                    <svg className={`w-5 h-5 transition-transform duration-300 ${categoryDropdownOpen ? 'rotate-180' : ''}`} 
                         fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
                {categoryDropdownOpen && (
                    <div className="bg-white/10 ml-4 mt-2 rounded-lg overflow-hidden">
                        <Link 
                            to="/category/electronics" 
                            className="block px-4 py-3 text-white/90 hover:bg-white/20 transition-colors border-b border-white/10"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            📱 Electronics
                        </Link>
                        <Link 
                            to="/category/fashion" 
                            className="block px-4 py-3 text-white/90 hover:bg-white/20 transition-colors border-b border-white/10"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            👕 Fashion
                        </Link>
                        <Link 
                            to="/category/books" 
                            className="block px-4 py-3 text-white/90 hover:bg-white/20 transition-colors border-b border-white/10"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            📚 Books
                        </Link>
                        <Link 
                            to="/category/home" 
                            className="block px-4 py-3 text-white/90 hover:bg-white/20 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            🏠 Home & Garden
                        </Link>
                    </div>
                )}
            </li>

            <li>
                <Link 
                    to="/blog" 
                    className="block px-4 py-3 text-lg hover:bg-white/10 rounded-lg transition-all duration-300 border-b border-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    📝 Blog
                </Link>
            </li>
            <li>
                <Link 
                    to="/contact" 
                    className="block px-4 py-3 text-lg hover:bg-white/10 rounded-lg transition-all duration-300 border-b border-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    📞 Contact
                </Link>
            </li>
            
            {!user && (
                <li>
                    <Link 
                        to="/Signin" 
                        className="block px-4 py-3 text-lg bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-center font-semibold mt-4"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        🔐 Sign In
                    </Link>
                </li>
            )}
        </>
    );

    return (
        <nav 
            className={`bg-gradient-to-br from-gray-900 to-purple-900 text-white sticky top-0 z-50 transition-all duration-500 ${
                isScrolled ? 'shadow-2xl backdrop-blur-lg bg-gradient-to-br from-gray-900/95 to-purple-900/95' : 'shadow-md'
            }`}
            ref={mobileMenuRef}
        >
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org2000/svg" className="h-6 w-6" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
                        <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
                            <img
                                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl group-hover:scale-110 transition-transform duration-300"
                                src={logo}
                                alt="Marketplace Logo"
                            />
                            <span className="text-lg sm:text-xl md:text-2xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Marketplace
                            </span>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <ul className="hidden lg:flex items-center space-x-1">
                        {desktopMenuItems}

                        {/* User Auth Section */}
                        {!user ? (
                            <li>
                                <Link 
                                    to="/Signin" 
                                    className="ml-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/25"
                                >
                                    Sign In
                                </Link>
                            </li>
                        ) : (
                            <div className="relative ml-4" ref={userRef}>
                                <button
                                    className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white/50 hover:border-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    aria-label="User menu"
                                >
                                    <img
                                        src={user.photoURL || "https://via.placeholder.com/40"}
                                        alt={user.displayName || "User"}
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/40";
                                        }}
                                    />
                                </button>

                                {userDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 py-3 z-50 backdrop-blur-sm">
                                        {/* User Info */}
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="font-semibold text-sm truncate">{user.displayName || 'User'}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        
                                        {/* Menu Items */}
                                        <div className="py-1">
                                            <Link 
                                                to="/dashboard" 
                                                className="flex items-center space-x-3 px-4 py-3 hover:bg-purple-50 transition-colors"
                                                onClick={() => setUserDropdownOpen(false)}
                                            >
                                                <span className="text-lg">📊</span>
                                                <span className="font-medium">Dashboard</span>
                                            </Link>
                                            <button 
                                                className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
                                                onClick={handleDeleteUser}
                                            >
                                                <span className="text-lg">🗑️</span>
                                                <span className="font-medium">Delete Account</span>
                                            </button>
                                            <button 
                                                className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 border-t border-gray-100 mt-1"
                                                onClick={handleLogout}
                                            >
                                                <span className="text-lg">🚪</span>
                                                <span className="font-medium">Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </ul>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-gradient-to-b from-gray-800 to-purple-900 backdrop-blur-lg border-t border-white/10">
                    <ul className="px-4 py-3 space-y-1 max-h-screen overflow-y-auto">
                        {mobileMenuItems}
                        
                        {/* Mobile User Section */}
                        {user && (
                            <>
                                <li className="border-t border-white/20 pt-4 mt-4">
                                    <div className="px-4 py-2 bg-white/10 rounded-lg">
                                        <p className="font-semibold text-white/90">{user.displayName}</p>
                                        <p className="text-sm text-white/70 truncate">{user.email}</p>
                                    </div>
                                </li>
                                <li>
                                    <Link 
                                        to="/dashboard" 
                                        className="block px-4 py-3 text-lg hover:bg-white/10 rounded-lg transition-all duration-300 border-b border-white/10"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        📊 Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button 
                                        className="block w-full text-left px-4 py-3 text-lg hover:bg-red-500/20 rounded-lg transition-all duration-300 border-b border-white/10 text-red-300"
                                        onClick={handleDeleteUser}
                                    >
                                        🗑️ Delete Account
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        className="block w-full text-left px-4 py-3 text-lg hover:bg-white/10 rounded-lg transition-all duration-300 text-white"
                                        onClick={handleLogout}
                                    >
                                        🚪 Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;