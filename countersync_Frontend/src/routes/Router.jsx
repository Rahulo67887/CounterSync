import { createBrowserRouter } from "react-router";
import App from "../App";

import CreatePortal from "../pages/CreatePortal";
import LogIn from "../pages/LogIn";
import LogOut from "../pages/LogOut";
import Hero from "../pages/Hero";

export const Router=createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {index: true, element: <Hero />},
            {path: "createportal", element: <CreatePortal/>},
            {path: "login", element: <LogIn/>},
            {path: "logout", element: <LogOut/>},
        ],
    },
]);