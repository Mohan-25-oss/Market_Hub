import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/Router";
import { AppProvider } from "./context/AppContext/AppContext";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
