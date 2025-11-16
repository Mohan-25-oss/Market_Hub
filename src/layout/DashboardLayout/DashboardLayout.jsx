import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar/Navbar";

const DashboardLayout = () => {
    // 👉 ডেমো হিসেবে আমরা ধরে নিচ্ছি যে ইউজার অ্যাডমিন নয়
    // চাইলে তুমি এই মান true করে দেখতে পারো
    const [isAdmin] = useState(true);

    return (
        <div className="bg-amber-50 text-black">
            <Navbar />
            <div className="drawer lg:drawer-open">
                <input id="my-dashboard" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ml-60 md:p-0.5">
                    {/* Page content here */}
                    <Outlet />
                </div>

                {/* Sidebar */}
                <div className="drawer-side m-0">
                    <label
                        htmlFor="my-dashboard"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>

                    <ul className=" fixed menu bg-amber-100 font-semibold text-lg min-h-full w-60 p-4">
                        {/* Sidebar content here */}
                        <li>
                            <NavLink
                                to="/dashboard/AdminDashboard"
                                className={({ isActive }) =>
                                    `px-2 py-1 transition-colors ${isActive
                                        ? "border-b-2 border-primary text-primary"
                                        : "text-gray-600"
                                    }`
                                }
                            >
                                Admin Dashboard
                            </NavLink>
                        </li>

                        {/* Only show for admin */}
                        {isAdmin && (
                            <>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/allUsersDashboard"
                                        className={({ isActive }) =>
                                            `px-2 py-1 transition-colors ${isActive
                                                ? "border-b-2 border-primary text-primary"
                                                : "text-gray-600"
                                            }`
                                        }
                                    >
                                        All Users Dashboard
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/sellerDashboard"
                                        className={({ isActive }) =>
                                            `px-2 py-1 transition-colors ${isActive
                                                ? "border-b-2 border-primary text-primary"
                                                : "text-gray-600"
                                            }`
                                        }
                                    >
                                        Seller Dashboard
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/buyerDashboard"
                                        className={({ isActive }) =>
                                            `px-2 py-1 transition-colors ${isActive
                                                ? "border-b-2 border-primary text-primary"
                                                : "text-gray-600"
                                            }`
                                        }
                                    >
                                        Buyer Dashboard
                                    </NavLink>
                                </li>
                                <li className="mt-2">
                                    <NavLink
                                        to="/dashboard/singleUserDashboard"
                                        className={({ isActive }) =>
                                            `px-2 py-1 transition-colors ${isActive
                                                ? "border-b-2 border-primary text-primary"
                                                : "text-gray-600"
                                            }`
                                        }
                                    >
                                        SingleUserDashboard
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
