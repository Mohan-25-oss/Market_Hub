import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext/AppContext";

const Profile = () => {
    const { user } = useContext(AppContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ name: "", password: "" });
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!user?.email) return;

        const fetchProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/users/profile`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setProfile(res.data.user);
                setFormData({ name: res.data.user.name || "", password: "" });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await axios.put(
                `http://localhost:5000/users/profile`,
                formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            setProfile(res.data.user);
            setEditing(false);
            setMessage("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            setMessage("Failed to update profile.");
        }
    };

    if (loading) return <p className="p-6 text-center">Loading...</p>;
    if (!profile) return <p className="p-6 text-center text-red-500">Profile not found</p>;

    return (
        <div className="max-w-3xl text-black mx-auto p-6 bg-white shadow-md rounded mt-6">
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>

            {message && <p className="mb-4 text-green-600">{message}</p>}

            {!editing ? (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Name:</span>
                        <span>{profile.name || "Not set"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Email:</span>
                        <span>{profile.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Role:</span>
                        <span className="capitalize">{profile.role}</span>
                    </div>
                    {profile.googleAuth && (
                        <div className="flex justify-between items-center text-blue-600">
                            <span>Signed in with Google</span>
                        </div>
                    )}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setEditing(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">New Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Leave empty to keep current password"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Profile;
