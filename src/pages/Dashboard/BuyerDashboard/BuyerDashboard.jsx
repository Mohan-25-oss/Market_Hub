import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe("pk_test_yourStripePublicKeyHere"); // Replace with your real key

export default function BuyerDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        // Mock API: Fetch all orders for the buyer
        setOrders([
            { id: 1, name: "Product A", price: 20, status: "unpaid" },
            { id: 2, name: "Product B", price: 50, status: "paid" },
            { id: 3, name: "Product C", price: 15, status: "unpaid" },
        ]);
    }, []);

    const handlePayment = async (order) => {
        setLoading(true);
        setSelectedOrder(order);

        try {
            const stripe = await stripePromise;

            // Simulate API call to backend to create payment session
            const response = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId: order.id, amount: order.price }),
            });

            const session = await response.json();

            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) toast.error(result.error.message);
        } catch (error) {
            toast.error("Payment failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const markAsPaid = (orderId) => {
        setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: "paid" } : o))
        );
        toast.success("Payment successful 🎉");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <ToastContainer />
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
                            <p className="text-gray-500">৳ {order.price}</p>
                            <p
                                className={`mt-2 text-sm font-medium ${order.status === "paid"
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
                                    onClick={() => handlePayment(order)}
                                    disabled={loading}
                                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition disabled:opacity-50"
                                >
                                    {loading && selectedOrder?.id === order.id
                                        ? "Processing..."
                                        : "Pay Now"}
                                </button>
                            ) : (
                                <button
                                    className="w-full py-2 bg-green-500 text-white rounded-xl font-medium cursor-default"
                                    disabled
                                >
                                    Paid
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
