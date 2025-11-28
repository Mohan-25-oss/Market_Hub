import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe("pk_test_your_stripe_publishable_key_here");

// Payment Form Component
function CheckoutForm({ order, onSuccess, onClose }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent when component mounts
        fetch("http://localhost:3001/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId: order.id,
                amount: order.price,
                name: order.name,
                currency: "usd",
            }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
            .catch((error) => {
                console.error("Error creating payment intent:", error);
                toast.error("Failed to initialize payment");
            });
    }, [order]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success?order_id=${order.id}`,
            },
            redirect: 'if_required',
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Payment processed successfully!");
            onSuccess();
        }

        setLoading(false);
    };

    if (!clientSecret) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Complete Payment</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="font-semibold">{order.name}</p>
                        <p className="text-lg text-gray-800">${(order.price / 100).toFixed(2)}</p>
                    </div>

                    <PaymentElement
                        options={{
                            layout: "tabs",
                            wallets: {
                                applePay: 'auto',
                                googlePay: 'auto'
                            }
                        }}
                    />

                    <button
                        type="submit"
                        disabled={!stripe || loading}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Processing..." : `Pay $${(order.price / 100).toFixed(2)}`}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                        Secure payment powered by Stripe
                    </p>
                </form>
            </div>
        </div>
    );
}

// Main Component
export default function BuyerDashboard() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    useEffect(() => {
        // Mock API: Fetch all orders for the buyer
        setOrders([
            { id: 1, name: "Product A", price: 2000, status: "unpaid" },
            { id: 2, name: "Product B", price: 5000, status: "paid" },
            { id: 3, name: "Product C", price: 1500, status: "unpaid" },
        ]);
    }, []);

    const handlePaymentClick = (order) => {
        setSelectedOrder(order);
        setShowPaymentForm(true);
    };

    const handlePaymentSuccess = () => {
        if (selectedOrder) {
            setOrders((prev) =>
                prev.map((o) =>
                    o.id === selectedOrder.id ? { ...o, status: "paid" } : o
                )
            );
        }
        setShowPaymentForm(false);
        setSelectedOrder(null);
    };

    const handleClosePayment = () => {
        setShowPaymentForm(false);
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
                                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition"
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
            {showPaymentForm && selectedOrder && (
                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret: undefined, // Will be set in CheckoutForm
                        appearance: {
                            theme: 'stripe',
                            variables: {
                                colorPrimary: '#4f46e5',
                                borderRadius: '12px',
                            }
                        },
                    }}
                >
                    <CheckoutForm
                        order={selectedOrder}
                        onSuccess={handlePaymentSuccess}
                        onClose={handleClosePayment}
                    />
                </Elements>
            )}
        </div>
    );
}