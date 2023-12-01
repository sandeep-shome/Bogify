import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <div
      className="w-full h-screen fixed top-0 left-0 z-40 flex items-center justify-center cursor-not-allowed"
      style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
    >
      <HashLoader color="#38db70" />
    </div>
  );
};

export default Loader;
