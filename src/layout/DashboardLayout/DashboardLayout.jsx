import React, { useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar/Navbar";
import { AppContext } from "../../context/AppContext/AppContext";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";

const DashboardLayout = () => {
  const { user } = useContext(AppContext);
  const { isAdmin } = useAdmin(user?.email);
  const { isSeller } = useSeller(user?.email);

  return (
    <div className="bg-gray-50 min-h-screen text-black">
      <Navbar />

      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content p-4">
          <Outlet />
        </div>

        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 bg-blue-600 text-white space-y-2 min-h-full">
            {isAdmin && (
              <>
                <li><NavLink to="adminDashboard">Admin Dashboard</NavLink></li>
                <li><NavLink to="users">All Users</NavLink></li>
              </>
            )}
            {isSeller && (
              <>
                <li><NavLink to="sellerDashboard">Seller Dashboard</NavLink></li>
                <li><NavLink to="addProduct">Add Product</NavLink></li>
              </>
            )}
            {!isAdmin && !isSeller && (
              <>
                <li><NavLink to="buyerDashboard">Buyer Dashboard</NavLink></li>
              </>
            )}
            <li><NavLink to="profile">My Profile</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
