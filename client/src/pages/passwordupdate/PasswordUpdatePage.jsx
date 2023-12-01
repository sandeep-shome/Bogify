import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const PasswordUpdatePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const successMsg = (msg) => toast.success(msg);
  const errorMsg = (msg) => toast.error(msg);

  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  const handlePasswordChange = (ev) => {
    ev.preventDefault();
    if (previousPassword === newPassword) {
      errorMsg("New password cannot be same as previous password");
      return;
    } else {
      setLoading(true);
      axios
        .put(
          `${import.meta.env.VITE_USER_URL}/update-password`,
          { previousPassword, newPassword },
          { withCredentials: true }
        )
        .then(() => {
          successMsg("Password updated successfully");
          setLoading(false);
        })
        .catch(() => {
          errorMsg("Something went wrong!");
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Toaster />
      {loading && <Loader />}
      {userData && (
        <div
          className="w-full flex items-center justify-center"
          style={{ minHeight: "75vh" }}
        >
          <form
            action=""
            className="flex items-center justify-cente flex-col w-96 p-7"
            onSubmit={handlePasswordChange}
          >
            <div className="profile-picture w-20 h-20 rounded-full bg-gray-400  max-h-20 mb-2">
              <img
                src={userData.profilepicture}
                alt=""
                className="w-full max-h-20 object-cover object-center rounded-full"
              />
            </div>
            <h2 className=" capitalize font-semibold text-lg mb-5">
              {userData.username}
            </h2>
            <input
              type="password"
              className=" w-4/5 h-10 border border-gray-400 ps-2 outline-none mb-3 rounded"
              placeholder="Previous password"
              value={previousPassword}
              onChange={(e) => setPreviousPassword(e.target.value)}
            />
            <input
              type="password"
              className=" w-4/5 h-10 border border-gray-400 ps-2 outline-none mb-5 rounded"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-4/5 h-10 bg-green-400 text-white rounded capitalize"
            >
              Change password
            </button>
            <Link
              to={"/edit-profile"}
              className="text-base text-red-400 mt-2 block capitalize"
            >
              cancle change password
            </Link>
          </form>
        </div>
      )}
    </>
  );
};

export default PasswordUpdatePage;
