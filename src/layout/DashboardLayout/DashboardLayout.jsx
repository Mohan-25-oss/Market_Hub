import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar/Navbar";

const DashboardLayout = () => {

    // 👉 For now, set role manually for testing
    const userRole = "admin"; 
    // Change "admin" → "seller", "buyer", "user" to test different dashboards

    const isAdmin = userRole === "admin";
    const isSeller = userRole === "seller";
    const isBuyer = userRole === "buyer";
    const isUser = userRole === "user";

    return (
        <div className="bg-amber-50 text-black">
            <Navbar />

            <div className="drawer lg:drawer-open">
                <input id="my-dashboard" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content ml-60 md:p-0.5">
                    <Outlet />
                </div>

                <div className="drawer-side m-0">
                    <label htmlFor="my-dashboard" className="drawer-overlay"></label>

                    <ul className="fixed menu bg-amber-100 font-semibold text-lg min-h-full w-60 p-4">

                        {/* Always visible for admin */}
                        {isAdmin && (
                            <li>
                                <NavLink
                                    to="/dashboard/adminDashboard"
                                    className={({ isActive }) =>
                                        `px-2 py-1 transition-colors ${
                                            isActive ? "border-b-2 border-primary text-primary" : "text-gray-600"
                                        }`
                                    }
                                >
                                    Admin Dashboard
                                </NavLink>
                            </li>
                        )}

                        {/* ---------------------- */}
                        {/* Admin: See everything */}
                        {/* ---------------------- */}
                        {isAdmin && (
                            <>
                                <li className="mt-2">
                                    <NavLink to="/dashboard/users"
                                        className={({ isActive }) =>
                                            `px-2 py-1 transition-colors ${
                                                isActive ? "border-b-2 border-primary text-primary" : "text-gray-600"
                                            }`
                                        }
                                    >
                                        All Users Dashboard
                                    </NavLink>
                                </li>

                                <li className="mt-2">
                                    <NavLink to="/dashboard/sellerDashboard"
                                        className={({ isActive }) =>
                                            `px-2 py-1 transition-colors ${
                                                isActive ? "border-b-2 border-primary text-primary" : "text-gray-600"
                                            }`
                                        }
                                    >
                                        Seller Dashboard
                                    </NavLink>
                                </li>

                                <li className="mt-2">
                                    <NavLink to="/dashboard/buyerDashboard"
                                        className={({ isActive }) =>
                                            `px-2 py-1 transition-colors ${
                                                isActive ? "border-b-2 border-primary text-primary" : "text-gray-600"
                                            }`
                                        }
                                    >
                                        Buyer Dashboard
                                    </NavLink>
                                </li>

                                <li className="mt-2">
                                    <NavLink to="/dashboard/singleUserDashboard"
                                        className={({ isActive }) =>
                                            `px-2 py-1 transition-colors ${
                                                isActive ? "border-b-2 border-primary text-primary" : "text-gray-600"
                                            }`
                                        }
                                    >
                                        Single User Dashboard
                                    </NavLink>
                                </li>

                                <li className="mt-2">
                                    <NavLink to="/dashboard/addCategoryProduct"
                                        className={({ isActive }) =>
                                            `px-2 py-1 transition-colors ${
                                                isActive ? "border-b-2 border-primary text-primary" : "text-gray-600"
                                            }`
                                        }
                                    >
                                        Add Category Product
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* ---------------------- */}
                        {/* Seller */}
                        {/* ---------------------- */}
                        {isSeller && (
                            <li className="mt-2">
                                <NavLink
                                    to="/dashboard/sellerDashboard"
                                    className={({ isActive }) =>
                                        `px-2 py-1 transition-colors ${
                                            isActive ? "border-b-2 border-primary text-primary" : "text-gray-600"
                                        }`
                                    }
                                >
                                    Seller Dashboard
                                </NavLink>
                            </li>
                        )}

                        {/* ---------------------- */}
                        {/* Buyer */}
                        {/* ---------------------- */}
                        {isBuyer && (
                            <li className="mt-2">
                                <NavLink
                                    to="/dashboard/buyerDashboard"
                                    className={({ isActive }) =>
                                        `px-2 py-1 transition-colors ${
                                            isActive ? "border-b-2 border-primary text-primary" : "text-gray-600"
                                        }`
                                    }
                                >
                                    Buyer Dashboard
                                </NavLink>
                            </li>
                        )}

                        {/* ---------------------- */}
                        {/* Normal User */}
                        {/* ---------------------- */}
                        {isUser && (
                            <li className="mt-2">
                                <NavLink
                                    to="/dashboard/singleUserDashboard"
                                    className={({ isActive }) =>
                                        `px-2 py-1 transition-colors ${
                                            isActive ? "border-b-2 border-primary text-primary" : "text-gray-600"
                                        }`
                                    }
                                >
                                    My Dashboard
                                </NavLink>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
