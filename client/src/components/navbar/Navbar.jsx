import "./navbar.scss";
import { links } from "./links";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const userContext = useContext(UserContext);

  return (
    <nav className="flex items-center justify-between fixed top-0 bg-white z-20">
      <div className="logo bg-green-200 rounded-full ms-1">
        <Link to={"/"}>Blogify.</Link>
      </div>
      <div className="options flex items-center gap-10">
        <ul className="flex items-center gap-6 transition-all menu z-30">
          <li>
            <Link to="/">Home</Link>
          </li>
          {links.map((link) => {
            return (
              <li key={link.text}>
                <Link to={`/category/${link.param}`} className="capitalize">
                  {link.text}
                </Link>
              </li>
            );
          })}
        </ul>
        <i
          className="fa-solid fa-bars menu-btn text-slate-700"
          onClick={() => {
            document.querySelector(".menu").classList.toggle("active");
          }}
        ></i>
        <div className="profile-management">
          {userContext.userData && (
            <div className="flex items-center">
              <button
                className="profile bg-slate-100 border-red-200 px-2 py-2 flex items-center relative"
                onClick={() => {
                  document
                    .querySelector(".profile-options")
                    .classList.toggle("active");
                }}
              >
                <div className="profile-picture w-6 h-6 bg-gray-400 rounded-full me-1 max-h-6 flex items-center justify-center">
                  <img
                    src={userContext.userData.profilepicture}
                    alt=""
                    className="max-h-6 w-full rounded-full object-cover object-center"
                  />
                </div>
                <span>{userContext.userData.username}</span>
                <div
                  className="profile-options w-48 h-20 bg-gray-200 rounded absolute left-1/2 flex-col justify-around p-2"
                  style={{ transform: "translateX(-50%)" }}
                >
                  <Link to={"/user"} className=" text-left">
                    Manage profile
                    <i className="fa-solid fa-gear text-slate-500 ms-2"></i>
                  </Link>
                  <Link to={"/logout"} className="text-left">
                    Sign out
                    <i className="fa-solid fa-arrow-right-from-bracket ms-2 text-slate-500"></i>
                  </Link>
                </div>
              </button>
              <Link
                to={"/add-blog"}
                className=" bg-green-400 capitalize text-white flex items-center justify-center add-btn"
              >
                <i className="fa-solid fa-plus me-1"></i>
                add
              </Link>
            </div>
          )}
          {userContext.userData === null && (
            <Link
              to={"/auth"}
              className="capitalize bg-green-400 py-2 px-3 rounded text-white"
            >
              sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
