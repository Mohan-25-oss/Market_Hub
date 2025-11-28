// src/pages/SignUp/SignUp.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext/AppContext';

const SignUp = () => {
    const { createUser, googleAuthentication, authLoading } = useApp();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Regular signup
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        try {
            // Create user in Firebase
            await createUser(formData.email, formData.password, formData.name);

            // Save user to backend
            const res = await fetch("http://localhost:5000/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                alert("Signup successful!");
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                navigate('/');
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Signup failed!");
        } finally {
            setLoading(false);
        }
    };

    // Google signup/login
    const handleGoogleSignUp = async () => {
        try {
            const user = await googleAuthentication(); // Firebase user
            const res = await fetch("http://localhost:5000/users/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.displayName || "Google User",
                    email: user.email,
                }),
            });

            const data = await res.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                alert("Google Sign-Up successful!");
                navigate('/');
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Google Sign-Up failed!");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 text-black bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                />

                <button
                    type="submit"
                    disabled={loading || authLoading}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading || authLoading ? "Signing up..." : "Sign Up"}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">Or sign up with</p>
                <button
                    onClick={handleGoogleSignUp}
                    className="mt-2 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                >
                    <img className="w-5 h-5 mr-2" src="https://www.google.com/favicon.ico" alt="Google" />
                    Sign up with Google
                </button>
            </div>
        </div>
    );
};

export default SignUp;
