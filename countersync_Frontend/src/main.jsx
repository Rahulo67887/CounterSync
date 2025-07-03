import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./components/Hero.jsx";
import CreatePortal from "./components/CreatePortal.jsx";
import LogIn from "./components/LogIn.jsx";
import { AuthProvider } from "./store/auth.jsx";
import LogOut from "./components/LogOut.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/createportal",
        element: <CreatePortal />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/logout",
        element: <LogOut />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        bodyClassName="toastBody"
      />
    </StrictMode>
  </AuthProvider>
);
