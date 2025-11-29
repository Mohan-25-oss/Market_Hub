import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext/AppContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useContext(AppContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    password: "", 
    photo: null 
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("🔄 Fetching profile...");
        const token = localStorage.getItem("token");
        
        if (!token) {
          setMessage("No authentication token found. Please login again.");
          setMessageType("error");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/users/profile", {
          headers: { 
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log("📨 Profile API response:", res.data);
        
        if (res.data.success && res.data.user) {
          setProfile(res.data.user);
          setFormData({ 
            name: res.data.user.name || "", 
            password: "", 
            photo: null 
          });
          setMessage("Profile loaded successfully");
          setMessageType("success");
        } else {
          throw new Error(res.data.message || "Failed to load profile");
        }
      } catch (err) {
        console.error("❌ Profile fetch error:", err);
        console.error("Error details:", err.response?.data);
        
        let errorMessage = "Failed to load profile";
        if (err.response?.status === 401) {
          errorMessage = "Authentication failed. Please login again.";
          localStorage.removeItem("token");
          navigate("/login");
        } else if (err.response?.status === 404) {
          errorMessage = "Profile not found on server";
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }
        
        setMessage(errorMessage);
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchProfile();
    } else {
      setLoading(false);
      setMessage("User not found in context");
      setMessageType("error");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setUpdating(true);

    // Validate form
    if (!formData.name.trim()) {
      setMessage("Name is required");
      setMessageType("error");
      setUpdating(false);
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setMessageType("error");
      setUpdating(false);
      return;
    }

    try {
      console.log("🔄 Submitting profile update...");
      const data = new FormData();
      data.append("name", formData.name.trim());
      
      if (formData.password) {
        data.append("password", formData.password);
      }
      
      if (formData.photo) {
        data.append("photo", formData.photo);
        console.log("📸 Photo attached:", formData.photo.name);
      }

      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5000/users/profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Update response:", res.data);

      if (res.data.success) {
        setProfile(res.data.user);
        if (setUser) {
          setUser(res.data.user);
        }
        setEditing(false);
        setMessage(res.data.message || "Profile updated successfully!");
        setMessageType("success");
        setFormData(prev => ({ ...prev, password: "" }));
      } else {
        throw new Error(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error("❌ Update profile error:", err);
      console.error("Error response:", err.response?.data);
      
      let errorMessage = "Failed to update profile";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.status === 413) {
        errorMessage = "File too large. Please choose a smaller image.";
      } else if (err.code === "NETWORK_ERROR") {
        errorMessage = "Network error. Please check your connection.";
      }
      
      setMessage(errorMessage);
      setMessageType("error");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData({ 
      name: profile?.name || "", 
      password: "", 
      photo: null 
    });
    setEditing(false);
    setMessage("");
    setMessageType("");
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <div className="text-lg text-gray-600">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">My Profile</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-semibold">Profile not found</p>
          <p className="text-sm mt-2">Possible issues:</p>
          <ul className="text-sm list-disc list-inside mt-1 ml-4">
            <li>User not found in database</li>
            <li>Authentication token issues</li>
            <li>Server connection problem</li>
          </ul>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-6 text-black">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">My Profile</h1>
      
      {/* Message Display */}
      {message && (
        <div className={`mb-4 p-3 rounded ${
          messageType === "success" 
            ? "bg-green-100 text-green-800 border border-green-300" 
            : "bg-red-100 text-red-800 border border-red-300"
        }`}>
          <div className="flex items-center">
            {messageType === "success" ? "✅" : "❌"}
            <span className="ml-2">{message}</span>
          </div>
        </div>
      )}

      {!editing ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={profile.photo || "/default-avatar.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
            <div>
              <div className="font-semibold text-lg text-gray-800">
                {profile.name || "Not set"}
              </div>
              <div className="text-gray-600">{profile.email}</div>
              <div className="capitalize inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm mt-1">
                {profile.role}
              </div>
            </div>
          </div>

          {profile.googleAuth && (
            <div className="flex items-center text-blue-600 bg-blue-50 px-3 py-2 rounded">
              <span className="mr-2">✅</span>
              Signed in with Google
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength="2"
              disabled={updating}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave empty to keep current password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              minLength="6"
              disabled={updating}
            />
            {formData.password && formData.password.length < 6 && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">Profile Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={updating}
            />
            {formData.photo && (
              <p className="text-green-600 text-sm mt-1">
                Selected: {formData.photo.name}
              </p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Supported formats: JPG, PNG, GIF. Max size: 5MB
            </p>
          </div>

          <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-200"
              disabled={updating}
            >
              Cancel
            </button>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 flex items-center"
                disabled={updating}
              >
                {updating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
                disabled={updating}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;