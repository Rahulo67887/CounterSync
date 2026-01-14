import { Outlet } from "react-router";
import AdminDashboard from "./components/layout/AdminDashboard";
import Headerlinks from "./components/layout/HeaderLinks";
import Footer from "./components/layout/Footer";

import "./styles/app.css";

const App=()=> {
  return (
    <>
      <Headerlinks />
      <AdminDashboard />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
