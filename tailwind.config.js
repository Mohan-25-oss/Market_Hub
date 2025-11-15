/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}", // <-- সব JS/JSX ফাইল চেক হবে
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
