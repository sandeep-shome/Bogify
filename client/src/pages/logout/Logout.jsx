import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const getUserData = () => {
    axios
      .get(`${import.meta.env.VITE_USER_URL}data`, {
        withCredentials: true,
      })
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/auth");
      });
  };

  useEffect(() => getUserData(), []);

  const signOut = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_AUTH_URL}signout`, {
        withCredentials: true,
      })
      .then(() => {
        window.location.reload();
        setTimeout(() => {
          navigate("/auth");
        }, 2000);
      });
  };

  return (
    <>
      {loading && <Loader />}
      {userData && (
        <div
          c
          className="w-full flex items-center justify-center"
          style={{ minHeight: "75vh" }}
        >
          <div className="log-out-box w-80 flex flex-col items-center border border-gray-300 py-4 rounded">
            <div className="profile-picture w-20 h-20 rounded-full bg-gray-400  max-h-20 mb-2">
              <img
                src={userData.profilepicture}
                alt=""
                className="w-full max-h-20 object-cover object-center rounded-full"
              />
            </div>
            <h2 className=" capitalize font-semibold text-lg mb-3">
              {userData.username}
            </h2>
            <span className="block mb-3 ">Are you sure about signout?</span>
            <button
              className="w-4/5 h-10 bg-green-400 text-white rounded capitalize"
              onClick={signOut}
            >
              signout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
