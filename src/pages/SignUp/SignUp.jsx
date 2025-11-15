import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../context/UserContext"; // Correct import

const SignUp = () => {
    const { createUser, googleAuthentication } = useContext(AuthContext); // useContext here
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // --- Email/Password Signup ---
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await createUser(email, password);

            // Update displayName
            await updateProfile(result.user, { displayName: name });

            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // --- Google Signup ---
    const handleGoogleSignUp = async () => {
        setLoading(true);
        setError("");

        try {
            await googleAuthentication();
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1D232A] p-4">
            <div className="max-w-md w-full bg-[#2A2F38] rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold text-gray-300">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter your name"
                            className="w-full p-3 border border-gray-600 rounded bg-[#1D232A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-600 rounded bg-[#1D232A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-600 rounded bg-[#1D232A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition disabled:opacity-50"
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                {/* Google Signup */}
                <button
                    onClick={handleGoogleSignUp}
                    disabled={loading}
                    className="w-full mt-4 flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded transition disabled:opacity-50"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                        alt="Google"
                        className="w-6 h-6"
                    />
                    <span className="font-semibold">Sign up with Google</span>
                </button>

                <p className="text-center mt-4 text-gray-300">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-green-500 font-semibold hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
