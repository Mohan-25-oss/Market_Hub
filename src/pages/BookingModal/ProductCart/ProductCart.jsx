import React, { useState } from 'react';
import BookingModal from '../BookingModal';

function ProductCart() {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    // Sample user and item data
    const user = {
        name: "John Doe",
        email: "john@example.com"
    };

    const item = {
        name: "Premium Wireless Headphones",
        price: "$199.99"
    };

    return (
        <div>
            {/* Your product page content */}
            <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Book Now
            </button>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                user={user}
                item={item}
            />
        </div>
    );
}

export default ProductCart;