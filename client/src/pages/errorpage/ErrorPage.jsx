import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <h1 className=" text-9xl text-green-300 font-extrabold mb-3">404</h1>
      <span className=" text-lg font-semibold">Page not found</span>
      <span className=" text-gray-600">
        The page you are looking for does not seem to exsist
      </span>

      <Link
        to={"/"}
        className="w-40 h-10 rounded bg-green-400 text-white flex items-center justify-center mt-9"
      >
        Go to home
      </Link>
    </div>
  );
};

export default ErrorPage;
