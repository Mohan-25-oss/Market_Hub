import React, { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar/Navbar";
import { AppContext } from "../../context/AppContext/AppContext";
import useAdmin from "../../hooks/useAdmin";

const DashboardLayout = () => {
    const { user } = useContext(AppContext);
    const { isAdmin, isSeller, isBuyer, isUser } = useAdmin(user?.email); // adjust hook to return these

    return (
        <div className="bg-amber-50 min-h-screen text-black">
            <Navbar />

            <div className="drawer lg:drawer-open">
                <input id="my-dashboard" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content p-4">
                    <Outlet />
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-dashboard" className="drawer-overlay"></label>

                    <ul className="menu p-4 w-60 bg-blue-100 text-lg font-semibold space-y-2 min-h-full">
                        {isAdmin && <li><NavLink to="adminDashboard">Admin Dashboard</NavLink></li>}
                        {isAdmin && <li><NavLink to="users">All Users</NavLink></li>}
                        {isAdmin && <li><NavLink to="sellerDashboard">Seller Dashboard</NavLink></li>}
                        {isAdmin && <li><NavLink to="buyerDashboard">Buyer Dashboard</NavLink></li>}
                        <li><NavLink to="singleUserDashboard">Dashboard</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
