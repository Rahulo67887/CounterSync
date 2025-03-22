import "./App.css";
import AdminDashboard from "./components/adminDashboard";
import DeskNo from "./components/deskNo";
import Headerlinks from "./components/headerLinks";
import Hero from "./components/Hero";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Headerlinks />
      <AdminDashboard />
      <Hero />
      <Footer />
    </>
  );
}

export default App;
