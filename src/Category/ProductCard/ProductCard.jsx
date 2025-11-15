import React from "react";

const ProductCard = ({ product, onBook }) => {
    return (
        <div className="bg-white shadow-md rounded p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
            <p className="text-green-600 font-semibold">${product.price}</p>
            <button
                onClick={() => onBook(product)}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Book Now
            </button>
        </div>
    );
};

export default ProductCard;
