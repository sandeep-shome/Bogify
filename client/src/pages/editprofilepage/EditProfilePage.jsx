import React, { useContext, useState, useEffect } from "react";
import "./editProfilePage.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { storage } from "../../config/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { toast, Toaster } from "react-hot-toast";

const EditProfilePage = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  // forms data states

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilepicture, setProfilepicture] = useState("");
  const [coverpicture, setcoverpicture] = useState("");

  /* image uploadtion */

  const [profileInput, setProfileInput] = useState(null);
  const [coverInput, setCoverInput] = useState(null);

  /* msg configs */

  const successMsg = () => toast.success("cahnges saved");
  const errMsg = () => toast.error("Something went wrong!");
  const loadingMsg = (msg) =>
    toast.loading(`${msg} is uploading...`, { duration: 2000 });

  const getUserData = () => {
    axios
      .get(`${import.meta.env.VITE_USER_URL}data`, {
        withCredentials: true,
      })
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
        setUsername(response.data.username);
        setBio(response.data.bio);
        setProfilepicture(response.data.profilepicture);
        setcoverpicture(response.data.coverpicture);
      })
      .catch((error) => {
        console.log(error);
        navigate("/auth");
      });
  };

  useEffect(() => getUserData(), []);

  //uploading profile picture

  useEffect(() => {
    if (profileInput) {
      loadingMsg("profile picture");
      const imageRef = ref(
        storage,
        `/users/profile/${v4() + profileInput.name}`
      );
      uploadBytes(imageRef, profileInput)
        .then((response) => {
          getDownloadURL(imageRef)
            .then((res) => {
              setProfilepicture(res);
            })
            .catch((err) => {
              return err;
            });
        })
        .catch((err) => {
          return;
        });
    }
  }, [profileInput]);

  //uploading cover picture

  useEffect(() => {
    if (coverInput) {
      loadingMsg("cover picture");
      const coverRef = ref(storage, `/users/cover/${v4() + coverInput.name}`);
      uploadBytes(coverRef, coverInput)
        .then((response) => {
          getDownloadURL(coverRef)
            .then((res) => {
              setcoverpicture(res);
            })
            .catch((err) => {
              return err;
            });
        })
        .catch((err) => {
          return;
        });
    }
  }, [coverInput]);

  //updating profile information

  const handleUpadate = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    axios
      .put(
        `${import.meta.env.VITE_USER_URL}edit`,
        { username, profilepicture, coverpicture, bio },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        //console.log(response);
        setLoading(false);
        successMsg();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        errMsg();
      });
  };

  return (
    <>
      <Toaster />
      {loading && <Loader />}
      {userData && (
        <form className="edit-profile-page-form" onSubmit={handleUpadate}>
          <h1 className="text-xl font-bold mb-3">Edit Profile</h1>
          <span className="block text-gray-500 mb-4">
            Note: please ignore those fields which you want to remain same
          </span>
          <label htmlFor="" className=" capitalize font-semibold mb-3 block">
            profile picture
          </label>
          <div className="profile-picture-area flex items-center gap-4">
            <div className="profile-picture w-20 h-20 overflow-hidden max-h-20 rounded-full bg-gray-400 flex items-center justify-center">
              <img
                src={profilepicture}
                alt=""
                className="w-full rounded-full object-cover object-center max-h-20"
              />
            </div>
            <div className="picture-upload">
              <input
                type="file"
                name=""
                id=""
                accept="image/jpg, image/png, image/jpeg"
                onChange={(e) => setProfileInput(e.target.files[0])}
              />
            </div>
          </div>
          <label
            htmlFor=""
            className=" capitalize font-semibold mt-5 mb-3 block"
          >
            cover picture
          </label>
          <div className="cover-picture-area flex items-center gap-4">
            <div className="cover-picture w-72 h-48 overflow-hidden max-h-48 bg-gray-400 flex items-center justify-center">
              <img
                src={coverpicture}
                alt=""
                className="w-full object-cover object-center max-h-48 h-48"
              />
            </div>
            <div className="picture-upload">
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                onChange={(e) => setCoverInput(e.target.files[0])}
              />
            </div>
          </div>
          <label
            htmlFor=""
            className=" capitalize font-semibold mt-5 mb-3 block"
          >
            user name
          </label>
          <input
            type="text"
            name=""
            id=""
            className=" border-b-2 border-b-gray-400 outline-none w-72"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            htmlFor=""
            className=" capitalize font-semibold mt-5 mb-3 block"
          >
            user bio
          </label>
          <input
            type="text"
            name=""
            id=""
            className=" border-b-2 border-b-gray-400 outline-none w-72"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
          />
          <div className="btns flex items-center gap-2">
            <button className="w-36 h-10 rounded bg-green-400 text-white capitalize block mt-5">
              save changes
            </button>
            <Link
              to={"/change-password"}
              className="w-36 h-10 rounded bg-blue-400 text-white capitalize flex items-center justify-center mt-5"
            >
              change password
            </Link>
          </div>
        </form>
      )}
    </>
  );
};

export default EditProfilePage;
