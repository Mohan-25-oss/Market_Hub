// src/pages/AuthPages.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "./UserContext";
import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";

export default function AuthPage() {
    const { googleAuthentication, createUser, signInUser } =
        useContext(AuthContext);

    const [mode, setMode] = useState("login"); // login or signup
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [userType, setUserType] = useState("buyer"); // default buyer
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!emailRegex.test(email)) return setError("Please enter a valid email.");
        if (password.length < 6)
            return setError("Password must be at least 6 characters.");

        try {
            setLoading(true);
            await signInUser(email, password);
            alert("Login successful ✅");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        if (!name.trim()) return setError("Please enter your name.");
        if (!emailRegex.test(email)) return setError("Please enter a valid email.");
        if (password.length < 6)
            return setError("Password must be at least 6 characters.");

        try {
            setLoading(true);
            await createUser(email, password);
            alert(
                `${userType === "buyer" ? "Buyer" : "Seller"} account created successfully ✅`
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            setLoading(true);
            await googleAuthentication();
            alert("Signed in successfully with Google ✅");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">
                        {mode === "login" ? "Login" : "Sign Up"}
                    </h2>
                    <div className="text-sm text-gray-500">
                        <button
                            className={`px-3 py-1 rounded-full mr-1 ${mode === "login"
                                ? "bg-blue-50 text-blue-600"
                                : "hover:bg-gray-100"
                                }`}
                            onClick={() => setMode("login")}
                        >
                            Login
                        </button>
                        <button
                            className={`px-3 py-1 rounded-full ${mode === "signup"
                                ? "bg-blue-50 text-blue-600"
                                : "hover:bg-gray-100"
                                }`}
                            onClick={() => setMode("signup")}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Google Login */}
                <div className="space-y-3">
                    <p className="text-sm text-gray-600">Or sign in with</p>
                    <button
                        onClick={handleGoogle}
                        className="w-full flex items-center justify-center px-3 py-2 border rounded-lg text-sm hover:shadow-sm"
                    >
                        Continue with Google
                    </button>
                </div>

                <div className="my-4 border-t pt-4">
                    <form
                        onSubmit={mode === "login" ? handleLogin : handleSignup}
                        className="space-y-4"
                    >
                        {mode === "signup" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-200 p-2"
                                    placeholder="Full name"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-200 p-2"
                                placeholder="Your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-200 p-2"
                                placeholder="At least 6 characters"
                                required
                            />
                        </div>

                        {mode === "signup" && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    User Type
                                </label>
                                <div className="mt-2 flex items-center space-x-3">
                                    <label
                                        className={`inline-flex items-center px-3 py-2 rounded-lg border ${userType === "buyer" ? "bg-blue-50 border-blue-200" : ""
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="buyer"
                                            checked={userType === "buyer"}
                                            onChange={() => setUserType("buyer")}
                                            className="mr-2"
                                        />
                                        Buyer (default)
                                    </label>
                                    <label
                                        className={`inline-flex items-center px-3 py-2 rounded-lg border ${userType === "seller" ? "bg-blue-50 border-blue-200" : ""
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="userType"
                                            value="seller"
                                            checked={userType === "seller"}
                                            onChange={() => setUserType("seller")}
                                            className="mr-2"
                                        />
                                        Seller
                                    </label>
                                </div>
                            </div>
                        )}

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            {loading
                                ? "Processing..."
                                : mode === "login"
                                    ? "Login"
                                    : "Sign Up"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
