import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserContext from "./context/UserContext.jsx";

// Wrap the entire application with UserContext 
// so authentication state is available globally.
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserContext>
            <App />
        </UserContext>
    </React.StrictMode>
);
