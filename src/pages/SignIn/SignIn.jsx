import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useApp } from "../../context/AppContext/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const { signInUser, googleAuthentication, authLoading } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // If redirected from PrivateRoute → go back to that page
  // Otherwise redirect to /contact
  const from = location.state?.from?.pathname || "/contact";

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      await signInUser(email, password);
      toast.success("Signed in successfully!");

      // Redirect to previous page OR /contact
      navigate(from, { replace: true });

    } catch (err) {
      console.error("Sign in error:", err);

      let msg = "Login failed!";
      if (err.code === "auth/user-not-found") msg = "No account found with this email";
      else if (err.code === "auth/wrong-password") msg = "Incorrect password";

      toast.error(msg);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await googleAuthentication();

      if (!user?.email) {
        toast.error("Google account has no email");
        return;
      }

      // Send to backend
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
        toast.success("Google Sign-In successful!");

        // Redirect to previous page OR /contact
        navigate(from, { replace: true });

      } else {
        toast.error(data.message || "Google Sign-In failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Google Sign-In failed!");
    }
  };

  return (
    <div className="min-h-screen text-black bg-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />

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
          {/* Sign In Form */}
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
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
              <label className="block text-sm font-medium text-gray-700">Password</label>
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

        </div>
      </div>
    </div>
  );
};

export default SignIn;
