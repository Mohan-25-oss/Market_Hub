// src/pages/SignIn/SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useApp } from "../../context/AppContext/AppContext"; // FIXED: correct import

const SignIn = () => {
  const { user, signInUser, googleAuthentication, authLoading, authError } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customError, setCustomError] = useState("");

  const navigate = useNavigate();

  // Email/Password Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    setCustomError("");

    if (!email || !password) {
      setCustomError("Email and password are required");
      return;
    }

    try {
      await signInUser(email, password);
      navigate("/"); 
    } catch (err) {
      console.error("Sign in error:", err);

      if (err.code === "auth/user-not-found") setCustomError("No account found with this email");
      else if (err.code === "auth/wrong-password") setCustomError("Incorrect password");
      else setCustomError(err.message);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setCustomError("");

    try {
      await googleAuthentication();
      navigate("/");
    } catch (err) {
      setCustomError(err.message);
    }
  };

  return (
    <div className="min-h-screen text-black bg-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center items-center">
          <img className="w-12 h-12 rounded-full" src={logo} alt="Logo" />
          <span className="ml-2 text-2xl font-bold text-green-700">Marketplace</span>
        </Link>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-green-200">

          {/* Error Message */}
          {(customError || authError) && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {customError || authError}
            </div>
          )}

          {/* Sign In Form */}
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 focus:ring-2"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 focus:ring-2"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full flex justify-center py-3 px-4 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-green-500 focus:ring-2 disabled:opacity-50"
            >
              {authLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={authLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <img className="w-5 h-5 mr-2" src="https://www.google.com/favicon.ico" alt="Google" />
              Sign in with Google
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
                Sign up now
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SignIn;
