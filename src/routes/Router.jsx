import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import CategoryPage from "../pages/Category/Category";
import PrivateRoute from "../routes/PrivateRoute/PrivateRoute";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import BuyerDashboard from "../pages/Dashboard/BuyerDashboard/BuyerDashboard";
import AllUsersDashboard from "../pages/Dashboard/AllUsersDashboard/UserManagementDashboard/AllUserManagement";
import Blog from "../pages/Blog/Blog";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import BookingModalLayout from "../layout/BookingModalLayout/BookingModalLayout";
import BookingModal from "../pages/BookingModal/BookingModal";
import SellerDashboard from "../pages/Dashboard/SellerDashboard/SellerDashboard";
import SingleUserDashboard from "../pages/Dashboard/SingleUserDashboard/SingleUserDashboard";
import NotFound from "../pages/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            { path: "/", element: <Home /> },
            { path: "home", element: <Home /> },
            { path: "about", element: <About /> },
            { path: "blog", element: <Blog /> },
            { path: "contact", element: <Contact /> },
            { path: "signin", element: <SignIn></SignIn> },
            { path: "signup", element: <SignUp /> },

            {
                path: "category/:id",
                element: (
                    <PrivateRoute>
                        <CategoryPage />
                    </PrivateRoute>
                ),
            },
        ],
    },

    // Dashboard layout with children routes
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            { path: "", element: <Dashboard /> },
            { path: "AdminDashboard", element: <AdminDashboard /> },
            { path: "allUsersDashboard", element: <AllUsersDashboard/> },
            { path: "sellerDashboard", element: <SellerDashboard/>},
            { path: "buyerDashboard", element: <BuyerDashboard /> },
            { path: "singleUserDashboard", element: <SingleUserDashboard/> },
        ],
    },
    {
        path: "/bookingModal",
        element: <BookingModalLayout />,
        children: [
            { path: "", element: <BookingModal/>},
        ],
    },
    // standalone route (if needed)
    {
        path: "/login",
        element: <div className="p-6 text-center text-xl">Login Page</div>,
    },

    // 404
    {
        path: "*",
        element: <NotFound/> 
    },
]);

export default router;
