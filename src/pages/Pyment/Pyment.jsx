import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Mock payment gateway component
function PaymentModal({ order, onSuccess, onClose }) {
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [cardDetails, setCardDetails] = useState({
        number: "",
        expiry: "",
        cvv: "",
        name: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock payment processing
        const success = Math.random() > 0.1; // 90% success rate

        if (success) {
            toast.success(`Payment for ${order.name} successful! 🎉`);
            onSuccess();
        } else {
            toast.error("Payment failed. Please try again.");
        }
        
        setLoading(false);
    };

    const handleInputChange = (field, value) => {
        setCardDetails(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Auto-fill with test data
    const autoFillTestData = () => {
        setCardDetails({
            number: "4242 4242 4242 4242",
            expiry: "12/28",
            cvv: "123",
            name: "John Doe"
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Complete Payment</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Order Summary */}
                <div className="p-4 bg-blue-50 rounded-lg mb-4">
                    <p className="font-semibold text-lg">{order.name}</p>
                    <p className="text-xl font-bold text-gray-800">${(order.price / 100).toFixed(2)}</p>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {["card", "bank", "mobile"].map((method) => (
                            <button
                                key={method}
                                type="button"
                                onClick={() => setPaymentMethod(method)}
                                className={`p-3 border rounded-lg text-center transition ${
                                    paymentMethod === method
                                        ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                                        : "border-gray-300 hover:border-gray-400"
                                }`}
                            >
                                {method === "card" && "💳 Card"}
                                {method === "bank" && "🏦 Bank"}
                                {method === "mobile" && "📱 Mobile"}
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Card Payment Form */}
                    {paymentMethod === "card" && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardDetails.number}
                                    onChange={(e) => handleInputChange("number", e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Expiry Date
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        value={cardDetails.expiry}
                                        onChange={(e) => handleInputChange("expiry", e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        value={cardDetails.cvv}
                                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cardholder Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={cardDetails.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>

                            <button
                                type="button"
                                onClick={autoFillTestData}
                                className="text-sm text-indigo-600 hover:text-indigo-700"
                            >
                                🔥 Auto-fill test data
                            </button>
                        </div>
                    )}

                    {/* Bank Transfer Form */}
                    {paymentMethod === "bank" && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Select Bank
                                </label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <option>HSBC Bank</option>
                                    <option>City Bank</option>
                                    <option>Standard Chartered</option>
                                    <option>BRAC Bank</option>
                                    <option>Dutch-Bangla Bank</option>
                                </select>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg">
                                <p className="text-sm text-yellow-700">
                                    You will be redirected to your bank's secure portal to complete the payment.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Mobile Banking Form */}
                    {paymentMethod === "mobile" && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Select Provider
                                </label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <option>bKash</option>
                                    <option>Nagad</option>
                                    <option>Rocket</option>
                                    <option>Upay</option>
                                    <option>Tap</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="01XXX-XXXXXX"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    )}

                    {/* Payment Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Processing...
                            </>
                        ) : (
                            `Pay $${(order.price / 100).toFixed(2)}`
                        )}
                    </button>

                    {/* Security Badge */}
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                            <div>🔒</div>
                            <div>Secure SSL Encryption</div>
                        </div>
                    </div>

                    {/* Test Card Info */}
                    {paymentMethod === "card" && (
                        <div className="p-3 bg-gray-100 rounded-lg">
                            <p className="text-xs text-gray-600 text-center">
                                <strong>Test Card:</strong> 4242 4242 4242 4242 | Any future expiry | Any CVV
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

// Main Component
export default function BuyerDashboard() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    useEffect(() => {
        // Mock API: Fetch all orders for the buyer
        setOrders([
            { id: 1, name: "Product A", price: 2000, status: "unpaid" },
            { id: 2, name: "Product B", price: 5000, status: "paid" },
            { id: 3, name: "Product C", price: 1500, status: "unpaid" },
            { id: 4, name: "Product D", price: 3500, status: "unpaid" },
        ]);
    }, []);

    const handlePaymentClick = (order) => {
        setSelectedOrder(order);
        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = () => {
        if (selectedOrder) {
            setOrders((prev) =>
                prev.map((o) =>
                    o.id === selectedOrder.id ? { ...o, status: "paid" } : o
                )
            );
        }
        setShowPaymentModal(false);
        setSelectedOrder(null);
    };

    const handleClosePayment = () => {
        setShowPaymentModal(false);
        setSelectedOrder(null);
    };

    const formatPrice = (cents) => {
        return `$${(cents / 100).toFixed(2)}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1 className="text-3xl font-bold text-gray-800 mb-6">🛒 My Orders</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between border border-gray-100 hover:shadow-lg transition"
                    >
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                {order.name}
                            </h2>
                            <p className="text-gray-500">{formatPrice(order.price)}</p>
                            <p
                                className={`mt-2 text-sm font-medium ${
                                    order.status === "paid"
                                        ? "text-green-600"
                                        : "text-yellow-600"
                                }`}
                            >
                                Status: {order.status.toUpperCase()}
                            </p>
                        </div>

                        <div className="mt-4">
                            {order.status === "unpaid" ? (
                                <button
                                    onClick={() => handlePaymentClick(order)}
                                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition transform hover:scale-105"
                                >
                                    Pay Now
                                </button>
                            ) : (
                                <button
                                    className="w-full py-2 bg-green-500 text-white rounded-xl font-medium cursor-default"
                                    disabled
                                >
                                    Paid ✅
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Payment Modal */}
            {showPaymentModal && selectedOrder && (
                <PaymentModal
                    order={selectedOrder}
                    onSuccess={handlePaymentSuccess}
                    onClose={handleClosePayment}
                />
            )}
        </div>
    );
}