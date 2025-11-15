import React from "react";

export const Textarea = ({ value, onChange, placeholder, className, rows = 4 }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`border p-2 rounded w-full ${className}`}
        />
    );
};
