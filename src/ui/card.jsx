import React from "react";

// মূল Card wrapper
export const Card = ({ children, className }) => {
    return (
        <div className={`border rounded shadow p-4 bg-white ${className}`}>
            {children}
        </div>
    );
};

// Card-এর ভিতরের content wrapper
export const CardContent = ({ children, className }) => {
    return <div className={`p-2 ${className}`}>{children}</div>;
};
