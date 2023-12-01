import "./rootLayout.scss";
import Navbar from "../components/navbar/Navbar";
import Auth from "../auth/Auth";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";

const RootLayout = () => {
  return (
    <div className="root-container mx-auto ">
      <Auth />
      <Navbar />
      <main
        className="relative"
        onClick={() => {
          document.querySelector(".menu").classList.remove("active");
          document.querySelector(".profile-options").classList.remove("active");
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
